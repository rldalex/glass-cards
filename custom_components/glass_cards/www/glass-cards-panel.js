!function(){"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let a=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=o.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(i,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new a(o,e,i)},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:n,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:l,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,_=globalThis,u=_.trustedTypes,g=u?u.emptyScript:"",v=_.reactiveElementPolyfillSupport,m=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(o){i=null}}return i}},f=(e,t)=>!n(e,t),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&d(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:a}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const s=o?.call(this);a?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...l(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,o)=>{if(t)i.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of o){const o=document.createElement("style"),a=e.litNonce;void 0!==a&&o.setAttribute("nonce",a),o.textContent=t.cssText,i.appendChild(o)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=o;const s=a.fromAttribute(t,e.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(e,t,i,o=!1,a){if(void 0!==e){const s=this.constructor;if(!1===o&&(a=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??f)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:a},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==a||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[m("elementProperties")]=new Map,w[m("finalized")]=new Map,v?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=e=>e,k=x.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+E,D=`<${M}>`,P=document,T=()=>P.createComment(""),I=e=>null===e||"object"!=typeof e&&"function"!=typeof e,z=Array.isArray,O="[ \t\n\f\r]",A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,H=/>/g,L=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,N=/"/g,U=/^(?:script|style|textarea|title)$/i,V=(Y=1,(e,...t)=>({_$litType$:Y,strings:e,values:t})),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),B=new WeakMap,K=P.createTreeWalker(P,129);var Y;function F(e,t){if(!z(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}class G{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let a=0,s=0;const r=e.length-1,n=this.parts,[d,c]=((e,t)=>{const i=e.length-1,o=[];let a,s=2===t?"<svg>":3===t?"<math>":"",r=A;for(let n=0;n<i;n++){const t=e[n];let i,d,c=-1,l=0;for(;l<t.length&&(r.lastIndex=l,d=r.exec(t),null!==d);)l=r.lastIndex,r===A?"!--"===d[1]?r=R:void 0!==d[1]?r=H:void 0!==d[2]?(U.test(d[2])&&(a=RegExp("</"+d[2],"g")),r=L):void 0!==d[3]&&(r=L):r===L?">"===d[0]?(r=a??A,c=-1):void 0===d[1]?c=-2:(c=r.lastIndex-d[2].length,i=d[1],r=void 0===d[3]?L:'"'===d[3]?N:j):r===N||r===j?r=L:r===R||r===H?r=A:(r=L,a=void 0);const h=r===L&&e[n+1].startsWith("/>")?" ":"";s+=r===A?t+D:c>=0?(o.push(i),t.slice(0,c)+C+t.slice(c)+E+h):t+E+(-2===c?n:h)}return[F(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]})(e,t);if(this.el=G.createElement(d,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=K.nextNode())&&n.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(C)){const t=c[s++],i=o.getAttribute(e).split(E),r=/([.?@])?(.*)/.exec(t);n.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?ee:"?"===r[1]?te:"@"===r[1]?ie:Q}),o.removeAttribute(e)}else e.startsWith(E)&&(n.push({type:6,index:a}),o.removeAttribute(e));if(U.test(o.tagName)){const e=o.textContent.split(E),t=e.length-1;if(t>0){o.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],T()),K.nextNode(),n.push({type:2,index:++a});o.append(e[t],T())}}}else if(8===o.nodeType)if(o.data===M)n.push({type:2,index:a});else{let e=-1;for(;-1!==(e=o.data.indexOf(E,e+1));)n.push({type:7,index:a}),e+=E.length-1}a++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,o){if(t===W)return t;let a=void 0!==o?i._$Co?.[o]:i._$Cl;const s=I(t)?void 0:t._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),void 0===s?a=void 0:(a=new s(e),a._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=a:i._$Cl=a),void 0!==a&&(t=X(e,a._$AS(e,t.values),a,o)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??P).importNode(t,!0);K.currentNode=o;let a=K.nextNode(),s=0,r=0,n=i[0];for(;void 0!==n;){if(s===n.index){let t;2===n.type?t=new Z(a,a.nextSibling,this,e):1===n.type?t=new n.ctor(a,n.name,n.strings,this,e):6===n.type&&(t=new oe(a,this,e)),this._$AV.push(t),n=i[++r]}s!==n?.index&&(a=K.nextNode(),s++)}return K.currentNode=P,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),I(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>z(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=G.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new J(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=B.get(e.strings);return void 0===t&&B.set(e.strings,t=new G(e)),t}k(e){z(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const a of e)o===t.length?t.push(i=new Z(this.O(T()),this.O(T()),this,this.options)):i=t[o],i._$AI(a),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,a){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,o){const a=this.strings;let s=!1;if(void 0===a)e=X(this,e,t,0),s=!I(e)||e!==this._$AH&&e!==W,s&&(this._$AH=e);else{const o=e;let r,n;for(e=a[0],r=0;r<a.length-1;r++)n=X(this,o[i+r],t,r),n===W&&(n=this._$AH[r]),s||=!I(n)||n!==this._$AH[r],n===q?e=q:e!==q&&(e+=(n??"")+a[r+1]),this._$AH[r]=n}s&&!o&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class te extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class ie extends Q{constructor(e,t,i,o,a){super(e,t,i,o,a),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??q)===W)return;const i=this._$AH,o=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==q&&(i===q||o);o&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const ae=x.litHtmlPolyfillSupport;ae?.(G,Z),(x.litHtmlVersions??=[]).push("3.3.2");const se=globalThis;class re extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const o=i?.renderBefore??t;let a=o._$litPart$;if(void 0===a){const e=i?.renderBefore??null;o._$litPart$=a=new Z(t.insertBefore(T(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}re._$litElement$=!0,re.finalized=!0,se.litElementHydrateSupport?.({LitElement:re});const ne=se.litElementPolyfillSupport;ne?.({LitElement:re}),(se.litElementVersions??=[]).push("4.2.2");const de={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:f},ce=(e=de,t,i)=>{const{kind:o,metadata:a}=i;let s=globalThis.litPropertyMetadata.get(a);if(void 0===s&&globalThis.litPropertyMetadata.set(a,s=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,a,e,!0,i)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const a=this[o];t.call(this,i),this.requestUpdate(o,a,e,!0,i)}}throw Error("Unsupported decorator location: "+o)};function le(e){return(t,i)=>"object"==typeof i?ce(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function he(e){return le({...e,state:!0,attribute:!1})}const pe=new class{constructor(){this.listeners=new Map}on(e,t){let i=this.listeners.get(e);return i||(i=new Set,this.listeners.set(e,i)),i.add(t),()=>this.off(e,t)}off(e,t){this.listeners.get(e)?.delete(t)}emit(e,t){const i=this.listeners.get(e);if(i)for(const o of[...i])o(t)}},_e=s`
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
`,ue=s`
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
`;const ge={fr:{common:{save:"Enregistrer",saving:"Enregistrement…",reset:"Réinitialiser",close:"Fermer",back:"Retour",select:"Sélectionner…",hide:"Masquer",show:"Afficher",on:"Allumé",off:"Éteint",error_save:"Erreur de sauvegarde",config_saved:"Configuration sauvegardée",entities:"entités",no_entity:"Aucune entité",delete:"Supprimer"},light:{title:"LUMIÈRES",intensity:"Intensité",temperature:"Température",color:"Couleur",color_temp_label:"Température de couleur",toggle_aria:"Allumer/éteindre {name}",expand_aria:"Développer les contrôles de {name}",toggle_all_on_aria:"Éteindre toutes les lumières",toggle_all_off_aria:"Allumer toutes les lumières",color_aria:"Couleur {hex}",color_picker_aria:"Ouvrir la roue chromatique",color_picker_title:"Choisir une couleur",effect_off:"Éteint",effect_candle:"Bougie",effect_fire:"Feu",temp_warm:"Chaud",temp_neutral:"Neutre",temp_cold:"Froid",dashboard_title:"LUMIÈRES ALLUMÉES",dashboard_overflow:"et {count} autres…",dashboard_turn_all_off_aria:"Éteindre toutes les lumières de la maison"},popup:{close_aria:"Fermer",toggle_scenes_aria:"Afficher/masquer les scènes",activate_scene_aria:"Activer {name}"},weather:{title:"MÉTÉO",feels_like:"Ressenti {temp}°",humidity:"Humidité",wind:"Vent",pressure:"Pression",uv:"UV",visibility:"Visibilité",sunrise:"Lever du soleil",sunset:"Coucher du soleil",daily_tab:"7 jours",hourly_tab:"Horaire",today:"Auj.",now:"Actuel",cond_sunny:"Ensoleillé",cond_clear_night:"Nuit claire",cond_partly_cloudy:"Partiellement nuageux",cond_cloudy:"Couvert",cond_foggy:"Brouillard",cond_rainy:"Pluie",cond_pouring:"Pluie forte",cond_snowy:"Neige",cond_snowy_rainy:"Pluie verglaçante",cond_hail:"Grêle",cond_lightning:"Éclairs",cond_stormy:"Orage",cond_windy:"Venteux",cond_windy_variant:"Venteux nuageux",cond_exceptional:"Exceptionnel"},cover:{title:"VOLETS",open:"Ouvert",closed:"Fermé",opening:"Ouverture…",closing:"Fermeture…",position:"Position",tilt:"Inclinaison",stop_aria:"Arrêter {name}",open_aria:"Ouvrir {name}",close_aria:"Fermer {name}",toggle_aria:"Basculer {name}",expand_aria:"Développer les contrôles de {name}",open_all_aria:"Ouvrir tous les volets",close_all_aria:"Fermer tous les volets",preset_open:"Ouvert",preset_closed:"Fermé",dashboard_title_one:"1 VOLET OUVERT",dashboard_title:"{count} VOLETS OUVERTS",dc_shutter:"Volet",dc_blind:"Store",dc_curtain:"Rideau",dc_garage:"Garage",dc_gate:"Portail",dc_door:"Porte",dc_awning:"Auvent",dc_shade:"Store",dc_window:"Fenêtre",dc_damper:"Clapet"},title_card:{mode_label:"Mode :",scene_label:"Scène :",mode_none:"Aucun",cycle_aria:"Changer de mode"},spotify:{title:"Spotify",search_placeholder:"Rechercher un titre, artiste, podcast…",tab_all:"Tout",tab_tracks:"Titres",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"Mes playlists",recently_played:"Écoutes récentes",saved_tracks:"Titres likés",followed_podcasts:"Podcasts suivis",tracks_count:"{count} titres",episodes_count:"{count} épisodes",type_track:"Titre",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play_on:"Jouer sur…",play_aria:"Jouer {name}",available:"Disponible",paused:"En pause",no_results:"Aucun résultat pour « {query} »",no_content:"Aucun contenu",load_more:"Voir plus",loading:"Chargement…",error_api:"Erreur Spotify",error_rate_limit:"Trop de requêtes, réessayez dans {seconds}s",not_configured:"Intégration Spotify non configurée",no_entity:"Configurez l'entité Spotify dans le panneau de configuration",open_config:"Ouvrir la configuration",back:"Retour"},editor:{redirect_message:"La configuration de Glass Cards se fait depuis le panneau dédié.",open_config:"Ouvrir Glass Cards Config"},config:{title:"Configuration",brand:"GLASS CARDS",tab_navbar:"Barre de nav",tab_popup:"Popup Pièce",tab_light:"Carte Lumières",preview:"Aperçu",navbar_behavior:"Comportement",navbar_auto_sort:"Tri automatique",navbar_auto_sort_desc:"Les pièces actives remontent en premier",navbar_rooms_banner:"Réordonnez les pièces par glisser-déposer. Désactivez celles à masquer.",navbar_visible_rooms:"Pièces visibles",navbar_empty_rooms:"Pièces vides",navbar_empty_rooms_desc:"Ces pièces n'ont aucune entité assignée dans Home Assistant. Ajoutez des appareils à ces zones pour qu'elles apparaissent dans la navbar.",navbar_indicators:"Indicateurs",navbar_indicators_desc:"Activez ou désactivez les indicateurs visuels sur la navbar.",navbar_ind_lights:"Lumières allumées",navbar_ind_lights_desc:"Glow doré sur l'icône",navbar_ind_temp:"Température",navbar_ind_temp_desc:"Badge chaud / froid",navbar_ind_humidity:"Humidité",navbar_ind_humidity_desc:"Barre bleue en bas",navbar_ind_media:"Média en lecture",navbar_ind_media_desc:"Bounce de l'icône",navbar_thresholds:"Seuils",navbar_thresholds_desc:"Définissez les seuils pour les alertes de température et d'humidité.",navbar_temp_high:"Température haute",navbar_temp_low:"Température basse",navbar_humidity_threshold:"Seuil humidité",navbar_choose_icon:"Choisir icône",navbar_change_icon_aria:"Changer l'icône de {name}",navbar_icon_label:"Icône — {name}",popup_room:"Pièce",popup_room_desc:"Sélectionnez une pièce pour configurer l'ordre et la visibilité de ses cartes internes.",popup_internal_cards:"Cartes internes",popup_internal_cards_desc:"Ordonnez les cartes affichées dans le popup de cette pièce.",popup_scenes:"Scènes",popup_scenes_desc:"Réordonnez et masquez les scènes affichées en haut du popup.",popup_select_room:"Sélectionnez une pièce",light_room:"Pièce",light_room_desc:"Sélectionnez une pièce pour configurer ses lumières : ordre, visibilité et mode d'affichage.",light_list_title:"Lumières",light_list_banner:"Glissez pour réordonner. Le bouton layout bascule entre pleine largeur et compact.",light_no_lights:"Aucune lumière dans cette pièce.",light_no_visible:"Aucune lumière visible",light_select_room:"Sélectionnez une pièce",light_change_layout_aria:"Changer le layout",light_layout_compact:"COMPACT",light_layout_full:"PLEIN",light_schedule_hint:"Appuyez sur l'icône calendrier de chaque lumière pour définir des périodes de visibilité.",light_schedule_aria:"Gérer la planification de visibilité de {name}",light_schedule_title:"Planification de visibilité",light_schedule_start:"Début",light_schedule_end:"Fin",light_schedule_recurring:"Annuel",light_schedule_add:"Ajouter une période",light_schedule_delete_aria:"Supprimer la période",light_schedule_no_date:"Choisir une date…",light_schedule_confirm:"Confirmer",light_schedule_prev_month_aria:"Mois précédent",light_schedule_next_month_aria:"Mois suivant",light_show_header:"Afficher l'en-tête",light_show_header_desc:"Titre, compteur et bouton tout allumer/éteindre au-dessus de la carte",light_dashboard_vs_room:"Sur le tableau de bord, seules les lumières allumées des pièces visibles sont affichées. Dans chaque pièce, toutes les lumières sont affichées avec leurs contrôles complets.",domain_light:"Lumières",domain_light_desc:"Contrôle des lumières",domain_media_player:"Média",domain_media_player_desc:"Lecteurs multimédias",domain_climate:"Climat",domain_climate_desc:"Thermostats et climatisation",domain_fan:"Ventilateur",domain_fan_desc:"Ventilation",domain_cover:"Volets",domain_cover_desc:"Stores et volets roulants",domain_vacuum:"Aspirateur",domain_vacuum_desc:"Robots aspirateurs",tab_weather:"Carte Météo",weather_entity:"Entité météo",weather_entity_desc:"Sélectionnez l'entité météo à afficher sur la carte.",weather_metrics:"Métriques visibles",weather_metrics_desc:"Activez ou désactivez les métriques affichées sur la carte.",weather_forecasts:"Onglets prévisions",weather_forecasts_desc:"Activez ou désactivez les onglets de prévisions.",weather_metric_humidity:"Humidité",weather_metric_wind:"Vent",weather_metric_pressure:"Pression",weather_metric_uv:"UV",weather_metric_visibility:"Visibilité",weather_metric_sunrise:"Lever du soleil",weather_metric_sunset:"Coucher du soleil",weather_daily:"Prévisions 7 jours",weather_hourly:"Prévisions horaires",weather_select_entity:"Sélectionnez une entité météo",weather_show_header:"Afficher l'en-tête",weather_show_header_desc:"Titre et localisation au-dessus de la carte",tab_title:"Carte Titre",title_title:"Texte du titre",title_title_desc:"Texte principal affiché sur la carte.",title_title_placeholder:"Ma Maison",title_mode_entity:"Entité mode",title_mode_entity_desc:"Sélectionnez un input_select, input_boolean ou une scène pour les modes.",title_select_entity:"Sélectionnez une entité",title_modes:"Configuration des modes",title_modes_desc:"Personnalisez le libellé, l'icône et la couleur de chaque mode.",title_mode_label:"Libellé",title_mode_icon:"Icône",title_mode_color:"Couleur",title_color_picker_title:"Choisir une couleur",title_color_picker_aria:"Ouvrir la roue chromatique",title_no_modes:"Sélectionnez d'abord une entité mode.",title_no_icons_found:"Aucune icône trouvée",title_no_icon:"Aucune",dashboard_card_title:"Carte Titre",dashboard_card_title_desc:"Texte titre avec sélecteur de mode optionnel",tab_dashboard:"Tableau de bord",dashboard_title:"Cartes du tableau de bord",dashboard_desc:"Activez ou désactivez les cartes affichées sur le tableau de bord Home Assistant.",dashboard_card_weather:"Carte Météo",dashboard_card_weather_desc:"Affiche la météo actuelle, prévisions et animations",dashboard_card_light:"Carte Lumières",dashboard_card_light_desc:"Affiche les lumières allumées avec contrôle rapide",dashboard_light_auto:"Les lumières allumées s'affichent automatiquement sur le tableau de bord.",dashboard_card_cover:"Carte Volets",dashboard_card_cover_desc:"Affiche les volets sélectionnés avec contrôle de position",dashboard_card_spotify:"Carte Spotify",dashboard_card_spotify_desc:"Bibliothèque musicale, recherche et lecture Spotify",tab_cover:"Carte Volets",cover_show_header:"Afficher l'en-tête",cover_show_header_desc:"Titre, compteur et boutons ouvrir/fermer tout au-dessus de la carte",cover_dashboard_entities:"Volets du tableau de bord",cover_dashboard_entities_desc:"Sélectionnez les volets à afficher sur le tableau de bord. Tous les volets sélectionnés sont affichés quel que soit leur état.",cover_dashboard_no_entities:"Aucun volet sélectionné pour le tableau de bord.",cover_room:"Pièce",cover_room_desc:"Sélectionnez une pièce pour configurer ses volets : ordre et visibilité.",cover_list_title:"Volets",cover_list_banner:"Glissez pour réordonner. Désactivez ceux à masquer.",cover_no_covers:"Aucun volet dans cette pièce.",cover_select_room:"Sélectionnez une pièce",cover_presets:"Positions favorites",cover_presets_desc:"Configurez les boutons de position rapide affichés sous chaque volet.",cover_preset_add:"Ajouter",cover_preset_placeholder:"0–100",tab_spotify:"Carte Spotify",spotify_show_header:"Afficher l'en-tête",spotify_show_header_desc:"Titre et contrôles au-dessus de la carte",spotify_entity:"Entité lecteur Spotify",spotify_entity_desc:"Sélectionnez l'entité media_player Spotify à utiliser pour la carte.",spotify_sort_order:"Ordre de tri",spotify_sort_order_desc:"Choisissez l'ordre d'affichage des playlists et titres sauvegardés.",spotify_sort_recent:"Plus récent en premier",spotify_sort_oldest:"Plus ancien en premier",spotify_select_entity:"Sélectionnez un lecteur Spotify",spotify_max_items:"Éléments par section",spotify_max_items_desc:"Nombre maximum d'éléments affichés par section (playlists, titres récents, etc.).",spotify_not_configured:"Intégration Spotify non configurée",spotify_setup_guide:"Pour utiliser la carte Spotify, vous devez d'abord configurer l'intégration Spotify officielle dans Home Assistant.",spotify_setup_step1:"Allez dans Paramètres → Appareils et services",spotify_setup_step2:"Cliquez sur « Ajouter une intégration » et cherchez « Spotify »",spotify_setup_step3:"Connectez-vous avec votre compte Spotify et autorisez l'accès",spotify_setup_step4:"Une entité media_player.spotify_* apparaîtra automatiquement",spotify_setup_note:"Un compte Spotify Premium est requis pour les contrôles de lecture.",spotify_checking:"Vérification de la connexion Spotify…",spotify_open_settings:"Ouvrir les paramètres"}},en:{common:{save:"Save",saving:"Saving…",reset:"Reset",close:"Close",back:"Back",select:"Select…",hide:"Hide",show:"Show",on:"On",off:"Off",error_save:"Save error",config_saved:"Configuration saved",entities:"entities",no_entity:"No entity",delete:"Delete"},light:{title:"LIGHTS",intensity:"Intensity",temperature:"Temperature",color:"Color",color_temp_label:"Color temperature",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",toggle_all_on_aria:"Turn off all lights",toggle_all_off_aria:"Turn on all lights",color_aria:"Color {hex}",color_picker_aria:"Open color wheel",color_picker_title:"Choose a color",effect_off:"Off",effect_candle:"Candle",effect_fire:"Fire",temp_warm:"Warm",temp_neutral:"Neutral",temp_cold:"Cold",dashboard_title:"LIGHTS ON",dashboard_overflow:"and {count} more…",dashboard_turn_all_off_aria:"Turn off all lights in the house"},popup:{close_aria:"Close",toggle_scenes_aria:"Toggle scenes",activate_scene_aria:"Activate {name}"},weather:{title:"WEATHER",feels_like:"Feels like {temp}°",humidity:"Humidity",wind:"Wind",pressure:"Pressure",uv:"UV",visibility:"Visibility",sunrise:"Sunrise",sunset:"Sunset",daily_tab:"7 days",hourly_tab:"Hourly",today:"Today",now:"Now",cond_sunny:"Sunny",cond_clear_night:"Clear night",cond_partly_cloudy:"Partly cloudy",cond_cloudy:"Cloudy",cond_foggy:"Foggy",cond_rainy:"Rain",cond_pouring:"Heavy rain",cond_snowy:"Snow",cond_snowy_rainy:"Sleet",cond_hail:"Hail",cond_lightning:"Lightning",cond_stormy:"Stormy",cond_windy:"Windy",cond_windy_variant:"Windy cloudy",cond_exceptional:"Exceptional"},cover:{title:"COVERS",open:"Open",closed:"Closed",opening:"Opening…",closing:"Closing…",position:"Position",tilt:"Tilt",stop_aria:"Stop {name}",open_aria:"Open {name}",close_aria:"Close {name}",toggle_aria:"Toggle {name}",expand_aria:"Expand {name} controls",open_all_aria:"Open all covers",close_all_aria:"Close all covers",preset_open:"Open",preset_closed:"Closed",dashboard_title_one:"1 COVER OPEN",dashboard_title:"{count} COVERS OPEN",dc_shutter:"Shutter",dc_blind:"Blind",dc_curtain:"Curtain",dc_garage:"Garage",dc_gate:"Gate",dc_door:"Door",dc_awning:"Awning",dc_shade:"Shade",dc_window:"Window",dc_damper:"Damper"},title_card:{mode_label:"Mode:",scene_label:"Scene:",mode_none:"None",cycle_aria:"Change mode"},spotify:{title:"Spotify",search_placeholder:"Search for a track, artist, podcast…",tab_all:"All",tab_tracks:"Tracks",tab_playlists:"Playlists",tab_podcasts:"Podcasts",my_playlists:"My playlists",recently_played:"Recently played",saved_tracks:"Liked songs",followed_podcasts:"Followed podcasts",tracks_count:"{count} tracks",episodes_count:"{count} episodes",type_track:"Track",type_playlist:"Playlist",type_album:"Album",type_podcast:"Podcast",play_on:"Play on…",play_aria:"Play {name}",available:"Available",paused:"Paused",no_results:'No results for "{query}"',no_content:"No content",load_more:"Load more",loading:"Loading…",error_api:"Spotify error",error_rate_limit:"Too many requests, try again in {seconds}s",not_configured:"Spotify integration not configured",no_entity:"Configure the Spotify entity in the configuration panel",open_config:"Open configuration",back:"Back"},editor:{redirect_message:"Glass Cards configuration is managed from the dedicated panel.",open_config:"Open Glass Cards Config"},config:{title:"Configuration",brand:"GLASS CARDS",tab_navbar:"Navbar",tab_popup:"Room Popup",tab_light:"Light Card",preview:"Preview",navbar_behavior:"Behavior",navbar_auto_sort:"Auto sort",navbar_auto_sort_desc:"Active rooms move to the top",navbar_rooms_banner:"Drag to reorder rooms. Toggle to hide.",navbar_visible_rooms:"Visible rooms",navbar_empty_rooms:"Empty rooms",navbar_empty_rooms_desc:"These rooms have no entities assigned in Home Assistant. Add devices to these areas for them to appear in the navbar.",navbar_indicators:"Indicators",navbar_indicators_desc:"Enable or disable visual indicators on the navbar.",navbar_ind_lights:"Lights on",navbar_ind_lights_desc:"Golden glow on icon",navbar_ind_temp:"Temperature",navbar_ind_temp_desc:"Hot / cold badge",navbar_ind_humidity:"Humidity",navbar_ind_humidity_desc:"Blue bar at bottom",navbar_ind_media:"Media playing",navbar_ind_media_desc:"Icon bounce",navbar_thresholds:"Thresholds",navbar_thresholds_desc:"Set thresholds for temperature and humidity alerts.",navbar_temp_high:"High temperature",navbar_temp_low:"Low temperature",navbar_humidity_threshold:"Humidity threshold",navbar_choose_icon:"Choose icon",navbar_change_icon_aria:"Change icon for {name}",navbar_icon_label:"Icon — {name}",popup_room:"Room",popup_room_desc:"Select a room to configure the order and visibility of its internal cards.",popup_internal_cards:"Internal cards",popup_internal_cards_desc:"Order the cards displayed in this room's popup.",popup_scenes:"Scenes",popup_scenes_desc:"Reorder and hide scenes shown at the top of the popup.",popup_select_room:"Select a room",light_room:"Room",light_room_desc:"Select a room to configure its lights: order, visibility and display mode.",light_list_title:"Lights",light_list_banner:"Drag to reorder. The layout button toggles between full width and compact.",light_no_lights:"No lights in this room.",light_no_visible:"No visible lights",light_select_room:"Select a room",light_change_layout_aria:"Change layout",light_layout_compact:"COMPACT",light_layout_full:"FULL",light_schedule_hint:"Tap the calendar icon on each light to set visibility periods.",light_schedule_aria:"Manage visibility schedule for {name}",light_schedule_title:"Visibility schedule",light_schedule_start:"Start",light_schedule_end:"End",light_schedule_recurring:"Annually",light_schedule_add:"Add period",light_schedule_delete_aria:"Delete period",light_schedule_no_date:"Select date…",light_schedule_confirm:"Confirm",light_schedule_prev_month_aria:"Previous month",light_schedule_next_month_aria:"Next month",light_show_header:"Show header",light_show_header_desc:"Title, counter and toggle all button above the card",light_dashboard_vs_room:"On the dashboard, only active lights from visible rooms are shown. In each room, all lights are displayed with full controls.",domain_light:"Lights",domain_light_desc:"Light control",domain_media_player:"Media",domain_media_player_desc:"Media players",domain_climate:"Climate",domain_climate_desc:"Thermostats and air conditioning",domain_fan:"Fan",domain_fan_desc:"Ventilation",domain_cover:"Covers",domain_cover_desc:"Blinds and shutters",domain_vacuum:"Vacuum",domain_vacuum_desc:"Robot vacuums",tab_weather:"Weather Card",weather_entity:"Weather entity",weather_entity_desc:"Select the weather entity to display on the card.",weather_metrics:"Visible metrics",weather_metrics_desc:"Enable or disable metrics shown on the card.",weather_forecasts:"Forecast tabs",weather_forecasts_desc:"Enable or disable forecast tabs.",weather_metric_humidity:"Humidity",weather_metric_wind:"Wind",weather_metric_pressure:"Pressure",weather_metric_uv:"UV",weather_metric_visibility:"Visibility",weather_metric_sunrise:"Sunrise",weather_metric_sunset:"Sunset",weather_daily:"7-day forecast",weather_hourly:"Hourly forecast",weather_select_entity:"Select a weather entity",weather_show_header:"Show header",weather_show_header_desc:"Title and location above the card",tab_title:"Title Card",title_title:"Title text",title_title_desc:"Main text displayed on the card.",title_title_placeholder:"My Home",title_mode_entity:"Mode entity",title_mode_entity_desc:"Select an input_select, input_boolean, or scene for modes.",title_select_entity:"Select an entity",title_modes:"Mode configuration",title_modes_desc:"Customize the label, icon and color for each mode option.",title_mode_label:"Label",title_mode_icon:"Icon",title_mode_color:"Color",title_color_picker_title:"Choose a color",title_color_picker_aria:"Open color wheel",title_no_modes:"Select a mode entity first.",title_no_icons_found:"No icons found",title_no_icon:"None",dashboard_card_title:"Title Card",dashboard_card_title_desc:"Title text with optional mode selector",tab_dashboard:"Dashboard",dashboard_title:"Dashboard cards",dashboard_desc:"Enable or disable the cards displayed on the Home Assistant dashboard.",dashboard_card_weather:"Weather Card",dashboard_card_weather_desc:"Current weather, forecasts and animations",dashboard_card_light:"Light Card",dashboard_card_light_desc:"Shows active lights with quick controls",dashboard_light_auto:"Active lights are automatically displayed on the dashboard.",dashboard_card_cover:"Cover Card",dashboard_card_cover_desc:"Shows selected covers with position controls",dashboard_card_spotify:"Spotify Card",dashboard_card_spotify_desc:"Music library, search and Spotify playback",tab_cover:"Cover Card",cover_show_header:"Show header",cover_show_header_desc:"Title, counter and open/close all buttons above the card",cover_dashboard_entities:"Dashboard covers",cover_dashboard_entities_desc:"Select which covers to display on the dashboard. All selected covers are shown regardless of their state.",cover_dashboard_no_entities:"No cover entities selected for the dashboard.",cover_room:"Room",cover_room_desc:"Select a room to configure its covers: order and visibility.",cover_list_title:"Covers",cover_list_banner:"Drag to reorder. Toggle to hide.",cover_no_covers:"No covers in this room.",cover_select_room:"Select a room",cover_presets:"Favorite positions",cover_presets_desc:"Configure the quick position buttons displayed under each cover.",cover_preset_add:"Add",cover_preset_placeholder:"0–100",tab_spotify:"Spotify Card",spotify_show_header:"Show header",spotify_show_header_desc:"Title and controls above the card",spotify_entity:"Spotify player entity",spotify_entity_desc:"Select the Spotify media_player entity to use for the card.",spotify_sort_order:"Sort order",spotify_sort_order_desc:"Choose the display order for playlists and saved tracks.",spotify_sort_recent:"Most recent first",spotify_sort_oldest:"Oldest first",spotify_select_entity:"Select a Spotify player",spotify_max_items:"Items per section",spotify_max_items_desc:"Maximum number of items displayed per section (playlists, recent tracks, etc.).",spotify_not_configured:"Spotify integration not configured",spotify_setup_guide:"To use the Spotify card, you must first set up the official Spotify integration in Home Assistant.",spotify_setup_step1:"Go to Settings → Devices & services",spotify_setup_step2:'Click "Add integration" and search for "Spotify"',spotify_setup_step3:"Sign in with your Spotify account and authorize access",spotify_setup_step4:"A media_player.spotify_* entity will appear automatically",spotify_setup_note:"A Spotify Premium account is required for playback controls.",spotify_checking:"Checking Spotify connection…",spotify_open_settings:"Open settings"}}},ve="fr";let me=ve;function be(e){const t=e.slice(0,2).toLowerCase(),i=t in ge?t:ve;return i!==me&&(me=i,!0)}function fe(){return me}function ye(e,t){const i=e.indexOf("."),o=-1===i?e:e.slice(0,i),a=-1===i?"":e.slice(i+1),s=ge[me]??ge[ve],r=ge[ve],n=s?.[o]?.[a]??r?.[o]?.[a];let d="string"==typeof n?n:e;if(t)for(const[c,l]of Object.entries(t))d=d.replaceAll(`{${c}}`,String(l));return d}var we=Object.defineProperty,xe=(e,t,i,o)=>{for(var a,s=void 0,r=e.length-1;r>=0;r--)(a=e[r])&&(s=a(t,i,s)||s);return s&&we(t,i,s),s};class $e extends re{constructor(){super(...arguments),this._lang=fe(),this._busCleanups=[]}setConfig(e){this._config=e}shouldUpdate(e){if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;if(t.language!==this.hass?.language)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(e=>t.states[e]!==this.hass?.states[e])}updated(e){super.updated(e),e.has("hass")&&this.hass?.language&&be(this.hass.language)&&(this._lang=fe())}getTrackedEntityIds(){const e=this._config?.entity;return e?[e]:[]}connectedCallback(){super.connectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[]}_listen(e,t){this._busCleanups.push(pe.on(e,t))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(e=>e()),this._busCleanups=[]}}function ke(e,t,i){return Object.values(t).filter(t=>!t.disabled_by&&!t.hidden_by&&function(e,t){if(e.area_id)return e.area_id;if(e.device_id&&t){const i=t[e.device_id];if(i?.area_id)return i.area_id}return null}(t,i)===e)}xe([le({attribute:!1})],$e.prototype,"hass"),xe([he()],$e.prototype,"_lang");class Se{constructor(e){this.connection=e.connection}send(e,t={}){return this.connection.sendMessagePromise({type:`glass_cards/${e}`,...t})}subscribe(e,t,i={}){return this.connection.subscribeMessage(t,{type:`glass_cards/${e}`,...i})}}var Ce=Object.defineProperty,Ee=(e,t,i,o)=>{for(var a,s=void 0,r=e.length-1;r>=0;r--)(a=e[r])&&(s=a(t,i,s)||s);return s&&Ce(t,i,s),s};const Me=["light","media_player","climate","fan","cover","vacuum"],De=new Set(["light","cover"]),Pe={light:"mdi:lightbulb-group",media_player:"mdi:speaker",climate:"mdi:thermostat",fan:"mdi:fan",cover:"mdi:blinds",vacuum:"mdi:robot-vacuum"},Te={light:{name:"config.domain_light",desc:"config.domain_light_desc"},media_player:{name:"config.domain_media_player",desc:"config.domain_media_player_desc"},climate:{name:"config.domain_climate",desc:"config.domain_climate_desc"},fan:{name:"config.domain_fan",desc:"config.domain_fan_desc"},cover:{name:"config.domain_cover",desc:"config.domain_cover_desc"},vacuum:{name:"config.domain_vacuum",desc:"config.domain_vacuum_desc"}};const Ie=["mdi:sofa","mdi:stove","mdi:bed","mdi:desk","mdi:shower","mdi:home","mdi:movie-open","mdi:music","mdi:wrench","mdi:flower","mdi:white-balance-sunny","mdi:weather-night","mdi:lightbulb","mdi:snowflake","mdi:fire","mdi:lock"];class ze extends re{constructor(){super(...arguments),this.narrow=!1,this._mounted=!1,this._lang=fe(),this._tab="dashboard",this._rooms=[],this._emptyRooms=[],this._selectedRoom="",this._cards=[],this._scenes=[],this._lights=[],this._lightRoom="",this._lightDropdownOpen=!1,this._iconPickerRoom=null,this._dropdownOpen=!1,this._toast=!1,this._saving=!1,this._showLights=!0,this._showTemperature=!0,this._showHumidity=!0,this._showMedia=!0,this._autoSort=!0,this._tempHigh=24,this._tempLow=17,this._humidityThreshold=65,this._weatherEntity="",this._weatherHiddenMetrics=[],this._weatherShowDaily=!0,this._weatherShowHourly=!0,this._weatherShowHeader=!0,this._weatherDropdownOpen=!1,this._titleText="",this._titleModeEntity="",this._titleModes=[],this._titleModeDropdownOpen=!1,this._iconPopupModeIdx=null,this._iconSearch="",this._iconList=[],this._colorPickerModeIdx=null,this._colorPickerHex="#ffffff",this._colorPickerPos={x:50,y:50},this._cpCanvas=null,this._lightShowHeader=!0,this._coverShowHeader=!0,this._coverDashboardEntities=[],this._coverDashboardOrder=[],this._coverPresets=[0,25,50,75,100],this._coverRoom="",this._coverRoomDropdownOpen=!1,this._coverRoomEntities=[],this._coverPresetInput="",this._spotifyShowHeader=!0,this._spotifyEntity="",this._spotifySortOrder="recent_first",this._spotifyDropdownOpen=!1,this._spotifyMaxItems=6,this._spotifyConfigured=null,this._dashboardEnabledCards=["weather"],this._dashboardCardOrder=["title","weather","light","cover","spotify"],this._dashboardExpanded=new Set,this._scheduleExpandedEntity=null,this._scheduleEdits=new Map,this._schedulesLoaded={},this._pickerOpen=!1,this._pickerTarget=null,this._pickerYear=(new Date).getFullYear(),this._pickerMonth=(new Date).getMonth(),this._pickerStartDay=null,this._pickerStartMonth=0,this._pickerStartYear=(new Date).getFullYear(),this._pickerEndDay=null,this._pickerEndMonth=0,this._pickerEndYear=(new Date).getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerEndHour="23",this._pickerEndMinute="59",this._pickerPhase="start",this._dragIdx=null,this._dropIdx=null,this._dragContext="rooms",this._loaded=!1,this._loading=!1,this._toastError=!1,this._boundCloseDropdowns=this._closeDropdownsOnOutsideClick.bind(this),this._boundUpdateScrollMask=this._updateScrollMask.bind(this),this._initialIcons=new Map,this._tabsEl=null,this._iconLoading=!1}static{this.styles=[_e,ue,s`
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
      .tabs {
        display: flex;
        gap: 0;
        border-radius: 12px;
        background: var(--s1);
        border: 1px solid var(--b1);
        padding: 3px;
        margin-bottom: 16px;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        scroll-behavior: smooth;
      }
      .tabs::-webkit-scrollbar { display: none; }
      .tabs.mask-right {
        mask-image: linear-gradient(to right, black calc(100% - 24px), transparent 100%);
        -webkit-mask-image: linear-gradient(to right, black calc(100% - 24px), transparent 100%);
      }
      .tabs.mask-left {
        mask-image: linear-gradient(to left, black calc(100% - 24px), transparent 100%);
        -webkit-mask-image: linear-gradient(to left, black calc(100% - 24px), transparent 100%);
      }
      .tabs.mask-both {
        mask-image: linear-gradient(to right, transparent 0%, black 24px, black calc(100% - 24px), transparent 100%);
        -webkit-mask-image: linear-gradient(to right, transparent 0%, black 24px, black calc(100% - 24px), transparent 100%);
      }
      .tab {
        flex-shrink: 0;
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
      @media (hover: hover) and (pointer: fine) {
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
        display: flex; align-items: center; justify-content: center;
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
      @media (hover: hover) and (pointer: fine) {
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
      .preview-title-mode {
        display: flex; align-items: center; gap: 4px;
        font-size: 9px;
      }
      .preview-title-mode ha-icon {
        display: flex; align-items: center; justify-content: center;
      }
      .preview-title-dot {
        width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
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
      }
      .title-mode-id {
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
        transition: left 0.05s, top 0.05s;
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
        margin: 4px 0 0;
        padding: 8px 10px;
        border-radius: var(--radius-md);
        background: var(--s1);
        border: 1px solid var(--b1);
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
      .schedule-btn:active { transform: scale(0.96); }
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
      .schedule-delete:active { transform: scale(0.96); }

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
      @media (hover: hover) and (pointer: fine) {
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
      @media (hover: hover) and (pointer: fine) {
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
      @media (hover: hover) and (pointer: fine) {
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
    `]}shouldUpdate(e){if(!e.has("hass"))return!0;if(e.size>1)return!0;const t=e.get("hass");return!(!t||t.language===this.hass?.language)||!this._loaded}connectedCallback(){super.connectedCallback(),this._mounted=!0,document.addEventListener("click",this._boundCloseDropdowns)}disconnectedCallback(){super.disconnectedCallback(),this._mounted=!1,document.removeEventListener("click",this._boundCloseDropdowns),this._removeTabsScrollListener(),void 0!==this._toastTimeout&&(clearTimeout(this._toastTimeout),this._toastTimeout=void 0),this._cancelColorDrag?.(),this._cancelColorDrag=void 0,this._backend=void 0}_closeDropdownsOnOutsideClick(e){if(!(this._dropdownOpen||this._lightDropdownOpen||this._weatherDropdownOpen||this._titleModeDropdownOpen||this._coverRoomDropdownOpen))return;const t=e.composedPath(),i=this.shadowRoot;if(!i)return;const o=i.querySelectorAll(".dropdown");for(const a of o)if(t.includes(a))return;this._dropdownOpen=!1,this._lightDropdownOpen=!1,this._weatherDropdownOpen=!1,this._titleModeDropdownOpen=!1,this._coverRoomDropdownOpen=!1}_setupTabsScrollListener(){if(this._tabsEl)return;const e=this.shadowRoot?.querySelector(".tabs");e&&(this._tabsEl=e,e.addEventListener("scroll",this._boundUpdateScrollMask,{passive:!0}),this._updateScrollMask())}_removeTabsScrollListener(){this._tabsEl&&(this._tabsEl.removeEventListener("scroll",this._boundUpdateScrollMask),this._tabsEl=null)}_updateScrollMask(){const e=this._tabsEl;if(!e)return;const t=e.scrollLeft<=5,i=e.scrollLeft+e.offsetWidth>=e.scrollWidth-5;e.classList.remove("mask-left","mask-right","mask-both"),t&&!i?e.classList.add("mask-right"):!t&&i?e.classList.add("mask-left"):t||i||e.classList.add("mask-both")}updated(e){super.updated(e),this._setupTabsScrollListener(),e.has("hass")&&(this.hass?.language&&be(this.hass.language)&&(this._lang=fe()),this.hass&&this._backend&&this._backend.connection!==this.hass.connection&&(this._backend=void 0,this._loaded=!1,this._loading=!1),!this.hass||this._loaded||this._loading||(this._backend=new Se(this.hass),this._loadConfig()))}async _loadConfig(){if(this.hass&&!this._loading){this._loading=!0;try{await this._loadConfigInner(),this._loaded=!0}catch{this._loaded=!1}finally{this._loading=!1}}}async _loadConfigInner(){if(!this.hass)return;const e=Object.values(this.hass.areas).sort((e,t)=>e.name.localeCompare(t.name));let t={room_order:[],hidden_rooms:[],show_lights:!0,show_temperature:!0,show_humidity:!0,show_media:!0,auto_sort:!0,temp_high:24,temp_low:17,humidity_threshold:65},i={entity_id:"",hidden_metrics:[],show_daily:!0,show_hourly:!0,show_header:!0},o={enabled_cards:["weather"],card_order:["title","weather","light","cover","spotify"]},a={show_header:!0},s={title:"",mode_entity:"",modes:[]},r={show_header:!0,dashboard_entities:[],presets:[0,25,50,75,100]},n={show_header:!0,entity_id:"",sort_order:"recent_first",max_items_per_section:6};const d={};try{if(!this._backend)throw new Error("No backend");const e=await this._backend.send("get_config");t=e.navbar,Object.assign(d,e.rooms),e.weather&&(i=e.weather),e.light_card&&(a=e.light_card),e.title_card&&(s=e.title_card),e.cover_card&&(r=e.cover_card),e.spotify_card&&(n=e.spotify_card),e.dashboard&&(o=e.dashboard)}catch{}this._showLights=t.show_lights??!0,this._showTemperature=t.show_temperature??!0,this._showHumidity=t.show_humidity??!0,this._showMedia=t.show_media??!0,this._autoSort=t.auto_sort??!0,this._tempHigh=t.temp_high??24,this._tempLow=t.temp_low??17,this._humidityThreshold=t.humidity_threshold??65,this._weatherEntity=i.entity_id??"",this._weatherHiddenMetrics=i.hidden_metrics??[],this._weatherShowDaily=i.show_daily??!0,this._weatherShowHourly=i.show_hourly??!0,this._weatherShowHeader=i.show_header??!0,this._lightShowHeader=a.show_header??!0,this._titleText=s.title??"",this._titleModeEntity=s.mode_entity??"",this._titleModes=s.modes??[],this._coverShowHeader=r.show_header??!0,this._coverDashboardEntities=r.dashboard_entities??[],this._coverPresets=r.presets??[0,25,50,75,100],this._initCoverDashboardOrder(),this._spotifyShowHeader=n.show_header??!0,this._spotifyEntity=n.entity_id??"",this._spotifySortOrder="oldest_first"===n.sort_order?"oldest_first":"recent_first",this._spotifyMaxItems=n.max_items_per_section??6,this._checkSpotifyStatus(),this._dashboardEnabledCards=o.enabled_cards??["weather"],this._dashboardCardOrder=o.card_order??["title","weather","light","cover","spotify"];const c=new Set(t.hidden_rooms),l=new Map;t.room_order.forEach((e,t)=>l.set(e,t));const h=this.hass;if(!h)return;const p=[],_=[];for(const u of e){const e=ke(u.area_id,h.entities,h.devices),t=d[u.area_id]?.icon,i=t||u.icon||"mdi:home";if(0===e.length){_.push({areaId:u.area_id,name:u.name,icon:i});continue}let o=0,a=null,s=null,r=null,n=null,l=!1;for(const d of e){const e=h.states[d.entity_id];if(!e)continue;const t=d.entity_id.split(".")[0];if("light"===t&&"on"===e.state&&o++,"sensor"===t){const t=e.attributes.device_class;"temperature"!==t||a||(a=`${e.state}°`,s=parseFloat(e.state)),"humidity"!==t||r||(r=`${e.state}%`,n=parseFloat(e.state))}"media_player"===t&&"playing"===e.state&&(l=!0)}p.push({areaId:u.area_id,name:u.name,icon:i,entityCount:e.length,visible:!c.has(u.area_id),lightsOn:o,temperature:a,tempValue:s,humidity:r,humidityValue:n,mediaPlaying:l})}this._initialIcons.clear();for(const u of p)this._initialIcons.set(u.areaId,u.icon);p.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=l.get(e.areaId),o=l.get(t.areaId);return void 0!==i&&void 0!==o?i-o:void 0!==i?-1:void 0!==o?1:e.name.localeCompare(t.name)}),this._rooms=p,this._emptyRooms=_,!this._selectedRoom&&p.length>0&&(this._selectedRoom=p[0].areaId),this._loadRoomCards()}async _loadRoomCards(){if(!this.hass||!this._selectedRoom)return this._cards=[],void(this._scenes=[]);const e=ke(this._selectedRoom,this.hass.entities,this.hass.devices);let t=null,i=new Set,o=new Set,a=[];try{if(!this._backend)throw new Error("No backend");const e=await this._backend.send("get_room",{area_id:this._selectedRoom});e&&(t=e.card_order.length>0?e.card_order:null,i=new Set(e.hidden_entities),o=new Set(e.hidden_scenes??[]),a=e.scene_order??[])}catch{}const s=this.hass,r=e.filter(e=>e.entity_id.startsWith("scene.")),n=new Map;a.forEach((e,t)=>n.set(e,t));const d=r.map(e=>{const t=s.states[e.entity_id];return{entityId:e.entity_id,name:t?.attributes.friendly_name||e.entity_id.split(".")[1],visible:!o.has(e.entity_id)}});d.sort((e,t)=>{const i=n.get(e.entityId),o=n.get(t.entityId);return void 0!==i&&void 0!==o?i-o:void 0!==i?-1:void 0!==o?1:e.name.localeCompare(t.name)}),this._scenes=d;const c=new Map;for(const p of e){if(i.has(p.entity_id))continue;const e=p.entity_id.split(".")[0];c.set(e,(c.get(e)||0)+1)}const l=t?[...t]:[...Me],h=new Set(l);for(const p of c.keys())!h.has(p)&&Pe[p]&&l.push(p);this._cards=l.filter(e=>(c.get(e)||0)>0&&De.has(e)).map(e=>{const i=function(e){const t=Te[e];return{nameKey:t?t.name:null,icon:Pe[e]||"mdi:help-circle",descKey:t?t.desc:null}}(e),o=c.get(e)||0;return{id:e,nameKey:i.nameKey,icon:i.icon,descKey:i.descKey,count:o,visible:t?t.includes(e):o>0}})}_switchTab(e){this._tab=e,this._iconPickerRoom=null,this._dropdownOpen=!1,this._lightDropdownOpen=!1,this._weatherDropdownOpen=!1,this._titleModeDropdownOpen=!1,this._coverRoomDropdownOpen=!1,this._spotifyDropdownOpen=!1,this._iconPopupModeIdx=null,this._colorPickerModeIdx=null,"light"===e&&!this._lightRoom&&this._rooms.length>0&&(this._lightRoom=this._rooms[0].areaId,this._loadRoomLights()),"cover"===e&&!this._coverRoom&&this._rooms.length>0&&(this._coverRoom=this._rooms[0].areaId,this._loadRoomCovers()),"cover"!==e&&"dashboard"!==e||0!==this._coverDashboardOrder.length||this._initCoverDashboardOrder()}_onDragStart(e,t){this._dragIdx=e,this._dragContext=t}_onDragOver(e,t){t.preventDefault(),null!==this._dragIdx&&this._dragIdx!==e&&(this._dropIdx=e)}_onDragLeave(){this._dropIdx=null}_onDropGeneric(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e)return this._dragIdx=null,void(this._dropIdx=null);const i=this._dragContext;if("rooms"===i){const t=[...this._rooms],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._rooms=t}else if("cards"===i){const t=[...this._cards],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._cards=t}else if("scenes"===i){const t=[...this._scenes],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._scenes=t}else if("lights"===i){const t=[...this._lights],[i]=t.splice(this._dragIdx,1);t.splice(e,0,i),this._lights=t}this._dragIdx=null,this._dropIdx=null}_onDragEnd(){this._dragIdx=null,this._dropIdx=null}_toggleRoomVisible(e){const t=this._rooms.map(t=>t.areaId===e?{...t,visible:!t.visible}:t),i=t.filter(e=>e.visible),o=t.filter(e=>!e.visible);this._rooms=[...i,...o]}_openIconPicker(e){this._iconPickerRoom=this._iconPickerRoom===e?null:e}_setRoomIcon(e,t){this._rooms=this._rooms.map(i=>i.areaId===e?{...i,icon:t}:i),this._iconPickerRoom=null}_toggleCardVisible(e){this._cards=this._cards.map(t=>t.id===e?{...t,visible:!t.visible}:t)}_toggleSceneVisible(e){this._scenes=this._scenes.map(t=>t.entityId===e?{...t,visible:!t.visible}:t)}_selectRoom(e){this._selectedRoom=e,this._dropdownOpen=!1,this._loadRoomCards()}async _saveNavbar(){const e=this._backend;if(e&&!this._saving){this._saving=!0;try{await e.send("set_navbar",{room_order:this._rooms.filter(e=>e.visible).map(e=>e.areaId),hidden_rooms:this._rooms.filter(e=>!e.visible).map(e=>e.areaId),show_lights:this._showLights,show_temperature:this._showTemperature,show_humidity:this._showHumidity,show_media:this._showMedia,auto_sort:this._autoSort,temp_high:this._tempHigh,temp_low:this._tempLow,humidity_threshold:this._humidityThreshold});const t=this._rooms.filter(e=>e.icon!==this._initialIcons.get(e.areaId)).map(t=>{const i=this.hass?.areas[t.areaId],o=i?.icon||"mdi:home",a=t.icon===o?null:t.icon;return e.send("set_room",{area_id:t.areaId,icon:a})});if(t.length>0&&await Promise.all(t),!this._mounted)return;this._showToast(),pe.emit("navbar-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _savePopup(){if(this._backend&&!this._saving&&this._selectedRoom){this._saving=!0;try{if(await this._backend.send("set_room",{area_id:this._selectedRoom,card_order:this._cards.filter(e=>e.visible).map(e=>e.id),hidden_scenes:this._scenes.filter(e=>!e.visible).map(e=>e.entityId),scene_order:this._scenes.map(e=>e.entityId)}),!this._mounted)return;this._showToast(),pe.emit("room-config-changed",{areaId:this._selectedRoom})}catch{this._showToast(!0)}finally{this._saving=!1}}}_save(){"navbar"===this._tab?this._saveNavbar():"popup"===this._tab?this._savePopup():"light"===this._tab?this._saveLights():"weather"===this._tab?this._saveWeather():"title"===this._tab?this._saveTitle():"cover"===this._tab?this._saveCover():"spotify"===this._tab?this._saveSpotify():this._saveDashboard()}_selectLightRoom(e){this._lightRoom=e,this._lightDropdownOpen=!1,this._loadRoomLights()}async _loadRoomLights(){if(!this.hass||!this._lightRoom)return void(this._lights=[]);const e=ke(this._lightRoom,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("light."));let t=new Set,i=[],o={};try{if(!this._backend)throw new Error("No backend");const e=await this._backend.send("get_room",{area_id:this._lightRoom});e&&(t=new Set(e.hidden_entities??[]),i=e.entity_order??[],o=e.entity_layouts??{})}catch{}const a=this.hass,s=new Map;i.forEach((e,t)=>s.set(e,t));const r=e.map(e=>{const i=a.states[e.entity_id],s="on"===i?.state,r=i?.attributes.brightness,n=s&&void 0!==r?Math.round(r/255*100):0;return{entityId:e.entity_id,name:i?.attributes.friendly_name||e.entity_id.split(".")[1],isOn:s,brightnessPct:n,layout:o[e.entity_id]||"compact",visible:!t.has(e.entity_id)}});r.sort((e,t)=>{if(e.visible!==t.visible)return e.visible?-1:1;const i=s.get(e.entityId),o=s.get(t.entityId);return void 0!==i&&void 0!==o?i-o:void 0!==i?-1:void 0!==o?1:e.name.localeCompare(t.name)}),this._lights=r;try{if(this._backend){const e=await this._backend.send("get_schedules");this._schedulesLoaded=e??{},this._scheduleEdits=new Map;for(const t of r){const e=this._schedulesLoaded[t.entityId];this._scheduleEdits.set(t.entityId,e?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}}}catch{}}_toggleLightVisible(e){const t=this._lights.map(t=>t.entityId===e?{...t,visible:!t.visible}:t),i=t.filter(e=>e.visible),o=t.filter(e=>!e.visible);this._lights=[...i,...o]}_cycleLightLayout(e){this._lights=this._lights.map(t=>t.entityId===e?{...t,layout:"full"===t.layout?"compact":"full"}:t)}_toggleScheduleExpand(e){if(this._scheduleExpandedEntity=this._scheduleExpandedEntity===e?null:e,!this._scheduleEdits.has(e)){const t=this._schedulesLoaded[e];this._scheduleEdits.set(e,t?.periods?.map(e=>({start:e.start,end:e.end,recurring:e.recurring??!1}))??[])}this.requestUpdate()}_addSchedulePeriod(e){const t=this._scheduleEdits.get(e)??[];t.push({start:"",end:"",recurring:!1}),this._scheduleEdits.set(e,[...t]),this.requestUpdate()}_removeSchedulePeriod(e,t){const i=this._scheduleEdits.get(e)??[];i.splice(t,1),this._scheduleEdits.set(e,[...i]),this.requestUpdate(),this._saveSchedule(e)}_updateSchedulePeriod(e,t,i,o){const a=this._scheduleEdits.get(e)??[];a[t]&&(a[t]={...a[t],[i]:o},this._scheduleEdits.set(e,[...a]),this.requestUpdate())}_toggleScheduleRecurring(e,t){const i=this._scheduleEdits.get(e)??[];i[t]&&(i[t]={...i[t],recurring:!i[t].recurring},this._scheduleEdits.set(e,[...i]),this.requestUpdate())}async _saveSchedule(e){if(!this._backend)return;const t=(this._scheduleEdits.get(e)??[]).filter(e=>e.start&&e.end);try{if(await this._backend.send("set_schedule",{entity_id:e,periods:t}),!this._mounted)return;this._showToast(),pe.emit("schedule-changed",{entityId:e})}catch{if(!this._mounted)return;this._showToast(!0)}}_parseDateTimeValue(e){if(!e)return null;const[t,i]=e.split("T");if(!t)return null;const o=t.split("-").map(Number);if(o.length<3||o.some(isNaN))return null;const[a,s,r]=o,[n,d]=(i??"00:00").split(":");return{year:a,month:s-1,day:r,hour:n??"00",minute:d??"00"}}_openRangePicker(e,t){this._pickerTarget={entityId:e,periodIdx:t};const i=(this._scheduleEdits.get(e)??[])[t],o=i?this._parseDateTimeValue(i.start):null,a=i?this._parseDateTimeValue(i.end):null,s=new Date;o?(this._pickerStartDay=o.day,this._pickerStartMonth=o.month,this._pickerStartYear=o.year,this._pickerStartHour=o.hour,this._pickerStartMinute=o.minute,this._pickerYear=o.year,this._pickerMonth=o.month):(this._pickerStartDay=null,this._pickerStartMonth=s.getMonth(),this._pickerStartYear=s.getFullYear(),this._pickerStartHour="00",this._pickerStartMinute="00",this._pickerYear=s.getFullYear(),this._pickerMonth=s.getMonth()),a?(this._pickerEndDay=a.day,this._pickerEndMonth=a.month,this._pickerEndYear=a.year,this._pickerEndHour=a.hour,this._pickerEndMinute=a.minute):(this._pickerEndDay=null,this._pickerEndMonth=s.getMonth(),this._pickerEndYear=s.getFullYear(),this._pickerEndHour="23",this._pickerEndMinute="59"),this._pickerPhase=o?a?"start":"end":"start",this._pickerOpen=!0}_closePicker(){this._pickerOpen=!1,this._pickerTarget=null}_pickerPrevMonth(){0===this._pickerMonth?(this._pickerMonth=11,this._pickerYear--):this._pickerMonth--}_pickerNextMonth(){11===this._pickerMonth?(this._pickerMonth=0,this._pickerYear++):this._pickerMonth++}_pickerSelectDay(e,t){if(!t)if("start"===this._pickerPhase){if(this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerPhase="end",null!==this._pickerEndDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,e).getTime();new Date(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay).getTime()<t&&(this._pickerEndDay=null)}}else{if(null!==this._pickerStartDay){const t=new Date(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay).getTime();if(new Date(this._pickerYear,this._pickerMonth,e).getTime()<t)return this._pickerStartDay=e,this._pickerStartMonth=this._pickerMonth,this._pickerStartYear=this._pickerYear,this._pickerEndDay=null,void(this._pickerPhase="start")}this._pickerEndDay=e,this._pickerEndMonth=this._pickerMonth,this._pickerEndYear=this._pickerYear}}_pickerSetTime(e,t){const i=t.target.value.replace(/\D/g,"").slice(0,2),o=e.includes("Hour"),a=Math.min(o?23:59,Math.max(0,parseInt(i,10)||0)),s=String(a).padStart(2,"0");t.target.value=s,"startHour"===e?this._pickerStartHour=s:"startMinute"===e?this._pickerStartMinute=s:"endHour"===e?this._pickerEndHour=s:this._pickerEndMinute=s,this.requestUpdate()}_pickerConfirm(){if(!this._pickerTarget||null===this._pickerStartDay||null===this._pickerEndDay)return;const{entityId:e,periodIdx:t}=this._pickerTarget,i=String(this._pickerStartMonth+1).padStart(2,"0"),o=String(this._pickerStartDay).padStart(2,"0"),a=String(this._pickerEndMonth+1).padStart(2,"0"),s=String(this._pickerEndDay).padStart(2,"0"),r=`${this._pickerStartYear}-${i}-${o}T${this._pickerStartHour}:${this._pickerStartMinute}`,n=`${this._pickerEndYear}-${a}-${s}T${this._pickerEndHour}:${this._pickerEndMinute}`;this._updateSchedulePeriod(e,t,"start",r),this._updateSchedulePeriod(e,t,"end",n),this._closePicker()}_toAbsDay(e,t,i){return new Date(e,t,i).getTime()}_getMonthDays(){const e=this._pickerYear,t=this._pickerMonth,i=(new Date(e,t,1).getDay()+6)%7,o=new Date(e,t+1,0).getDate(),a=new Date(e,t,0).getDate(),s=new Date,r=s.getFullYear()===e&&s.getMonth()===t,n=s.getDate(),d=null!==this._pickerStartDay?this._toAbsDay(this._pickerStartYear,this._pickerStartMonth,this._pickerStartDay):null,c=null!==this._pickerEndDay?this._toAbsDay(this._pickerEndYear,this._pickerEndMonth,this._pickerEndDay):null,l=[],h=(e,t,i,o)=>{const a=this._toAbsDay(i,o,e);return{day:e,otherMonth:t,today:!t&&r&&e===n,rangeStart:null!==d&&a===d,rangeEnd:null!==c&&a===c,inRange:null!==d&&null!==c&&a>d&&a<c}},p=0===t?11:t-1,_=0===t?e-1:e;for(let m=i-1;m>=0;m--)l.push(h(a-m,!0,_,p));for(let m=1;m<=o;m++)l.push(h(m,!1,e,t));const u=11===t?0:t+1,g=11===t?e+1:e,v=42-l.length;for(let m=1;m<=v;m++)l.push(h(m,!0,g,u));return l}_getMonthLabel(){const e=new Date(this._pickerYear,this._pickerMonth,1),t="fr"===this._lang?"fr-FR":"en-US",i=e.toLocaleDateString(t,{month:"long"});return`${i.charAt(0).toUpperCase()}${i.slice(1)} ${this._pickerYear}`}_getDayLabels(){return"fr"===this._lang?["Lu","Ma","Me","Je","Ve","Sa","Di"]:["Mo","Tu","We","Th","Fr","Sa","Su"]}_renderDateTimePicker(){const e=this._getMonthDays(),t=this._getDayLabels(),i=null!==this._pickerStartDay&&null!==this._pickerEndDay;return V`
      <div class="picker-overlay"
        @click=${e=>{e.target===e.currentTarget&&this._closePicker()}}
        @keydown=${e=>{"Escape"===e.key&&this._closePicker()}}
      >
        <div class="picker-popup" role="dialog" aria-modal="true" aria-label="${ye("config.light_schedule_title")}">
          <div class="picker-phase">
            <button
              class="picker-phase-btn ${"start"===this._pickerPhase?"active":""}"
              @click=${()=>{this._pickerPhase="start"}}
            >${ye("config.light_schedule_start")}</button>
            <button
              class="picker-phase-btn ${"end"===this._pickerPhase?"active":""}"
              @click=${()=>{this._pickerPhase="end"}}
            >${ye("config.light_schedule_end")}</button>
          </div>
          <div class="picker-header">
            <button class="picker-nav" @click=${()=>this._pickerPrevMonth()} aria-label="${ye("config.light_schedule_prev_month_aria")}">
              <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
            </button>
            <span class="picker-month">${this._getMonthLabel()}</span>
            <button class="picker-nav" @click=${()=>this._pickerNextMonth()} aria-label="${ye("config.light_schedule_next_month_aria")}">
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
              <span class="picker-time-label">${ye("config.light_schedule_start")}</span>
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
              <span class="picker-time-label">${ye("config.light_schedule_end")}</span>
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
            ${ye("config.light_schedule_confirm")}
          </button>
        </div>
      </div>
    `}async _saveLights(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_light_config",{show_header:this._lightShowHeader}),pe.emit("light-config-changed",void 0),!this._lightRoom){if(!this._mounted)return;return void this._showToast()}let e=[];try{const t=await this._backend.send("get_room",{area_id:this._lightRoom});t&&(e=t.hidden_entities??[])}catch{}const t=new Set(this._lights.map(e=>e.entityId)),i=e.filter(e=>!t.has(e)),o=this._lights.filter(e=>!e.visible).map(e=>e.entityId),a={};for(const s of this._lights)"full"===s.layout&&(a[s.entityId]=s.layout);if(await this._backend.send("set_room",{area_id:this._lightRoom,entity_order:this._lights.map(e=>e.entityId),hidden_entities:[...i,...o],entity_layouts:a}),!this._mounted)return;this._showToast(),pe.emit("room-config-changed",{areaId:this._lightRoom})}catch{this._showToast(!0)}finally{this._saving=!1}}}async _reset(){this._loaded=!1,this._loading=!1,await this._loadConfig(),this._lightRoom&&this._loadRoomLights()}_showToast(e=!1){void 0!==this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastError=e,this._toast=!0,this._toastTimeout=setTimeout(()=>{this._toast=!1,this._toastTimeout=void 0},2e3)}_goBack(){history.back()}_renderNavbarPreview(){const e=[...this._rooms.filter(e=>e.visible)];return this._autoSort&&e.sort((e,t)=>(e.lightsOn>0?0:1)-(t.lightsOn>0?0:1)),V`
      <div class="preview-navbar">
        ${e.map((e,t)=>{const i=this._showLights&&e.lightsOn>0,o=this._showHumidity&&null!==e.humidityValue&&e.humidityValue>=this._humidityThreshold,a=this._showMedia&&e.mediaPlaying,s=this._showTemperature&&null!==e.tempValue&&e.tempValue>=this._tempHigh,r=["preview-nav-item",0===t?"active-preview":"",i?"has-light":"",o?"has-humidity":"",a?"has-music":"",s?"has-temp-hot":"",this._showTemperature&&null!==e.tempValue&&!s&&e.tempValue<=this._tempLow?"has-temp-cold":""].filter(Boolean).join(" ");return V`
            <div class=${r}>
              <span class="preview-temp-badge">
                <ha-icon .icon=${s?"mdi:thermometer-high":"mdi:snowflake"}></ha-icon>
              </span>
              <ha-icon .icon=${e.icon}></ha-icon>
              <div class="preview-nav-label"><span>${e.name}</span></div>
            </div>
          `})}
      </div>
    `}_renderPopupPreview(){const e=this._rooms.find(e=>e.areaId===this._selectedRoom);if(!e)return V`<div class="preview-empty">${ye("config.popup_select_room")}</div>`;const t=this._scenes.length>0,i=this._scenes.filter(e=>e.visible),o=["preview-popup-icon-box",e.lightsOn>0?"has-light":"",e.mediaPlaying?"has-music":""].filter(Boolean).join(" ");return V`
      <div class="preview-popup">
        <div class="preview-popup-header">
          <div class="preview-popup-header-left">
            <div class=${o}>
              <ha-icon .icon=${e.icon}></ha-icon>
            </div>
            <div class="preview-popup-scene-dash ${t?"visible":""}"></div>
          </div>
          <div class="preview-popup-info">
            <div class="preview-popup-name">${e.name}</div>
            <div class="preview-popup-meta">
              ${e.temperature?V`<span>${e.temperature}</span>`:q}
              ${e.humidity?V`<span>${e.humidity}</span>`:q}
            </div>
          </div>
          <div class="preview-popup-close">
            <ha-icon .icon=${"mdi:close"}></ha-icon>
          </div>
        </div>

        ${i.length>0?V`
          <div class="preview-popup-scenes">
            ${this._scenes.map(e=>V`
                <span class="preview-scene-chip ${e.visible?"":"hidden-scene"}">${e.name}</span>
              `)}
          </div>
        `:q}

        <div class="preview-popup-cards">
          ${this._cards.filter(e=>e.visible).map(e=>V`
              <div class="preview-card-slot">
                <ha-icon .icon=${e.icon}></ha-icon>
                <span class="preview-card-slot-name">${e.nameKey?ye(e.nameKey):e.id}</span>
                <span class="preview-card-slot-count">${e.count}</span>
              </div>
            `)}
        </div>
      </div>
    `}_renderNavbarTab(){return V`
      <div class="tab-panel" id="panel-navbar">

        ${this._emptyRooms.length>0?V`
          <div class="section-label">${ye("config.navbar_empty_rooms")}</div>
          <div class="section-desc">
            ${ye("config.navbar_empty_rooms_desc")}
          </div>
          <div class="item-list empty-rooms">
            ${this._emptyRooms.map(e=>V`
              <div class="item-row disabled">
                <span class="drag-handle">
                  <ha-icon .icon=${"mdi:drag"}></ha-icon>
                </span>
                <div class="room-icon-btn">
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
                <div class="item-info">
                  <span class="item-name">${e.name}</span>
                  <span class="item-meta">0 ${ye("common.entities")}</span>
                </div>
              </div>
            `)}
          </div>
        `:q}

        <div class="section-label">${ye("config.navbar_behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._autoSort=!this._autoSort}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:sort-bool-ascending"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${ye("config.navbar_auto_sort")}</div>
              <div class="feature-desc">${ye("config.navbar_auto_sort_desc")}</div>
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
          <span>${ye("config.navbar_rooms_banner")}</span>
        </div>
        <div class="section-label">${ye("config.navbar_visible_rooms")}</div>
        <div class="item-list">
          ${this._rooms.map((e,t)=>this._renderRoomRow(e,t))}
        </div>

        <div class="icon-picker-fold ${this._iconPickerRoom?"open":""}">
          <div class="icon-picker-inner">
            <div class="section-label">
              ${ye("config.navbar_icon_label",{name:this._rooms.find(e=>e.areaId===this._iconPickerRoom)?.name||""})}
            </div>
            <div class="icon-picker-grid">
              ${Ie.map(e=>V`
                  <button
                    class="icon-pick ${this._rooms.find(e=>e.areaId===this._iconPickerRoom)?.icon===e?"selected":""}"
                    @click=${()=>this._iconPickerRoom&&this._setRoomIcon(this._iconPickerRoom,e)}
                    aria-label="${ye("config.navbar_choose_icon")}"
                  >
                    <ha-icon .icon=${e}></ha-icon>
                  </button>
                `)}
            </div>
          </div>
        </div>

        <div class="section-label">${ye("config.navbar_indicators")}</div>
        <div class="section-desc">${ye("config.navbar_indicators_desc")}</div>
        <div class="feature-list">
          ${[{key:"lights",icon:"mdi:lightbulb",nameKey:"config.navbar_ind_lights",descKey:"config.navbar_ind_lights_desc"},{key:"temperature",icon:"mdi:thermometer",nameKey:"config.navbar_ind_temp",descKey:"config.navbar_ind_temp_desc"},{key:"humidity",icon:"mdi:water-percent",nameKey:"config.navbar_ind_humidity",descKey:"config.navbar_ind_humidity_desc"},{key:"media",icon:"mdi:music",nameKey:"config.navbar_ind_media",descKey:"config.navbar_ind_media_desc"}].map(e=>{const t={lights:this._showLights,temperature:this._showTemperature,humidity:this._showHumidity,media:this._showMedia}[e.key];return V`
              <button
                class="feature-row"
                @click=${()=>{"lights"===e.key?this._showLights=!this._showLights:"temperature"===e.key?this._showTemperature=!this._showTemperature:"humidity"===e.key?this._showHumidity=!this._showHumidity:this._showMedia=!this._showMedia}}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${ye(e.nameKey)}</div>
                  <div class="feature-desc">${ye(e.descKey)}</div>
                </div>
                <span
                  class="toggle ${t?"on":""}"
                  role="switch"
                  aria-checked=${t?"true":"false"}
                ></span>
              </button>
            `})}
        </div>

        <div class="section-label">${ye("config.navbar_thresholds")}</div>
        <div class="section-desc">${ye("config.navbar_thresholds_desc")}</div>
        <div class="threshold-list">
          <div class="threshold-row">
            <div class="threshold-icon hot">
              <ha-icon .icon=${"mdi:thermometer-high"}></ha-icon>
            </div>
            <span class="threshold-label">${ye("config.navbar_temp_high")}</span>
            <input
              class="threshold-input"
              type="number"
              step="0.5"
              .value=${String(this._tempHigh)}
              @change=${e=>{this._tempHigh=parseFloat(e.target.value)||24}}
              aria-label="${ye("config.navbar_temp_high")}"
            />
            <span class="threshold-unit">°C</span>
          </div>
          <div class="threshold-row">
            <div class="threshold-icon cold">
              <ha-icon .icon=${"mdi:snowflake"}></ha-icon>
            </div>
            <span class="threshold-label">${ye("config.navbar_temp_low")}</span>
            <input
              class="threshold-input"
              type="number"
              step="0.5"
              .value=${String(this._tempLow)}
              @change=${e=>{this._tempLow=parseFloat(e.target.value)||17}}
              aria-label="${ye("config.navbar_temp_low")}"
            />
            <span class="threshold-unit">°C</span>
          </div>
          <div class="threshold-row">
            <div class="threshold-icon humidity">
              <ha-icon .icon=${"mdi:water-percent"}></ha-icon>
            </div>
            <span class="threshold-label">${ye("config.navbar_humidity_threshold")}</span>
            <input
              class="threshold-input"
              type="number"
              step="1"
              .value=${String(this._humidityThreshold)}
              @change=${e=>{this._humidityThreshold=parseFloat(e.target.value)||65}}
              aria-label="${ye("config.navbar_humidity_threshold")}"
            />
            <span class="threshold-unit">%</span>
          </div>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._reset()}>${ye("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?ye("common.saving"):ye("common.save")}
          </button>
        </div>
      </div>
    `}_renderRoomRow(e,t){const i=this._dragIdx===t&&"rooms"===this._dragContext,o=this._dropIdx===t&&"rooms"===this._dragContext,a=["item-row",e.visible?"":"disabled",i?"dragging":"",o?"drop-target":""].filter(Boolean).join(" ");return V`
      <div
        class=${a}
        draggable="true"
        @dragstart=${()=>this._onDragStart(t,"rooms")}
        @dragover=${e=>this._onDragOver(t,e)}
        @dragleave=${()=>this._onDragLeave()}
        @drop=${e=>this._onDropGeneric(t,e)}
        @dragend=${()=>this._onDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${"mdi:drag"}></ha-icon>
        </span>
        <button
          class="room-icon-btn"
          @click=${()=>this._openIconPicker(e.areaId)}
          aria-label="${ye("config.navbar_change_icon_aria",{name:e.name})}"
        >
          <ha-icon .icon=${e.icon}></ha-icon>
        </button>
        <div class="item-info">
          <span class="item-name">${e.name}</span>
          <span class="item-meta">${e.entityCount} ${ye("common.entities")}</span>
        </div>
        <button
          class="toggle ${e.visible?"on":""}"
          @click=${()=>this._toggleRoomVisible(e.areaId)}
          role="switch"
          aria-checked=${e.visible?"true":"false"}
          aria-label="${e.visible?ye("common.hide"):ye("common.show")} ${e.name}"
        ></button>
      </div>
    `}_renderPopupTab(){const e=this._rooms.find(e=>e.areaId===this._selectedRoom);return V`
      <div class="tab-panel" id="panel-popup">
        <div class="section-label">${ye("config.popup_room")}</div>
        <div class="section-desc">
          ${ye("config.popup_room_desc")}
        </div>
        <div class="dropdown ${this._dropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._dropdownOpen=!this._dropdownOpen}
            aria-expanded=${this._dropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${e?.icon||"mdi:home"}></ha-icon>
            <span>${e?.name||ye("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this._rooms.map(e=>V`
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

        <div class="section-label">${ye("config.popup_internal_cards")}</div>
        <div class="section-desc">
          ${ye("config.popup_internal_cards_desc")}
        </div>
        <div class="item-list">
          ${this._cards.map((e,t)=>this._renderCardRow(e,t))}
        </div>

        ${this._scenes.length>0?V`
          <div class="section-label">${ye("config.popup_scenes")} (${this._scenes.length})</div>
          <div class="section-desc">
            ${ye("config.popup_scenes_desc")}
          </div>
          <div class="item-list">
            ${this._scenes.map((e,t)=>this._renderSceneRow(e,t))}
          </div>
        `:q}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._reset()}>${ye("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?ye("common.saving"):ye("common.save")}
          </button>
        </div>
      </div>
    `}_renderCardRow(e,t){const i=this._dragIdx===t&&"cards"===this._dragContext,o=this._dropIdx===t&&"cards"===this._dragContext,a=["item-row card-row",e.visible?"":"disabled",i?"dragging":"",o?"drop-target":""].filter(Boolean).join(" ");return V`
      <div
        class=${a}
        draggable="true"
        @dragstart=${()=>this._onDragStart(t,"cards")}
        @dragover=${e=>this._onDragOver(t,e)}
        @dragleave=${()=>this._onDragLeave()}
        @drop=${e=>this._onDropGeneric(t,e)}
        @dragend=${()=>this._onDragEnd()}
      >
        <span class="drag-handle">
          <ha-icon .icon=${"mdi:drag"}></ha-icon>
        </span>
        <div class="card-icon-box">
          <ha-icon .icon=${e.icon}></ha-icon>
        </div>
        <div class="item-info">
          <span class="item-name">${e.nameKey?ye(e.nameKey):e.id}</span>
          <span class="item-meta">${e.descKey?ye(e.descKey):""}</span>
        </div>
        <span class="card-count">${e.count}</span>
        <button
          class="toggle ${e.visible?"on":""}"
          @click=${()=>this._toggleCardVisible(e.id)}
          role="switch"
          aria-checked=${e.visible?"true":"false"}
          aria-label="${e.visible?ye("common.hide"):ye("common.show")} ${e.nameKey?ye(e.nameKey):e.id}"
        ></button>
      </div>
    `}_renderSceneRow(e,t){const i=this._dragIdx===t&&"scenes"===this._dragContext,o=this._dropIdx===t&&"scenes"===this._dragContext,a=["item-row",e.visible?"":"disabled",i?"dragging":"",o?"drop-target":""].filter(Boolean).join(" ");return V`
      <div
        class=${a}
        draggable="true"
        @dragstart=${()=>this._onDragStart(t,"scenes")}
        @dragover=${e=>this._onDragOver(t,e)}
        @dragleave=${()=>this._onDragLeave()}
        @drop=${e=>this._onDropGeneric(t,e)}
        @dragend=${()=>this._onDragEnd()}
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
          aria-label="${e.visible?ye("common.hide"):ye("common.show")} ${e.name}"
        ></button>
      </div>
    `}_renderLightPreview(){if(!this._lightRoom)return V`<div class="preview-empty">${ye("config.light_select_room")}</div>`;if(0===this._lights.length)return V`<div class="preview-empty">${ye("config.light_no_lights")}</div>`;const e=this._lights.filter(e=>e.visible),t=e.filter(e=>e.isOn).length,i=e.length,o=t>0,a=0===t?"none":t===i?"all":"some";if(0===e.length)return V`<div class="preview-empty">${ye("config.light_no_visible")}</div>`;const s=[],r=[];for(const c of e){"compact"===("full"===c.layout?"full":"compact")?(r.push(c),2===r.length&&(s.push({kind:"compact-pair",left:r[0],right:r[1]}),r.length=0)):(r.length>0&&(s.push({kind:"full",light:r[0]}),r.length=0),s.push({kind:"full",light:c}))}r.length>0&&s.push({kind:"full",light:r[0]});const n=o?.06:0,d=(e,t,i)=>{const o=["preview-light-row",t?"compact":"",i?"compact-right":"",e.visible?"":"hidden-light"].filter(Boolean).join(" "),a=this._scheduleEdits.get(e.entityId),s=a?a.some(e=>e.start&&e.end):(this._schedulesLoaded[e.entityId]?.periods?.length??0)>0;return V`
        <div class=${o} data-on=${e.isOn}>
          <div class="preview-light-icon ${e.isOn?"on":""}">
            <ha-icon .icon=${"mdi:lightbulb"}></ha-icon>
          </div>
          <div class="preview-light-info">
            <div class="preview-light-name">${e.name}</div>
            <div class="preview-light-sub">${e.isOn?`${e.brightnessPct}%`:ye("common.off")}</div>
          </div>
          ${s?V`<ha-icon class="preview-light-sched" .icon=${"mdi:calendar-clock"}></ha-icon>`:q}
          ${"full"===e.layout?V`<span class="preview-light-layout-tag">full</span>`:q}
          <span class="preview-light-dot ${e.isOn?"on":""}"></span>
        </div>
      `};return V`
      <div class="preview-light">
        ${this._lightShowHeader?V`
          <div class="preview-light-header">
            <div class="preview-light-header-left">
              <span class="preview-light-title">${ye("light.title")}</span>
              <span class="preview-light-count ${a}">${t}/${i}</span>
            </div>
            <div class="preview-light-toggle ${o?"on":""}"></div>
          </div>
        `:q}
        <div class="preview-light-body">
          <div
            class="preview-light-tint"
            style="background:radial-gradient(ellipse at 30% 20%, rgba(251,191,36,0.12) 0%, transparent 70%);opacity:${n}"
          ></div>
          <div class="preview-light-grid">
            ${s.map(e=>"full"===e.kind?d(e.light,!1,!1):V`
                ${d(e.left,!0,!1)}
                ${e.right?d(e.right,!0,!0):q}
              `)}
          </div>
        </div>
      </div>
    `}_renderLightTab(){const e=this._rooms.find(e=>e.areaId===this._lightRoom);return V`
      <div class="tab-panel" id="panel-light">
        <div class="section-label">${ye("config.navbar_behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._lightShowHeader=!this._lightShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${ye("config.light_show_header")}</div>
              <div class="feature-desc">${ye("config.light_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._lightShowHeader?"on":""}"
              role="switch"
              aria-checked=${this._lightShowHeader?"true":"false"}
            ></span>
          </button>
        </div>

        <div class="section-label">${ye("config.light_room")}</div>
        <div class="section-desc">
          ${ye("config.light_room_desc")}
        </div>
        <div class="dropdown ${this._lightDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._lightDropdownOpen=!this._lightDropdownOpen}
            aria-expanded=${this._lightDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${e?.icon||"mdi:home"}></ha-icon>
            <span>${e?.name||ye("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this._rooms.map(e=>V`
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

        ${this._lights.length>0?V`
              <div class="section-label">${ye("config.light_list_title")} (${this._lights.length})</div>
              <div class="section-desc">
                ${ye("config.light_list_banner")}
              </div>
              <div class="item-list">
                ${this._lights.map((e,t)=>this._renderLightRow(e,t))}
              </div>
            `:this._lightRoom?V`<div class="banner">
                <ha-icon .icon=${"mdi:lightbulb-off-outline"}></ha-icon>
                <span>${ye("config.light_no_lights")}</span>
              </div>`:q}

        ${this._lights.length>0?V`
          <div class="section-desc schedule-hint">
            <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
            ${ye("config.light_schedule_hint")}
          </div>
        `:q}

        <div class="section-desc dashboard-vs-room">
          <ha-icon .icon=${"mdi:information-outline"}></ha-icon>
          ${ye("config.light_dashboard_vs_room")}
        </div>

        ${this._lightRoom?V`
          <div class="save-bar">
            <button class="btn btn-ghost" @click=${()=>this._loadRoomLights()}>${ye("common.reset")}</button>
            <button
              class="btn btn-accent"
              @click=${()=>this._save()}
              ?disabled=${this._saving}
            >
              ${this._saving?ye("common.saving"):ye("common.save")}
            </button>
          </div>
        `:q}
      </div>
    `}_renderLightRow(e,t){const i=this._dragIdx===t&&"lights"===this._dragContext,o=this._dropIdx===t&&"lights"===this._dragContext,a=["item-row",e.visible?"":"disabled",i?"dragging":"",o?"drop-target":""].filter(Boolean).join(" "),s=this._scheduleEdits.get(e.entityId),r=s?s.some(e=>e.start&&e.end):(this._schedulesLoaded[e.entityId]?.periods?.length??0)>0,n=this._scheduleExpandedEntity===e.entityId,d=["item-card",n?"expanded":""].filter(Boolean).join(" ");return V`
      <div class=${d}>
        <div
          class=${a}
          draggable="true"
          @dragstart=${()=>this._onDragStart(t,"lights")}
          @dragover=${e=>this._onDragOver(t,e)}
          @dragleave=${()=>this._onDragLeave()}
          @drop=${e=>this._onDropGeneric(t,e)}
          @dragend=${()=>this._onDragEnd()}
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
            class="schedule-btn ${r?"active":""}"
            @click=${()=>this._toggleScheduleExpand(e.entityId)}
            aria-label="${ye("config.light_schedule_aria",{name:e.name})}"
            aria-expanded=${n?"true":"false"}
            title="${ye("config.light_schedule_title")}"
          >
            <ha-icon .icon=${"mdi:calendar-clock"}></ha-icon>
          </button>
          <button
            class="layout-btn"
            @click=${()=>this._cycleLightLayout(e.entityId)}
            aria-label="${ye("config.light_change_layout_aria")}"
            title="${ye("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}"
          >
            ${ye("compact"===e.layout?"config.light_layout_compact":"config.light_layout_full")}
          </button>
          <button
            class="toggle ${e.visible?"on":""}"
            @click=${()=>this._toggleLightVisible(e.entityId)}
            role="switch"
            aria-checked=${e.visible?"true":"false"}
            aria-label="${e.visible?ye("common.hide"):ye("common.show")} ${e.name}"
          ></button>
        </div>
        <div class="fold-sep ${n?"visible":""}"></div>
        <div class="schedule-fold ${n?"open":""}">
          <div class="schedule-fold-inner">
            ${this._renderScheduleContent(e.entityId)}
          </div>
        </div>
      </div>
    `}_formatDateTimeShort(e){if(!e)return"";const[t,i]=e.split("T");if(!t)return e;const[o,a,s]=t.split("-");return`${s}/${a}/${o} ${i??"00:00"}`}_formatPeriodDisplay(e){if(!e.start&&!e.end)return"";const t=this._formatDateTimeShort(e.start),i=this._formatDateTimeShort(e.end);return t&&i?`${t}  →  ${i}`:t?`${t}  → …`:`…  →  ${i}`}_renderScheduleContent(e){const t=this._scheduleEdits.get(e)??[];return V`
      <div class="schedule-body">
        <div class="schedule-header">${ye("config.light_schedule_title")}</div>
        ${t.map((t,i)=>V`
          <div class="schedule-period">
            <div class="schedule-row">
              <button
                class="datetime-display ${t.start||t.end?"":"empty"}"
                @click=${()=>this._openRangePicker(e,i)}
              >
                ${t.start||t.end?this._formatPeriodDisplay(t):ye("config.light_schedule_no_date")}
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
                <span class="check-label">${ye("config.light_schedule_recurring")}</span>
              </button>
              <button
                class="btn-icon xs schedule-delete"
                @click=${()=>this._removeSchedulePeriod(e,i)}
                aria-label="${ye("config.light_schedule_delete_aria")}"
              >
                <ha-icon .icon=${"mdi:delete-outline"}></ha-icon>
              </button>
            </div>
          </div>
        `)}
        <button class="btn btn-sm schedule-add" @click=${()=>this._addSchedulePeriod(e)}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          ${ye("config.light_schedule_add")}
        </button>
        <button class="btn btn-sm btn-accent schedule-save" @click=${()=>this._saveSchedule(e)}>
          ${ye("common.save")}
        </button>
      </div>
    `}_selectCoverRoom(e){this._coverRoom=e,this._coverRoomDropdownOpen=!1,this._loadRoomCovers()}async _loadRoomCovers(){if(!this._backend||!this._coverRoom||!this.hass)return;const e=this._coverRoom,t=ke(e,this.hass.entities,this.hass.devices).filter(e=>e.entity_id.startsWith("cover.")).map(e=>e.entity_id);let i=null;try{i=await this._backend.send("get_room",{area_id:e})}catch{}if(this._coverRoom!==e)return;const o=new Set(i?.hidden_entities??[]),a=i?.entity_order??[],s=[...t].sort((e,t)=>{const i=a.indexOf(e),o=a.indexOf(t);return-1!==i&&-1!==o?i-o:-1!==i?-1:-1!==o?1:0});this._coverRoomEntities=s.map(e=>{const t=this.hass?.states[e],i=t?.attributes?.friendly_name||e.split(".")[1]||e,a=t?.attributes?.device_class||"shutter";return{entityId:e,name:i,visible:!o.has(e),deviceClass:a}})}_toggleCoverEntityVisibility(e){const t=this._coverRoomEntities.map(t=>t.entityId===e?{...t,visible:!t.visible}:t),i=t.filter(e=>e.visible),o=t.filter(e=>!e.visible);this._coverRoomEntities=[...i,...o]}_getAllCoverEntities(){if(!this.hass)return[];const e=[];for(const[t,i]of Object.entries(this.hass.states)){if(!t.startsWith("cover."))continue;const o=i.attributes?.friendly_name||t.split(".")[1]||t;e.push({entityId:t,name:o})}return e.sort((e,t)=>e.name.localeCompare(t.name))}_toggleCoverDashboardEntity(e){const t=new Set(this._coverDashboardEntities);t.has(e)?t.delete(e):t.add(e),this._coverDashboardEntities=[...t];const i=new Set(this._coverDashboardEntities),o=this._coverDashboardOrder.filter(e=>i.has(e)),a=this._coverDashboardOrder.filter(e=>!i.has(e));this._coverDashboardOrder=[...o,...a]}_initCoverDashboardOrder(){const e=this._getAllCoverEntities().map(e=>e.entityId),t=new Set(this._coverDashboardEntities),i=this._coverDashboardEntities.filter(t=>e.includes(t)),o=e.filter(e=>!t.has(e));this._coverDashboardOrder=[...i,...o]}_onDropDashboardCover(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"dashboard_covers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._coverDashboardOrder],[o]=i.splice(this._dragIdx,1);i.splice(e,0,o),this._coverDashboardOrder=i,this._dragIdx=null,this._dropIdx=null}async _saveCover(){if(this._backend&&!this._saving){this._saving=!0;try{const e=this._coverDashboardOrder.filter(e=>this._coverDashboardEntities.includes(e));if(await this._backend.send("set_cover_config",{show_header:this._coverShowHeader,dashboard_entities:e,presets:this._coverPresets}),this._coverRoom&&this._coverRoomEntities.length>0){const e=this._coverRoomEntities.filter(e=>!e.visible).map(e=>e.entityId),t=this._coverRoomEntities.map(e=>e.entityId);await this._backend.send("set_room",{area_id:this._coverRoom,hidden_entities:e,entity_order:t})}if(!this._mounted)return;this._showToast(),pe.emit("cover-config-changed",void 0),this._coverRoom&&pe.emit("room-config-changed",{areaId:this._coverRoom})}catch{this._showToast(!0)}finally{this._saving=!1}}}_renderCoverPreview(){const e=this._coverRoomEntities.filter(e=>e.visible),t={shutter:["mdi:window-shutter-open","mdi:window-shutter"],blind:["mdi:blinds-open","mdi:blinds"],curtain:["mdi:curtains","mdi:curtains"],garage:["mdi:garage-open","mdi:garage"],gate:["mdi:gate-open","mdi:gate"],door:["mdi:door-open","mdi:door-closed"]},i=e.length>0?e[0]:null,o=i?this.hass?.states[i.entityId]:null,a="open"===o?.state||"opening"===o?.state,s=o?.attributes.current_position,r=!!(4&(o?.attributes.supported_features||0)),n=s??(a?100:0),d=e.filter(e=>{const t=this.hass?.states[e.entityId];return"open"===t?.state||"opening"===t?.state}).length;return V`
      <div class="preview-cover">
        ${this._coverShowHeader?V`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:0 4px 4px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);">${ye("cover.title")}</span>
              <span style="font-size:8px;font-weight:600;padding:1px 4px;border-radius:8px;background:${d>0?"rgba(167,139,250,0.15)":"var(--s2)"};color:${d>0?"#a78bfa":"var(--t3)"};">${d}/${e.length}</span>
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
        `:q}
        <div class="preview-cover-card glass" style="padding:8px 10px;display:flex;flex-direction:column;gap:2px;position:relative;">
          <!-- Tint -->
          <div style="position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,#a78bfa,transparent 70%);opacity:${e.length>0?(d/e.length*.18).toFixed(3):"0"};"></div>
          ${0===e.length?V`
            <div style="padding:8px;text-align:center;font-size:10px;color:var(--t4);">—</div>
          `:q}
          ${e.slice(0,3).map((e,i)=>{const o=t[e.deviceClass]||t.shutter,a=this.hass?.states[e.entityId],s="open"===a?.state||"opening"===a?.state,d=a?.attributes.current_position,c=0===i;return V`
              <!-- Row -->
              <div style="display:flex;align-items:center;gap:6px;padding:4px 2px;position:relative;z-index:1;">
                <div style="width:22px;height:22px;border-radius:6px;background:${s?"rgba(167,139,250,0.1)":"var(--s2)"};border:1px solid ${s?"rgba(167,139,250,0.15)":"var(--b1)"};display:flex;align-items:center;justify-content:center;">
                  <ha-icon .icon=${o[s?0:1]} style="--mdc-icon-size:13px;color:${s?"#a78bfa":"var(--t3)"};display:flex;align-items:center;justify-content:center;${s?"filter:drop-shadow(0 0 4px rgba(167,139,250,0.4));":""}"></ha-icon>
                </div>
                <div style="flex:1;min-width:0;">
                  <div style="font-size:10px;font-weight:600;color:var(--t1);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${e.name}</div>
                  <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
                    <span style="font-size:8px;color:${s?"rgba(167,139,250,0.6)":"var(--t4)"};">${ye(s?"cover.open":"cover.closed")}</span>
                  </div>
                </div>
                ${void 0!==d?V`
                  <span style="font-size:12px;font-weight:700;color:${s?"#a78bfa":"var(--t3)"};font-variant-numeric:tabular-nums;">${d}<span style="font-size:8px;font-weight:500;">%</span></span>
                `:q}
                <div style="width:6px;height:6px;border-radius:50%;background:${s?"#a78bfa":"var(--t4)"};${s?"box-shadow:0 0 6px rgba(167,139,250,0.4);":""}"></div>
              </div>
              ${c?V`
                <!-- Expanded controls for first entity -->
                <div style="height:1px;margin:0 8px;background:linear-gradient(90deg,transparent,rgba(167,139,250,0.25),transparent);"></div>
                <div style="padding:4px 2px;display:flex;flex-direction:column;gap:6px;position:relative;z-index:1;">
                  <span style="font-size:8px;font-weight:600;letter-spacing:0.5px;color:rgba(167,139,250,0.6);text-transform:uppercase;">${e.name}</span>
                  <!-- Transport -->
                  <div style="display:flex;align-items:center;justify-content:center;gap:4px;">
                    <div style="width:28px;height:28px;border-radius:8px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                      <ha-icon .icon=${"mdi:arrow-up"} style="--mdc-icon-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    </div>
                    <div style="width:28px;height:28px;border-radius:8px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                      <ha-icon .icon=${"mdi:stop"} style="--mdc-icon-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    </div>
                    <div style="width:28px;height:28px;border-radius:8px;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;">
                      <ha-icon .icon=${"mdi:arrow-down"} style="--mdc-icon-size:14px;color:var(--t2);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    </div>
                  </div>
                  <!-- Position slider -->
                  ${r?V`
                    <div style="display:flex;align-items:center;gap:4px;">
                      <ha-icon .icon=${o[1]} style="--mdc-icon-size:12px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
                      <div style="flex:1;height:22px;border-radius:var(--radius-lg);background:var(--s1);border:1px solid var(--b1);position:relative;overflow:hidden;">
                        <div style="position:absolute;top:0;left:0;height:100%;width:${n}%;border-radius:inherit;background:linear-gradient(90deg,rgba(167,139,250,0.15),rgba(167,139,250,0.25));"></div>
                        <div style="position:absolute;top:50%;left:${n}%;transform:translate(-50%,-50%);width:5px;height:14px;border-radius:3px;background:rgba(255,255,255,0.7);"></div>
                        <span style="position:absolute;top:50%;right:6px;transform:translateY(-50%);font-size:9px;font-weight:600;color:var(--t3);">${n}%</span>
                      </div>
                      <ha-icon .icon=${o[0]} style="--mdc-icon-size:12px;color:var(--t3);display:flex;align-items:center;justify-content:center;"></ha-icon>
                    </div>
                  `:q}
                  <!-- Presets -->
                  <div style="height:1px;background:var(--b1);"></div>
                  <div style="display:flex;gap:4px;flex-wrap:wrap;">
                    ${this._coverPresets.map(e=>{const t=n===e,i=e>=50,a=0===e?ye("cover.preset_closed"):100===e?ye("cover.preset_open"):`${e}%`;return V`
                        <span style="
                          display:inline-flex;align-items:center;gap:3px;
                          padding:3px 7px;border-radius:var(--radius-md);
                          border:1px solid ${t?"rgba(167,139,250,0.15)":"var(--b2)"};
                          background:${t?"rgba(167,139,250,0.1)":"var(--s1)"};
                          font-size:9px;font-weight:600;
                          color:${t?"#a78bfa":"var(--t3)"};
                        ">
                          <ha-icon .icon=${o[i?0:1]} style="--mdc-icon-size:10px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                          ${a}
                        </span>
                      `})}
                  </div>
                </div>
                <div style="height:1px;margin:0 8px;background:linear-gradient(90deg,transparent,rgba(167,139,250,0.25),transparent);"></div>
              `:q}
            `})}
          ${e.length>3?V`
            <div style="font-size:9px;color:var(--t4);text-align:center;padding-top:2px;position:relative;z-index:1;">+${e.length-3}</div>
          `:q}
        </div>
      </div>
    `}_renderCoverTab(){if(!this.hass)return q;const e=this._rooms.find(e=>e.areaId===this._coverRoom);return V`
      <div class="tab-panel" id="panel-cover">
        <div class="section-label">${ye("config.navbar_behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._coverShowHeader=!this._coverShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${ye("config.cover_show_header")}</div>
              <div class="feature-desc">${ye("config.cover_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._coverShowHeader?"on":""}"
              role="switch"
              aria-checked=${this._coverShowHeader?"true":"false"}
            ></span>
          </button>
        </div>

        <!-- Per-room cover config -->
        <div class="section-label">${ye("config.cover_room")}</div>
        <div class="section-desc">${ye("config.cover_room_desc")}</div>

        <!-- Room selector dropdown -->
        <div class="dropdown ${this._coverRoomDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>{this._coverRoomDropdownOpen=!this._coverRoomDropdownOpen}}
            aria-expanded=${this._coverRoomDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${e?.icon||"mdi:home"}></ha-icon>
            <span>${e?.name||ye("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${this._rooms.map(e=>V`
              <button
                class="dropdown-item ${e.areaId===this._coverRoom?"active":""}"
                role="option"
                aria-selected=${e.areaId===this._coverRoom?"true":"false"}
                @click=${()=>this._selectCoverRoom(e.areaId)}
              >
                <ha-icon .icon=${e.icon}></ha-icon>
                ${e.name}
              </button>
            `)}
          </div>
        </div>

        ${this._coverRoom?V`
          ${this._coverRoomEntities.length>0?V`
            <div class="section-label">${ye("config.cover_list_title")} (${this._coverRoomEntities.length})</div>
            <div class="section-desc">${ye("config.cover_list_banner")}</div>
            <div class="item-list">
              ${this._coverRoomEntities.map((e,t)=>{const i=this._dragIdx===t&&"covers"===this._dragContext,o=this._dropIdx===t&&"covers"===this._dragContext,a=["item-row",e.visible?"":"disabled",i?"dragging":"",o?"drop-target":""].filter(Boolean).join(" ");return V`
                  <div
                    class=${a}
                    draggable="true"
                    @dragstart=${()=>this._onDragStart(t,"covers")}
                    @dragover=${e=>this._onDragOver(t,e)}
                    @dragleave=${()=>this._onDragLeave()}
                    @drop=${e=>this._onDropCover(t,e)}
                    @dragend=${()=>this._onDragEnd()}
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
                      @click=${()=>this._toggleCoverEntityVisibility(e.entityId)}
                      role="switch"
                      aria-checked=${e.visible?"true":"false"}
                      aria-label="${e.visible?ye("common.hide"):ye("common.show")} ${e.name}"
                    ></button>
                  </div>
                `})}
            </div>
          `:V`
            <div class="banner">
              <ha-icon .icon=${"mdi:blinds-open"}></ha-icon>
              <span>${ye("config.cover_no_covers")}</span>
            </div>
          `}
        `:q}

        <!-- Preset config -->
        <div class="section-label">${ye("config.cover_presets")}</div>
        <div class="section-desc">${ye("config.cover_presets_desc")}</div>

        <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
          ${this._coverPresets.map(e=>V`
              <span style="
                display:inline-flex;align-items:center;gap:4px;
                padding:5px 10px;border-radius:var(--radius-md);
                border:1px solid var(--b2);background:var(--s1);
                font-size:11px;font-weight:600;color:var(--t2);
              ">
                <ha-icon .icon=${e>=50?"mdi:window-shutter-open":"mdi:window-shutter"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
                ${0===e?ye("cover.preset_closed"):100===e?ye("cover.preset_open"):`${e}%`}
                <button
                  style="
                    background:none;border:none;cursor:pointer;padding:0;
                    display:flex;align-items:center;justify-content:center;
                    color:var(--t4);transition:color var(--t-fast);
                  "
                  @click=${()=>this._removeCoverPreset(e)}
                  aria-label="${ye("common.delete")} ${e}%"
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
              @keydown=${e=>{"Enter"===e.key&&this._addCoverPreset()}}
              placeholder=${ye("config.cover_preset_placeholder")}
              style="width:64px;font-size:11px;padding:5px 8px;"
            />
            <button
              style="
                display:inline-flex;align-items:center;gap:4px;
                padding:5px 10px;border-radius:var(--radius-md);
                border:1px solid rgba(167,139,250,0.3);background:rgba(167,139,250,0.1);
                font-size:11px;font-weight:600;color:var(--c-accent);
                cursor:pointer;font-family:inherit;
                opacity:${this._coverPresetInput?"1":"0.4"};
                pointer-events:${this._coverPresetInput?"auto":"none"};
                transition:opacity var(--t-fast);
              "
              @click=${()=>this._addCoverPreset()}
            >
              <ha-icon .icon=${"mdi:plus"} style="--mdc-icon-size:14px;display:flex;align-items:center;justify-content:center;"></ha-icon>
              ${ye("config.cover_preset_add")}
            </button>
          </span>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._resetCover()}>${ye("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?ye("common.saving"):ye("common.save")}
          </button>
        </div>
      </div>
    `}_onDropCover(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"covers"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._coverRoomEntities],[o]=i.splice(this._dragIdx,1);i.splice(e,0,o),this._coverRoomEntities=i,this._dragIdx=null,this._dropIdx=null}async _resetCover(){if(this._backend){try{const e=await this._backend.send("get_config");e?.cover_card&&(this._coverShowHeader=e.cover_card.show_header??!0,this._coverDashboardEntities=e.cover_card.dashboard_entities??[],this._coverPresets=e.cover_card.presets??[0,25,50,75,100],this._initCoverDashboardOrder())}catch{}await this._loadRoomCovers()}}_addCoverPreset(){const e=parseInt(this._coverPresetInput,10);isNaN(e)||e<0||e>100||(this._coverPresets.includes(e)||(this._coverPresets=[...this._coverPresets,e].sort((e,t)=>e-t)),this._coverPresetInput="")}_removeCoverPreset(e){this._coverPresets=this._coverPresets.filter(t=>t!==e)}_toggleDashboardCard(e){const t=new Set(this._dashboardEnabledCards);t.has(e)?t.delete(e):t.add(e),this._dashboardEnabledCards=[...t]}_toggleDashboardExpand(e){const t=new Set(this._dashboardExpanded);t.has(e)?t.delete(e):t.add(e),this._dashboardExpanded=t}_onDropDashboardCard(e,t){if(t.preventDefault(),null===this._dragIdx||this._dragIdx===e||"dashboard_cards"!==this._dragContext)return this._dragIdx=null,void(this._dropIdx=null);const i=[...this._dashboardCardOrder],[o]=i.splice(this._dragIdx,1);i.splice(e,0,o),this._dashboardCardOrder=i,this._dragIdx=null,this._dropIdx=null}async _saveDashboard(){if(this._backend&&!this._saving){this._saving=!0;try{await this._backend.send("set_dashboard",{enabled_cards:this._dashboardEnabledCards,card_order:this._dashboardCardOrder}),await this._backend.send("set_light_config",{show_header:this._lightShowHeader}),await this._backend.send("set_weather",{show_header:this._weatherShowHeader});const e=this._coverDashboardOrder.filter(e=>this._coverDashboardEntities.includes(e));if(await this._backend.send("set_cover_config",{show_header:this._coverShowHeader,dashboard_entities:e,presets:this._coverPresets}),!this._mounted)return;this._showToast(),pe.emit("dashboard-config-changed",void 0),pe.emit("light-config-changed",void 0),pe.emit("weather-config-changed",void 0),pe.emit("cover-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadDashboardConfig(){if(this._backend)try{const e=await this._backend.send("get_config");e?.dashboard&&(this._dashboardEnabledCards=e.dashboard.enabled_cards??["weather"],this._dashboardCardOrder=e.dashboard.card_order??["title","weather","light","cover","spotify"])}catch{}}_renderDashboardPreview(){const e=new Set(this._dashboardEnabledCards),t={title:{icon:"mdi:format-title",label:this._titleText||ye("config.title_title_placeholder"),titleStyle:"font-size:11px;font-weight:700;color:var(--t1);"},weather:{icon:"mdi:weather-partly-cloudy",label:ye("weather.title")},light:{icon:"mdi:lightbulb-group",label:ye("light.title")},cover:{icon:"mdi:blinds",label:ye("cover.title")},spotify:{icon:"mdi:spotify",label:ye("spotify.title")}},i=this._dashboardCardOrder.filter(t=>e.has(t));return V`
      <div class="preview-dashboard">
        <div class="preview-dashboard-cards">
          ${0===i.length?V`<div class="preview-dashboard-empty">—</div>`:q}
          ${i.map(e=>{const i=t[e];return i?V`
              <div class="preview-dashboard-card ${e}">
                ${i.titleStyle?V`<span style=${i.titleStyle}>${i.label}</span>`:V`<ha-icon .icon=${i.icon}></ha-icon><span>${i.label}</span>`}
              </div>
            `:q})}
        </div>
        <div class="preview-dashboard-navbar">
          <ha-icon .icon=${"mdi:sofa"}></ha-icon>
          <ha-icon .icon=${"mdi:stove"}></ha-icon>
          <ha-icon .icon=${"mdi:bed"}></ha-icon>
        </div>
      </div>
    `}_renderDashboardTab(){const e={title:{icon:"mdi:format-title",nameKey:"config.dashboard_card_title",descKey:"config.dashboard_card_title_desc",hasSub:!1},weather:{icon:"mdi:weather-partly-cloudy",nameKey:"config.dashboard_card_weather",descKey:"config.dashboard_card_weather_desc",hasSub:!0},light:{icon:"mdi:lightbulb-group",nameKey:"config.dashboard_card_light",descKey:"config.dashboard_card_light_desc",hasSub:!0},cover:{icon:"mdi:blinds",nameKey:"config.dashboard_card_cover",descKey:"config.dashboard_card_cover_desc",hasSub:!0},spotify:{icon:"mdi:spotify",nameKey:"config.dashboard_card_spotify",descKey:"config.dashboard_card_spotify_desc",hasSub:!1}},t=new Set(this._dashboardEnabledCards);return V`
      <div class="tab-panel" id="panel-dashboard">
        <div class="section-label">${ye("config.dashboard_title")}</div>
        <div class="section-desc">${ye("config.dashboard_desc")}</div>
        <div class="item-list">
          ${this._dashboardCardOrder.map((i,o)=>{const a=e[i];if(!a)return q;const s=t.has(i),r=this._dragIdx===o&&"dashboard_cards"===this._dragContext,n=this._dropIdx===o&&"dashboard_cards"===this._dragContext,d=this._dashboardExpanded.has(i),c=["item-row",s?"":"disabled",r?"dragging":"",n?"drop-target":""].filter(Boolean).join(" ");return V`
              <div>
                <div
                  class=${c}
                  draggable="true"
                  @dragstart=${()=>this._onDragStart(o,"dashboard_cards")}
                  @dragover=${e=>this._onDragOver(o,e)}
                  @dragleave=${()=>this._onDragLeave()}
                  @drop=${e=>this._onDropDashboardCard(o,e)}
                  @dragend=${()=>this._onDragEnd()}
                >
                  <span class="drag-handle">
                    <ha-icon .icon=${"mdi:drag"}></ha-icon>
                  </span>
                  <div class="feature-icon">
                    <ha-icon .icon=${a.icon}></ha-icon>
                  </div>
                  <div class="item-info">
                    <span class="item-name">${ye(a.nameKey)}</span>
                    <span class="item-meta">${ye(a.descKey)}</span>
                  </div>
                  ${a.hasSub&&s?V`
                    <button
                      class="btn-icon xs"
                      aria-label=${ye(d?"common.hide":"common.show")}
                      aria-expanded=${d?"true":"false"}
                      @click=${e=>{e.stopPropagation(),this._toggleDashboardExpand(i)}}
                    >
                      <ha-icon .icon=${d?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                    </button>
                  `:q}
                  <button
                    class="toggle ${s?"on":""}"
                    @click=${e=>{e.stopPropagation(),this._toggleDashboardCard(i)}}
                    role="switch"
                    aria-checked=${s?"true":"false"}
                    aria-label="${ye(s?"common.hide":"common.show")} ${ye(a.nameKey)}"
                  ></button>
                </div>
                ${this._renderDashboardCardSub(i,s,d)}
              </div>
            `})}
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._loadDashboardConfig()}>${ye("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?ye("common.saving"):ye("common.save")}
          </button>
        </div>
      </div>
    `}_renderDashboardCardSub(e,t,i){const o=t&&i;return"light"===e?V`
        <div class="feature-sub ${o?"open":""}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${e=>{e.stopPropagation(),this._lightShowHeader=!this._lightShowHeader}}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${ye("config.light_show_header")}</div>
                  <div class="feature-desc">${ye("config.light_show_header_desc")}</div>
                </div>
                <span
                  class="toggle ${this._lightShowHeader?"on":""}"
                  role="switch"
                  aria-checked=${this._lightShowHeader?"true":"false"}
                ></span>
              </button>
            </div>
          </div>
        </div>
      `:"weather"===e?V`
        <div class="feature-sub ${o?"open":""}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${e=>{e.stopPropagation(),this._weatherShowHeader=!this._weatherShowHeader}}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${ye("config.weather_show_header")}</div>
                  <div class="feature-desc">${ye("config.weather_show_header_desc")}</div>
                </div>
                <span
                  class="toggle ${this._weatherShowHeader?"on":""}"
                  role="switch"
                  aria-checked=${this._weatherShowHeader?"true":"false"}
                ></span>
              </button>
            </div>
          </div>
        </div>
      `:"cover"===e?V`
        <div class="feature-sub ${o?"open":""}">
          <div class="feature-sub-inner">
            <div class="feature-sub-content">
              <button
                class="feature-row"
                @click=${e=>{e.stopPropagation(),this._coverShowHeader=!this._coverShowHeader}}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${ye("config.cover_show_header")}</div>
                  <div class="feature-desc">${ye("config.cover_show_header_desc")}</div>
                </div>
                <span
                  class="toggle ${this._coverShowHeader?"on":""}"
                  role="switch"
                  aria-checked=${this._coverShowHeader?"true":"false"}
                ></span>
              </button>
              <div class="section-label" style="margin-top:10px;">${ye("config.cover_dashboard_entities")}</div>
              <div class="section-desc">${ye("config.cover_dashboard_entities_desc")}</div>
              <div class="item-list">
                ${this._coverDashboardOrder.map((e,t)=>{const i=this._getAllCoverEntities().find(t=>t.entityId===e);if(!i)return q;const o=this._coverDashboardEntities.includes(i.entityId),a=["item-row",o?"":"disabled",this._dragIdx===t&&"dashboard_covers"===this._dragContext?"dragging":"",this._dropIdx===t&&"dashboard_covers"===this._dragContext?"drop-target":""].filter(Boolean).join(" ");return V`
                    <div
                      class=${a}
                      draggable="true"
                      @dragstart=${()=>this._onDragStart(t,"dashboard_covers")}
                      @dragover=${e=>this._onDragOver(t,e)}
                      @dragleave=${()=>this._onDragLeave()}
                      @drop=${e=>this._onDropDashboardCover(t,e)}
                      @dragend=${()=>this._onDragEnd()}
                    >
                      <span class="drag-handle">
                        <ha-icon .icon=${"mdi:drag"}></ha-icon>
                      </span>
                      <div class="item-info">
                        <span class="item-name">${i.name}</span>
                        <span class="item-meta">${i.entityId}</span>
                      </div>
                      <button
                        class="toggle ${o?"on":""}"
                        @click=${e=>{e.stopPropagation(),this._toggleCoverDashboardEntity(i.entityId)}}
                        role="switch"
                        aria-checked=${o?"true":"false"}
                        aria-label="${ye(o?"common.hide":"common.show")} ${i.name}"
                      ></button>
                    </div>
                  `})}
              </div>
            </div>
          </div>
        </div>
      `:q}_toggleWeatherMetric(e){const t=new Set(this._weatherHiddenMetrics);t.has(e)?t.delete(e):t.add(e),this._weatherHiddenMetrics=[...t]}_selectWeatherEntity(e){this._weatherEntity=e,this._weatherDropdownOpen=!1}async _saveWeather(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_weather",{...this._weatherEntity?{entity_id:this._weatherEntity}:{},hidden_metrics:this._weatherHiddenMetrics,show_daily:this._weatherShowDaily,show_hourly:this._weatherShowHourly,show_header:this._weatherShowHeader}),!this._mounted)return;this._showToast(),pe.emit("weather-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}_renderWeatherPreview(){if(!this._weatherEntity||!this.hass)return V`<div class="preview-empty">${ye("config.weather_select_entity")}</div>`;const e=this.hass.states[this._weatherEntity];if(!e)return V`<div class="preview-empty">${ye("config.weather_select_entity")}</div>`;const t=e.attributes,i=t.temperature??"--",o=t.temperature_unit??"°C",a=new Set(this._weatherHiddenMetrics),s=e.state||"sunny",r={sunny:"mdi:weather-sunny","clear-night":"mdi:weather-night",partlycloudy:"mdi:weather-partly-cloudy",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",rainy:"mdi:weather-rainy",pouring:"mdi:weather-pouring",snowy:"mdi:weather-snowy",windy:"mdi:weather-windy",lightning:"mdi:weather-lightning"}[s]||"mdi:weather-cloudy",n=ye({sunny:"weather.cond_sunny","clear-night":"weather.cond_clear_night",partlycloudy:"weather.cond_partly_cloudy",cloudy:"weather.cond_cloudy",fog:"weather.cond_foggy",rainy:"weather.cond_rainy",pouring:"weather.cond_pouring",snowy:"weather.cond_snowy",windy:"weather.cond_windy",lightning:"weather.cond_lightning"}[s]||"weather.cond_cloudy"),d={sunny:"#fbbf24","clear-night":"#6366f1",partlycloudy:"#94a3b8",cloudy:"#64748b",fog:"#94a3b8",rainy:"#3b82f6",pouring:"#2563eb",snowy:"#e2e8f0",windy:"#6ee7b3",lightning:"#a78bfa"}[s]||"#64748b",c={sunny:"rgba(251,191,36,0.8)","clear-night":"rgba(129,140,248,0.7)",partlycloudy:"rgba(148,163,184,0.6)",cloudy:"rgba(100,116,139,0.6)",fog:"rgba(148,163,184,0.5)",rainy:"rgba(96,165,250,0.7)",pouring:"rgba(59,130,246,0.8)",snowy:"rgba(226,232,240,0.7)",windy:"rgba(110,231,179,0.6)",lightning:"rgba(167,139,250,0.8)"}[s]||"rgba(148,163,184,0.6)",l=new Date,h=l.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),p=String(l.getSeconds()).padStart(2,"0"),_=l.toLocaleDateString(this.hass.language||"fr",{weekday:"long",day:"numeric",month:"long"}),u=t.apparent_temperature??null,g="number"==typeof i?i:12,v=[0,.5,1.2,.8,-.3,-1,-.5,.2,.7,1.5],m=44,b=Math.min(...v),f=Math.max(...v)-b||1,y=v.map((e,t)=>({x:t/(v.length-1)*348,y:6+32*(1-(e-b)/f)}));let w=`M${y[0].x},${y[0].y}`;for(let H=0;H<y.length-1;H++){const e=y[Math.max(0,H-1)],t=y[H],i=y[H+1],o=y[Math.min(y.length-1,H+2)];w+=` C${t.x+(i.x-e.x)/6},${t.y+(i.y-e.y)/6} ${i.x-(o.x-t.x)/6},${i.y-(o.y-t.y)/6} ${i.x},${i.y}`}const x=w+" L348,44 L0,44 Z",$=.3*(v.length-1),k=Math.floor($),S=Math.min(v.length-1,k+1),C=$-k,E=6+32*(1-(v[k]+(v[S]-v[k])*C-b)/f),M=l.getHours(),D=v.map((e,t)=>`${String((M+t)%24).padStart(2,"0")}h`),P=[];if(a.has("humidity")||null==t.humidity||P.push({key:"humidity",icon:"mdi:water-percent",val:`${t.humidity}`,unit:"%"}),!a.has("wind")&&null!=t.wind_speed){const e="number"==typeof t.wind_bearing?this._windBearingToDir(t.wind_bearing):void 0;P.push({key:"wind",icon:"mdi:weather-windy",val:`${Math.round(t.wind_speed)}`,unit:"km/h",dir:e})}if(a.has("pressure")||null==t.pressure||P.push({key:"pressure",icon:"mdi:gauge",val:`${Math.round(t.pressure)}`,unit:"hPa"}),a.has("uv")||null==t.uv_index||P.push({key:"uv",icon:"mdi:sun-wireless",val:`${Math.round(t.uv_index)}`,unit:"UV"}),a.has("visibility")||null==t.visibility||P.push({key:"visibility",icon:"mdi:eye-outline",val:`${t.visibility}`,unit:"km"}),!a.has("sunrise")){const e=this.hass.states["sun.sun"],t=e?.attributes.next_rising;P.push({key:"sunrise",icon:"mdi:weather-sunset-up",val:t?new Date(t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}if(!a.has("sunset")){const e=this.hass.states["sun.sun"],t=e?.attributes.next_setting;P.push({key:"sunset",icon:"mdi:weather-sunset-down",val:t?new Date(t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"--"})}const T=this.hass.language||"fr",I=Array.from({length:7},(e,t)=>{const i=new Date(2024,0,t+1);return new Intl.DateTimeFormat(T,{weekday:"short"}).format(i)}),z=[g+2,g+1,g,g-1,g+1,g+3,g],O=[g-4,g-3,g-5,g-6,g-4,g-2,g-5],A=[0,10,30,60,20,0,15],R=l.getDay();return V`
      <div class="preview-weather-wrap">
        ${this._weatherShowHeader?V`
          <div class="pw-card-header">
            <span class="pw-card-title">${ye("weather.title")}</span>
            <span class="pw-card-location">${e.attributes.friendly_name??""}</span>
          </div>
        `:q}
      <div class="preview-weather">
        <div class="pw-tint" style="background: radial-gradient(80% 20% at 75% 15%, ${d}22 0%, transparent 70%);"></div>
        <div class="pw-content">
          <div class="pw-header">
            <div class="pw-header-left">
              <span class="pw-time">${h}<span class="pw-sec">:${p}</span></span>
              <span class="pw-date">${_}</span>
            </div>
            <div class="pw-header-right">
              <span class="pw-temp">${i}<span class="pw-temp-unit">${o}</span></span>
              <span class="pw-cond"><ha-icon .icon=${r}></ha-icon>${n}</span>
              ${null!=u?V`<span class="pw-feels">${ye("weather.feels_like",{temp:String(Math.round(u))})}</span>`:q}
            </div>
          </div>

          <div class="pw-spark-zone">
            <svg class="pw-spark-svg" viewBox="0 0 ${348} ${m}" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pw-spark-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="${c}" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="${c}" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <path d="${x}" fill="url(#pw-spark-fill)"/>
              <path d="${w}" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="pw-spark-now" style="left: ${30}%;">
              <div class="pw-spark-now-dot" style="top: ${E/m*100}%;"></div>
            </div>
            <div class="pw-spark-labels">
              ${D.map((e,t)=>t%2==0||t===D.length-1?V`<span class="pw-spark-lbl" style="left: ${t/(D.length-1)*100}%;">${e}</span>`:q)}
            </div>
          </div>

          ${P.length>0?V`
            <div class="pw-metrics" style="grid-template-columns: repeat(${3}, 1fr);">
              ${P.map(e=>V`
                <div class="pw-metric ${e.key}">
                  <ha-icon .icon=${e.icon}></ha-icon>
                  <span class="pw-metric-val">${e.val}</span>
                  ${e.unit?V`<span class="pw-metric-unit">${e.unit}</span>`:q}
                  ${e.dir?V`<span class="pw-metric-dir">${e.dir}</span>`:q}
                </div>
              `)}
            </div>
          `:q}

          ${this._weatherShowDaily||this._weatherShowHourly?V`
            <div class="pw-forecast-zone">
              <div class="pw-tabs">
                ${this._weatherShowDaily?V`<span class="pw-tab active">${ye("weather.daily_tab")}</span>`:q}
                ${this._weatherShowHourly?V`<span class="pw-tab">${ye("weather.hourly_tab")}</span>`:q}
              </div>
              <div class="pw-fold-sep"></div>
              ${this._weatherShowDaily?V`
                <div class="pw-daily-list">
                  ${["mdi:weather-sunny","mdi:weather-partly-cloudy","mdi:weather-cloudy","mdi:weather-rainy","mdi:weather-partly-cloudy","mdi:weather-sunny","mdi:weather-cloudy"].slice(0,5).map((e,t)=>{const i=(R+t)%7,o=0===t?ye("weather.today"):I[i],a=Math.round(z[t]),s=Math.round(O[t]),r=A[t];return V`
                      <div class="pw-day-row ${0===t?"today":""}">
                        <span class="pw-day-label">${o}</span>
                        <ha-icon class="pw-day-icon" .icon=${e}></ha-icon>
                        <span class="pw-day-temps"><span class="pw-day-high">${a}°</span><span class="pw-day-low">${s}°</span></span>
                        ${r>0?V`<span class="pw-day-precip">${r}%</span>`:V`<span class="pw-day-precip"></span>`}
                      </div>
                    `})}
                </div>
              `:q}
            </div>
          `:q}
        </div>
      </div>
      </div>
    `}_windBearingToDir(e){return["N","NE","E","SE","S","SO","O","NO"][Math.round(e/45)%8]}_renderWeatherTab(){const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("weather.")).sort():[],t=e.find(e=>e===this._weatherEntity),i=new Set(this._weatherHiddenMetrics);return V`
      <div class="tab-panel" id="panel-weather">
        <div class="section-label">${ye("config.navbar_behavior")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._weatherShowHeader=!this._weatherShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${ye("config.weather_show_header")}</div>
              <div class="feature-desc">${ye("config.weather_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._weatherShowHeader?"on":""}"
              role="switch"
              aria-checked=${this._weatherShowHeader?"true":"false"}
            ></span>
          </button>
        </div>

        <div class="section-label">${ye("config.weather_entity")}</div>
        <div class="section-desc">${ye("config.weather_entity_desc")}</div>
        <div class="dropdown ${this._weatherDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._weatherDropdownOpen=!this._weatherDropdownOpen}
            aria-expanded=${this._weatherDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${"mdi:weather-partly-cloudy"}></ha-icon>
            <span>${t||ye("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${e.map(e=>V`
                <button
                  class="dropdown-item ${e===this._weatherEntity?"active":""}"
                  role="option"
                  aria-selected=${e===this._weatherEntity?"true":"false"}
                  @click=${()=>this._selectWeatherEntity(e)}
                >
                  <ha-icon .icon=${"mdi:weather-partly-cloudy"}></ha-icon>
                  ${e}
                </button>
              `)}
          </div>
        </div>

        <div class="section-label">${ye("config.weather_metrics")}</div>
        <div class="section-desc">${ye("config.weather_metrics_desc")}</div>
        <div class="feature-list">
          ${[{key:"humidity",icon:"mdi:water-percent",nameKey:"config.weather_metric_humidity"},{key:"wind",icon:"mdi:weather-windy",nameKey:"config.weather_metric_wind"},{key:"pressure",icon:"mdi:gauge",nameKey:"config.weather_metric_pressure"},{key:"uv",icon:"mdi:white-balance-sunny",nameKey:"config.weather_metric_uv"},{key:"visibility",icon:"mdi:eye",nameKey:"config.weather_metric_visibility"},{key:"sunrise",icon:"mdi:weather-sunset-up",nameKey:"config.weather_metric_sunrise"},{key:"sunset",icon:"mdi:weather-sunset-down",nameKey:"config.weather_metric_sunset"}].map(e=>{const t=!i.has(e.key);return V`
              <button
                class="feature-row"
                @click=${()=>this._toggleWeatherMetric(e.key)}
              >
                <div class="feature-icon">
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
                <div class="feature-text">
                  <div class="feature-name">${ye(e.nameKey)}</div>
                </div>
                <span
                  class="toggle ${t?"on":""}"
                  role="switch"
                  aria-checked=${t?"true":"false"}
                  aria-label="${ye(t?"common.hide":"common.show")} ${ye(e.nameKey)}"
                ></span>
              </button>
            `})}
        </div>

        <div class="section-label">${ye("config.weather_forecasts")}</div>
        <div class="section-desc">${ye("config.weather_forecasts_desc")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._weatherShowDaily=!this._weatherShowDaily}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:calendar-week"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${ye("config.weather_daily")}</div>
            </div>
            <span
              class="toggle ${this._weatherShowDaily?"on":""}"
              role="switch"
              aria-checked=${this._weatherShowDaily?"true":"false"}
              aria-label="${this._weatherShowDaily?ye("common.hide"):ye("common.show")} ${ye("config.weather_daily")}"
            ></span>
          </button>
          <button
            class="feature-row"
            @click=${()=>{this._weatherShowHourly=!this._weatherShowHourly}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:clock-outline"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${ye("config.weather_hourly")}</div>
            </div>
            <span
              class="toggle ${this._weatherShowHourly?"on":""}"
              role="switch"
              aria-checked=${this._weatherShowHourly?"true":"false"}
              aria-label="${this._weatherShowHourly?ye("common.hide"):ye("common.show")} ${ye("config.weather_hourly")}"
            ></span>
          </button>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._loadWeatherConfig()}>${ye("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?ye("common.saving"):ye("common.save")}
          </button>
        </div>
      </div>
    `}async _loadWeatherConfig(){if(this._backend)try{const e=await this._backend.send("get_config");e?.weather&&(this._weatherEntity=e.weather.entity_id??"",this._weatherHiddenMetrics=e.weather.hidden_metrics??[],this._weatherShowDaily=e.weather.show_daily??!0,this._weatherShowHourly=e.weather.show_hourly??!0,this._weatherShowHeader=e.weather.show_header??!0)}catch{}}async _checkSpotifyStatus(){if(this._backend)try{const e=await this._backend.send("spotify_status");if(!this._mounted)return;this._spotifyConfigured=e?.configured??!1}catch{this._spotifyConfigured=!1}}async _saveSpotify(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_spotify_config",{show_header:this._spotifyShowHeader,entity_id:this._spotifyEntity,sort_order:this._spotifySortOrder,max_items_per_section:this._spotifyMaxItems}),!this._mounted)return;this._showToast(),pe.emit("spotify-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadSpotifyConfig(){if(this._backend)try{const e=await this._backend.send("get_config");e?.spotify_card&&(this._spotifyShowHeader=e.spotify_card.show_header??!0,this._spotifyEntity=e.spotify_card.entity_id??"",this._spotifySortOrder="oldest_first"===e.spotify_card.sort_order?"oldest_first":"recent_first",this._spotifyMaxItems=e.spotify_card.max_items_per_section??6)}catch{}}_selectSpotifyEntity(e){this._spotifyEntity=e,this._spotifyDropdownOpen=!1}_renderSpotifyPreview(){if(!1===this._spotifyConfigured)return V`<div class="preview-empty">${ye("config.spotify_not_configured")}</div>`;if(!this._spotifyEntity||!this.hass)return V`<div class="preview-empty">${ye("config.spotify_select_entity")}</div>`;const e=this.hass.states[this._spotifyEntity];if(!e)return V`<div class="preview-empty">${ye("config.spotify_select_entity")}</div>`;const t=e.attributes,i=t.media_title??"—",o=t.media_artist??"—",a=t.entity_picture,s="playing"===e.state;return V`
      <div class="preview-spotify" style="
        display: flex; align-items: center; gap: 12px;
        padding: 16px; border-radius: var(--radius-lg);
        background: var(--s2); border: 1px solid var(--b1);
      ">
        ${a?V`<img src=${a} alt="" style="
              width: 56px; height: 56px; border-radius: var(--radius-md);
              object-fit: cover; flex-shrink: 0;
            " />`:V`<div style="
              width: 56px; height: 56px; border-radius: var(--radius-md);
              background: var(--s3); display: flex; align-items: center; justify-content: center;
              flex-shrink: 0;
            "><ha-icon .icon=${"mdi:spotify"} style="color: #1DB954; --mdc-icon-size: 28px;"></ha-icon></div>`}
        <div style="min-width: 0; flex: 1;">
          <div style="font-size: 14px; font-weight: 600; color: var(--t1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${i}</div>
          <div style="font-size: 12px; color: var(--t3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${o}</div>
        </div>
        <ha-icon .icon=${s?"mdi:pause-circle":"mdi:play-circle"} style="
          color: #1DB954; --mdc-icon-size: 32px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        "></ha-icon>
      </div>
    `}_renderSpotifySetupGuide(){return V`
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
            ${ye("config.spotify_not_configured")}
          </div>
          <div style="font-size: 13px; color: var(--t3); margin-bottom: 20px; line-height: 1.5;">
            ${ye("config.spotify_setup_guide")}
          </div>

          <div style="text-align: left; padding: 0 8px;">
            ${[1,2,3,4].map(e=>V`
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
                  ${ye(`config.spotify_setup_step${e}`)}
                </span>
              </div>
            `)}
          </div>

          <div style="
            font-size: 12px; color: var(--t3); margin-top: 16px;
            padding: 10px; border-radius: var(--radius-md);
            background: var(--s1); border: 1px solid var(--b1);
          ">
            ${ye("config.spotify_setup_note")}
          </div>

          <button
            class="btn btn-accent"
            style="margin-top: 20px;"
            @click=${()=>{window.open("/config/integrations/dashboard","_blank")}}
          >
            <ha-icon .icon=${"mdi:cog"} style="--mdc-icon-size: 16px; display: flex; align-items: center; justify-content: center;"></ha-icon>
            ${ye("config.spotify_open_settings")}
          </button>
        </div>
      </div>
    `}_renderSpotifyTab(){if(null===this._spotifyConfigured)return V`<div class="tab-panel" id="panel-spotify">
        <div class="preview-empty">${ye("config.spotify_checking")}</div>
      </div>`;if(!1===this._spotifyConfigured)return this._renderSpotifySetupGuide();const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("media_player.")).sort():[],t=e.find(e=>e===this._spotifyEntity);return V`
      <div class="tab-panel" id="panel-spotify">
        <div class="section-label">${ye("config.spotify_show_header")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._spotifyShowHeader=!this._spotifyShowHeader}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:page-layout-header"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${ye("config.spotify_show_header")}</div>
              <div class="feature-desc">${ye("config.spotify_show_header_desc")}</div>
            </div>
            <span
              class="toggle ${this._spotifyShowHeader?"on":""}"
              role="switch"
              aria-checked=${this._spotifyShowHeader?"true":"false"}
            ></span>
          </button>
        </div>

        <div class="section-label">${ye("config.spotify_entity")}</div>
        <div class="section-desc">${ye("config.spotify_entity_desc")}</div>
        <div class="dropdown ${this._spotifyDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._spotifyDropdownOpen=!this._spotifyDropdownOpen}
            aria-expanded=${this._spotifyDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${"mdi:spotify"} style="color: #1DB954;"></ha-icon>
            <span>${t||ye("common.select")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            ${e.map(e=>V`
                <button
                  class="dropdown-item ${e===this._spotifyEntity?"active":""}"
                  role="option"
                  aria-selected=${e===this._spotifyEntity?"true":"false"}
                  @click=${()=>this._selectSpotifyEntity(e)}
                >
                  <ha-icon .icon=${"mdi:speaker"}></ha-icon>
                  ${e}
                </button>
              `)}
          </div>
        </div>

        <div class="section-label">${ye("config.spotify_sort_order")}</div>
        <div class="section-desc">${ye("config.spotify_sort_order_desc")}</div>
        <div class="feature-list">
          <button
            class="feature-row"
            @click=${()=>{this._spotifySortOrder="recent_first"}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:sort-clock-descending"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${ye("config.spotify_sort_recent")}</div>
            </div>
            <span
              class="toggle ${"recent_first"===this._spotifySortOrder?"on":""}"
              role="switch"
              aria-checked=${"recent_first"===this._spotifySortOrder?"true":"false"}
            ></span>
          </button>
          <button
            class="feature-row"
            @click=${()=>{this._spotifySortOrder="oldest_first"}}
          >
            <div class="feature-icon">
              <ha-icon .icon=${"mdi:sort-clock-ascending"}></ha-icon>
            </div>
            <div class="feature-text">
              <div class="feature-name">${ye("config.spotify_sort_oldest")}</div>
            </div>
            <span
              class="toggle ${"oldest_first"===this._spotifySortOrder?"on":""}"
              role="switch"
              aria-checked=${"oldest_first"===this._spotifySortOrder?"true":"false"}
            ></span>
          </button>
        </div>

        <div class="section-label">${ye("config.spotify_max_items")}</div>
        <div class="section-desc">${ye("config.spotify_max_items_desc")}</div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 4px 0;">
          <input
            type="range"
            min="1"
            max="20"
            .value=${String(this._spotifyMaxItems)}
            @input=${e=>{this._spotifyMaxItems=parseInt(e.target.value,10)}}
            style="flex: 1; accent-color: #1DB954;"
          />
          <span style="
            font-size: 13px; font-weight: 600; color: var(--t1);
            min-width: 28px; text-align: center;
          ">${this._spotifyMaxItems}</span>
        </div>

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._loadSpotifyConfig()}>${ye("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?ye("common.saving"):ye("common.save")}
          </button>
        </div>
      </div>
    `}async _saveTitle(){if(this._backend&&!this._saving){this._saving=!0;try{if(await this._backend.send("set_title_config",{title:this._titleText,mode_entity:this._titleModeEntity||null,modes:this._titleModes}),!this._mounted)return;this._showToast(),pe.emit("title-config-changed",void 0)}catch{this._showToast(!0)}finally{this._saving=!1}}}async _loadTitleConfig(){if(this._backend)try{const e=await this._backend.send("get_config");e?.title_card&&(this._titleText=e.title_card.title??"",this._titleModeEntity=e.title_card.mode_entity??"",this._titleModes=e.title_card.modes??[])}catch{}}_selectTitleModeEntity(e){if(this._titleModeEntity=e,this._titleModeDropdownOpen=!1,e.startsWith("input_select.")&&this.hass){const t=this.hass.states[e];if(t){const e=t.attributes.options??[],i=new Map(this._titleModes.map(e=>[e.id,e]));this._titleModes=e.map(e=>i.get(e)??{id:e,label:e,icon:"",color:"neutral"})}}else if(e.startsWith("input_boolean.")&&this.hass){const t=e.split(".")[1]??e,i=this.hass.states[e],o=i?.attributes.friendly_name||t,a=new Map(this._titleModes.map(e=>[e.id,e]));this._titleModes=[a.get(t)??{id:t,label:o,icon:"mdi:toggle-switch",color:"success"}]}else if(e.startsWith("scene.")&&this.hass){const t=e.split(".")[1]??e,i=this.hass.states[e],o=i?.attributes.friendly_name||t,a=new Map(this._titleModes.map(e=>[e.id,e]));this._titleModes=[a.get(t)??{id:t,label:o,icon:"mdi:palette",color:"accent"}]}else e||(this._titleModes=[])}_updateTitleMode(e,t,i){const o=[...this._titleModes];o[e]&&(o[e]={...o[e],[t]:i},this._titleModes=o)}async _openIconPopup(e){if(!this._iconLoading){if(0===this._iconList.length){this._iconLoading=!0;const e=document.createElement("ha-icon-picker");e.hass=this.hass,e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none";try{this.shadowRoot.appendChild(e),await new Promise(e=>setTimeout(e,50));const t=e.shadowRoot?.querySelector("ha-generic-picker");if(t?.getItems){const e=await t.getItems();e?.length&&(this._iconList=e.map(e=>e.id))}}catch{}finally{this.shadowRoot.contains(e)&&this.shadowRoot.removeChild(e),this._iconLoading=!1}}e<this._titleModes.length&&(this._iconSearch="",this._iconPopupModeIdx=e)}}_getFilteredIcons(){const e=this._iconSearch.toLowerCase().trim(),t=this._iconList;return e?t.filter(t=>t.toLowerCase().includes(e)).slice(0,120):t.slice(0,120)}_renderIconPopup(){if(null===this._iconPopupModeIdx)return q;const e=this._getFilteredIcons(),t=this._titleModes[this._iconPopupModeIdx]?.icon??"";return V`
      <div class="icon-popup-overlay" @click=${e=>{e.target===e.currentTarget&&(this._iconPopupModeIdx=null)}}>
        <div class="icon-popup">
          <div class="icon-popup-header">
            <span class="icon-popup-title">${ye("config.title_mode_icon")}</span>
            <input
              class="icon-popup-search"
              type="text"
              placeholder=${"mdi:..."}
              .value=${this._iconSearch}
              @input=${e=>{this._iconSearch=e.target.value}}
            />
          </div>
          <div class="icon-popup-grid-wrap">
            ${e.length>0||!this._iconSearch?V`
              <div class="icon-popup-grid">
                <button
                  class="icon-pick ${""===t?"selected":""}"
                  @click=${()=>{this._updateTitleMode(this._iconPopupModeIdx,"icon",""),this._iconPopupModeIdx=null}}
                  aria-label=${ye("config.title_no_icon")}
                >
                  <ha-icon .icon=${"mdi:cancel"} style="opacity:0.4;"></ha-icon>
                </button>
                ${e.map(e=>V`
                  <button
                    class="icon-pick ${e===t?"selected":""}"
                    @click=${()=>{this._updateTitleMode(this._iconPopupModeIdx,"icon",e),this._iconPopupModeIdx=null}}
                    aria-label=${e}
                  >
                    <ha-icon .icon=${e}></ha-icon>
                  </button>
                `)}
              </div>
            `:V`<div class="icon-popup-empty">${ye("config.title_no_icons_found")}</div>`}
          </div>
        </div>
      </div>
    `}_renderTitlePreview(){const e=this._titleText;if(!e)return V`<div class="preview-empty">${ye("config.title_title_placeholder")}</div>`;let t="",i="",o="neutral";if(this._titleModeEntity&&this.hass){const e=this.hass.states[this._titleModeEntity];if(e&&this._titleModeEntity.startsWith("input_select.")){const a=e.state,s=this._titleModes.find(e=>e.id===a);t=s?.label||a,i=s?.icon||"",o=s?.color||"neutral"}else if(e&&this._titleModeEntity.startsWith("input_boolean.")){const a=this._titleModeEntity.split(".")[1]??this._titleModeEntity,s=this._titleModes.find(e=>e.id===a);t=s?.label||e.attributes.friendly_name||a,i=s?.icon||"",o="on"===e.state?s?.color||"success":"neutral"}else if(e&&this._titleModeEntity.startsWith("scene.")){const a=this._titleModeEntity.split(".")[1]??this._titleModeEntity,s=this._titleModes.find(e=>e.id===a);t=s?.label||e.attributes.friendly_name||a,i=s?.icon||"",o=s?.color||"accent"}}const a={success:"var(--c-success)",warning:"var(--c-warning)",info:"var(--c-info)",accent:"var(--c-accent)",alert:"var(--c-alert)",neutral:"var(--t3)"};return V`
      <div class="preview-title-card">
        <div class="preview-title-text">${e}</div>
        ${t?V`
          <div class="preview-title-mode">
            <div class="preview-title-dot" style="background:${{success:"var(--c-success)",warning:"var(--c-warning)",info:"var(--c-info)",accent:"var(--c-accent)",alert:"var(--c-alert)",neutral:"var(--t4)"}[o]??(o.startsWith("#")?o:"var(--t4)")};"></div>
            ${i?V`<ha-icon .icon=${i} style="--mdc-icon-size:12px;color:${a[o]??(o.startsWith("#")?o:"var(--t3)")};"></ha-icon>`:q}
            <span style="color:var(--t4);font-size:9px;">${this._titleModeEntity?.startsWith("scene.")?ye("title_card.scene_label"):ye("title_card.mode_label")}</span>
            <span style="color:${a[o]??(o.startsWith("#")?o:"var(--t3)")};font-size:9px;font-weight:600;">${t}</span>
            <ha-icon .icon=${"mdi:chevron-right"} style="--mdc-icon-size:11px;color:var(--t4);"></ha-icon>
          </div>
        `:q}
      </div>
    `}_openColorPicker(e){if(e>=this._titleModes.length)return;const t=this._titleModes[e].color;t.startsWith("#")&&7===t.length?(this._colorPickerHex=t,this._colorPickerPos=this._hexToWheelPos(t)):(this._colorPickerHex="#ffffff",this._colorPickerPos={x:50,y:50}),this._colorPickerModeIdx=e,this.updateComplete.then(()=>{const e=this.shadowRoot?.querySelector(".cp-wheel-wrap canvas");e&&(this._cpCanvas=e,this._drawColorWheel(e))})}_closeColorPicker(){this._cancelColorDrag?.(),this._cancelColorDrag=void 0,this._colorPickerModeIdx=null,this._cpCanvas=null}_applyColorPicker(){null!==this._colorPickerModeIdx&&this._colorPickerModeIdx<this._titleModes.length&&this._updateTitleMode(this._colorPickerModeIdx,"color",this._colorPickerHex),this._closeColorPicker()}_onCpWheel(e){const t=this._cpCanvas;if(!t)return;const i=t.getBoundingClientRect(),o="touches"in e?e.touches[0].clientX:e.clientX,a="touches"in e?e.touches[0].clientY:e.clientY,s=o-i.left-i.width/2,r=a-i.top-i.height/2,n=i.width/2,d=Math.sqrt(s*s+r*r);if(d>n)return;const c=(180*Math.atan2(r,s)/Math.PI%360+360)%360,l=Math.min(d/n,1),h=this._hslToRgb(c,l,.5);this._colorPickerHex="#"+h.map(e=>e.toString(16).padStart(2,"0")).join(""),this._colorPickerPos={x:s/n*50+50,y:r/n*50+50}}_drawColorWheel(e){const t=440;e.width=t,e.height=t;const i=e.getContext("2d");if(!i)return;const o=220,a=220;for(let s=0;s<360;s++){const e=(s-1)*Math.PI/180,t=(s+1)*Math.PI/180,r=i.createRadialGradient(o,a,0,o,a,220);r.addColorStop(0,`hsl(${s}, 0%, 100%)`),r.addColorStop(.5,`hsl(${s}, 100%, 50%)`),r.addColorStop(1,`hsl(${s}, 100%, 50%)`),i.beginPath(),i.moveTo(o,a),i.arc(o,a,220,e,t),i.closePath(),i.fillStyle=r,i.fill()}}_hslToRgb(e,t,i){const o=(1-Math.abs(2*i-1))*t,a=o*(1-Math.abs(e/60%2-1)),s=i-o/2;let r=0,n=0,d=0;return e<60?(r=o,n=a):e<120?(r=a,n=o):e<180?(n=o,d=a):e<240?(n=a,d=o):e<300?(r=a,d=o):(r=o,d=a),[Math.round(255*(r+s)),Math.round(255*(n+s)),Math.round(255*(d+s))]}_hexToWheelPos(e){const t=parseInt(e.slice(1,3),16)/255,i=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,a=Math.max(t,i,o),s=Math.min(t,i,o),r=a-s;let n=0;0!==r&&(n=a===t?((i-o)/r+6)%6*60:a===i?60*((o-t)/r+2):60*((t-i)/r+4));const d=0===r?0:r/(1-Math.abs(a+s-1)),c=Math.min(d,1),l=n*Math.PI/180;return{x:Math.cos(l)*c*50+50,y:Math.sin(l)*c*50+50}}_renderColorPicker(){if(null===this._colorPickerModeIdx)return q;const e=this._colorPickerHex;return V`
      <div class="cp-overlay" @click=${e=>{e.target===e.currentTarget&&this._closeColorPicker()}}>
        <div class="cp-dialog">
          <span class="cp-title">${ye("config.title_color_picker_title")}</span>
          <div class="cp-wheel-wrap">
            <canvas
              @mousedown=${e=>{this._cancelColorDrag?.(),this._onCpWheel(e);const t=e=>this._onCpWheel(e),i=()=>{window.removeEventListener("mousemove",t),window.removeEventListener("mouseup",i),this._cancelColorDrag=void 0};window.addEventListener("mousemove",t),window.addEventListener("mouseup",i),this._cancelColorDrag=i}}
              @touchstart=${e=>{this._cancelColorDrag?.(),e.preventDefault(),this._onCpWheel(e);const t=e=>{e.preventDefault(),this._onCpWheel(e)},i=()=>{window.removeEventListener("touchmove",t),window.removeEventListener("touchend",i),this._cancelColorDrag=void 0};window.addEventListener("touchmove",t,{passive:!1}),window.addEventListener("touchend",i),this._cancelColorDrag=i}}
            ></canvas>
            <div class="cp-cursor" style="left:${this._colorPickerPos.x}%;top:${this._colorPickerPos.y}%;background:${e}"></div>
          </div>
          <div class="cp-preview" style="background:${e}"></div>
          <span class="cp-hex">${e}</span>
          <button class="cp-confirm" @click=${()=>this._applyColorPicker()}>
            ${ye("common.select")}
          </button>
        </div>
      </div>
    `}_renderTitleTab(){const e=this.hass?Object.keys(this.hass.states).filter(e=>e.startsWith("input_select.")||e.startsWith("input_boolean.")||e.startsWith("scene.")).sort():[],t=e.find(e=>e===this._titleModeEntity),i=["neutral","success","warning","info","accent","alert"];return V`
      <div class="tab-panel" id="panel-title">
        <div class="section-label">${ye("config.title_title")}</div>
        <div class="section-desc">${ye("config.title_title_desc")}</div>
        <input
          class="input"
          type="text"
          .value=${this._titleText}
          placeholder=${ye("config.title_title_placeholder")}
          @input=${e=>{this._titleText=e.target.value}}
        />

        <div class="title-section-gap"></div>

        <div class="section-label">${ye("config.title_mode_entity")}</div>
        <div class="section-desc">${ye("config.title_mode_entity_desc")}</div>
        <div class="dropdown ${this._titleModeDropdownOpen?"open":""}">
          <button
            class="dropdown-trigger"
            @click=${()=>this._titleModeDropdownOpen=!this._titleModeDropdownOpen}
            aria-expanded=${this._titleModeDropdownOpen?"true":"false"}
            aria-haspopup="listbox"
          >
            <ha-icon .icon=${this._titleModeEntity?"mdi:form-select":"mdi:help-circle-outline"}></ha-icon>
            <span>${t||ye("config.title_select_entity")}</span>
            <ha-icon class="arrow" .icon=${"mdi:chevron-down"}></ha-icon>
          </button>
          <div class="dropdown-menu" role="listbox">
            <button
              class="dropdown-item ${this._titleModeEntity?"":"active"}"
              role="option"
              aria-selected=${this._titleModeEntity?"false":"true"}
              @click=${()=>this._selectTitleModeEntity("")}
            >
              <ha-icon .icon=${"mdi:close"}></ha-icon>
              ${ye("title_card.mode_none")}
            </button>
            ${e.map(e=>V`
                <button
                  class="dropdown-item ${e===this._titleModeEntity?"active":""}"
                  role="option"
                  aria-selected=${e===this._titleModeEntity?"true":"false"}
                  @click=${()=>this._selectTitleModeEntity(e)}
                >
                  <ha-icon .icon=${e.startsWith("scene.")?"mdi:palette":e.startsWith("input_boolean.")?"mdi:toggle-switch":"mdi:form-select"}></ha-icon>
                  ${e}
                </button>
              `)}
          </div>
        </div>

        ${this._titleModes.length>0?V`
          <div class="title-section-gap"></div>

          <div class="section-label">${ye("config.title_modes")}</div>
          <div class="section-desc">${ye("config.title_modes_desc")}</div>
          <div class="title-modes-list">
            ${this._titleModes.map((e,t)=>V`
              <div class="title-mode-row">
                <span class="title-mode-id">${e.id}</span>
                <div class="title-mode-fields-row">
                  <input
                    class="input"
                    type="text"
                    placeholder=${ye("config.title_mode_label")}
                    .value=${e.label}
                    @input=${e=>this._updateTitleMode(t,"label",e.target.value)}
                  />
                  <button
                    class="title-icon-btn ${e.icon?"has-icon":""}"
                    @click=${()=>this._openIconPopup(t)}
                    aria-label="${ye("config.title_mode_icon")}"
                  >
                    <ha-icon .icon=${e.icon||"mdi:emoticon-outline"}></ha-icon>
                  </button>
                </div>
                <div class="title-color-row">
                  <span class="title-color-label">${ye("config.title_mode_color")}</span>
                  <div class="title-color-chips">
                    ${i.map(i=>V`
                      <button
                        class="title-color-chip ${i} ${e.color===i?"active":""}"
                        @click=${()=>this._updateTitleMode(t,"color",i)}
                        aria-label="${ye("config.title_mode_color")}: ${i}"
                      ></button>
                    `)}
                    ${e.color.startsWith("#")?V`
                      <button
                        class="title-color-chip custom active"
                        style="background:${e.color}"
                        @click=${()=>this._openColorPicker(t)}
                        aria-label="${ye("config.title_color_picker_aria")}"
                      ></button>
                    `:q}
                    <button
                      class="title-color-picker-btn"
                      @click=${()=>this._openColorPicker(t)}
                      aria-label="${ye("config.title_color_picker_aria")}"
                    ></button>
                  </div>
                </div>
              </div>
            `)}
          </div>
        `:q}

        <div class="save-bar">
          <button class="btn btn-ghost" @click=${()=>this._loadTitleConfig()}>${ye("common.reset")}</button>
          <button
            class="btn btn-accent"
            @click=${()=>this._save()}
            ?disabled=${this._saving}
          >
            ${this._saving?ye("common.saving"):ye("common.save")}
          </button>
        </div>
      </div>
    `}render(){return this._lang,this.hass?V`
      <div class="ambient-bg"></div>
      <div class="page-wrap">
        <div class="page-header">
          <button class="page-back" @click=${()=>this._goBack()} aria-label="${ye("common.back")}">
            <ha-icon .icon=${"mdi:chevron-left"}></ha-icon>
          </button>
          <span class="page-title">${ye("config.title")}</span>
          <span class="page-subtitle">${ye("config.brand")}</span>
        </div>

        <div class="glass config-panel">
          <div class="tabs" role="tablist">
            <button
              class="tab ${"dashboard"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"dashboard"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("dashboard")}
            >
              <ha-icon .icon=${"mdi:view-dashboard"}></ha-icon>
              ${ye("config.tab_dashboard")}
            </button>
            <button
              class="tab ${"title"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"title"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("title")}
            >
              <ha-icon .icon=${"mdi:format-title"}></ha-icon>
              ${ye("config.tab_title")}
            </button>
            <button
              class="tab ${"navbar"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"navbar"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("navbar")}
            >
              <ha-icon .icon=${"mdi:dock-bottom"}></ha-icon>
              ${ye("config.tab_navbar")}
            </button>
            <button
              class="tab ${"popup"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"popup"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("popup")}
            >
              <ha-icon .icon=${"mdi:card-outline"}></ha-icon>
              ${ye("config.tab_popup")}
            </button>
            <button
              class="tab ${"light"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"light"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("light")}
            >
              <ha-icon .icon=${"mdi:lightbulb-group"}></ha-icon>
              ${ye("config.tab_light")}
            </button>
            <button
              class="tab ${"weather"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"weather"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("weather")}
            >
              <ha-icon .icon=${"mdi:weather-partly-cloudy"}></ha-icon>
              ${ye("config.tab_weather")}
            </button>
            <button
              class="tab ${"cover"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"cover"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("cover")}
            >
              <ha-icon .icon=${"mdi:blinds"}></ha-icon>
              ${ye("config.tab_cover")}
            </button>
            <button
              class="tab ${"spotify"===this._tab?"active":""}"
              role="tab"
              aria-selected=${"spotify"===this._tab?"true":"false"}
              @click=${()=>this._switchTab("spotify")}
            >
              <ha-icon .icon=${"mdi:spotify"}></ha-icon>
              ${ye("config.tab_spotify")}
            </button>
          </div>

          <div class="preview-encart">
            <div class="preview-label">${ye("config.preview")}</div>
            ${"navbar"===this._tab?this._renderNavbarPreview():"popup"===this._tab?this._renderPopupPreview():"light"===this._tab?this._renderLightPreview():"weather"===this._tab?this._renderWeatherPreview():"title"===this._tab?this._renderTitlePreview():"cover"===this._tab?this._renderCoverPreview():"spotify"===this._tab?this._renderSpotifyPreview():this._renderDashboardPreview()}
          </div>

          ${"navbar"===this._tab?this._renderNavbarTab():"popup"===this._tab?this._renderPopupTab():"light"===this._tab?this._renderLightTab():"weather"===this._tab?this._renderWeatherTab():"title"===this._tab?this._renderTitleTab():"cover"===this._tab?this._renderCoverTab():"spotify"===this._tab?this._renderSpotifyTab():this._renderDashboardTab()}
        </div>
      </div>

      ${this._pickerOpen?this._renderDateTimePicker():q}
      ${this._renderIconPopup()}
      ${this._renderColorPicker()}

      <div class="toast ${this._toast?"show":""} ${this._toastError?"error":""}">
        ${this._toastError?ye("common.error_save"):ye("common.config_saved")}
      </div>
    `:q}}Ee([le({attribute:!1})],ze.prototype,"hass"),Ee([le({type:Boolean})],ze.prototype,"narrow"),Ee([he()],ze.prototype,"_lang"),Ee([he()],ze.prototype,"_tab"),Ee([he()],ze.prototype,"_rooms"),Ee([he()],ze.prototype,"_emptyRooms"),Ee([he()],ze.prototype,"_selectedRoom"),Ee([he()],ze.prototype,"_cards"),Ee([he()],ze.prototype,"_scenes"),Ee([he()],ze.prototype,"_lights"),Ee([he()],ze.prototype,"_lightRoom"),Ee([he()],ze.prototype,"_lightDropdownOpen"),Ee([he()],ze.prototype,"_iconPickerRoom"),Ee([he()],ze.prototype,"_dropdownOpen"),Ee([he()],ze.prototype,"_toast"),Ee([he()],ze.prototype,"_saving"),Ee([he()],ze.prototype,"_showLights"),Ee([he()],ze.prototype,"_showTemperature"),Ee([he()],ze.prototype,"_showHumidity"),Ee([he()],ze.prototype,"_showMedia"),Ee([he()],ze.prototype,"_autoSort"),Ee([he()],ze.prototype,"_tempHigh"),Ee([he()],ze.prototype,"_tempLow"),Ee([he()],ze.prototype,"_humidityThreshold"),Ee([he()],ze.prototype,"_weatherEntity"),Ee([he()],ze.prototype,"_weatherHiddenMetrics"),Ee([he()],ze.prototype,"_weatherShowDaily"),Ee([he()],ze.prototype,"_weatherShowHourly"),Ee([he()],ze.prototype,"_weatherShowHeader"),Ee([he()],ze.prototype,"_weatherDropdownOpen"),Ee([he()],ze.prototype,"_titleText"),Ee([he()],ze.prototype,"_titleModeEntity"),Ee([he()],ze.prototype,"_titleModes"),Ee([he()],ze.prototype,"_titleModeDropdownOpen"),Ee([he()],ze.prototype,"_iconPopupModeIdx"),Ee([he()],ze.prototype,"_iconSearch"),Ee([he()],ze.prototype,"_colorPickerModeIdx"),Ee([he()],ze.prototype,"_colorPickerHex"),Ee([he()],ze.prototype,"_colorPickerPos"),Ee([he()],ze.prototype,"_lightShowHeader"),Ee([he()],ze.prototype,"_coverShowHeader"),Ee([he()],ze.prototype,"_coverDashboardEntities"),Ee([he()],ze.prototype,"_coverDashboardOrder"),Ee([he()],ze.prototype,"_coverPresets"),Ee([he()],ze.prototype,"_coverRoom"),Ee([he()],ze.prototype,"_coverRoomDropdownOpen"),Ee([he()],ze.prototype,"_coverRoomEntities"),Ee([he()],ze.prototype,"_coverPresetInput"),Ee([he()],ze.prototype,"_spotifyShowHeader"),Ee([he()],ze.prototype,"_spotifyEntity"),Ee([he()],ze.prototype,"_spotifySortOrder"),Ee([he()],ze.prototype,"_spotifyDropdownOpen"),Ee([he()],ze.prototype,"_spotifyMaxItems"),Ee([he()],ze.prototype,"_spotifyConfigured"),Ee([he()],ze.prototype,"_dashboardEnabledCards"),Ee([he()],ze.prototype,"_dashboardCardOrder"),Ee([he()],ze.prototype,"_dashboardExpanded"),Ee([he()],ze.prototype,"_scheduleExpandedEntity"),Ee([he()],ze.prototype,"_pickerOpen"),Ee([he()],ze.prototype,"_pickerYear"),Ee([he()],ze.prototype,"_pickerMonth"),Ee([he()],ze.prototype,"_pickerStartDay"),Ee([he()],ze.prototype,"_pickerStartMonth"),Ee([he()],ze.prototype,"_pickerStartYear"),Ee([he()],ze.prototype,"_pickerEndDay"),Ee([he()],ze.prototype,"_pickerEndMonth"),Ee([he()],ze.prototype,"_pickerEndYear"),Ee([he()],ze.prototype,"_pickerStartHour"),Ee([he()],ze.prototype,"_pickerStartMinute"),Ee([he()],ze.prototype,"_pickerEndHour"),Ee([he()],ze.prototype,"_pickerEndMinute"),Ee([he()],ze.prototype,"_pickerPhase"),Ee([he()],ze.prototype,"_dragIdx"),Ee([he()],ze.prototype,"_dropIdx"),Ee([he()],ze.prototype,"_toastError");try{customElements.define("glass-config-panel",ze)}catch{}}();
