!function(){"use strict";const t=new class{constructor(){this.listeners=new Map}on(t,e){let i=this.listeners.get(t);return i||(i=new Set,this.listeners.set(t,i)),i.add(e),()=>this.off(t,e)}off(t,e){this.listeners.get(t)?.delete(e)}emit(t,e){this.listeners.get(t)?.forEach(t=>t(e))}};let e=!1;function i(){t.emit("location-changed",void 0)}const s=globalThis,r=s.ShadowRoot&&(void 0===s.ShadyCSS||s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const l=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,a)},d=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,a))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:p,getOwnPropertyNames:g,getOwnPropertySymbols:u,getPrototypeOf:f}=Object,m=globalThis,_=m.trustedTypes,b=_?_.emptyScript:"",v=m.reactiveElementPolyfillSupport,y=(t,e)=>t,x={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(s){i=null}}return i}},$=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);r?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...g(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(d(t))}else void 0!==t&&e.push(d(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(r)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),r=s.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:x;this._$Em=s;const a=r.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const a=this.constructor;if(!1===s&&(r=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==r||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[y("elementProperties")]=new Map,k[y("finalized")]=new Map,v?.({ReactiveElement:k}),(m.reactiveElementVersions??=[]).push("2.1.2");const C=globalThis,A=t=>t,E=C.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+I,O=`<${P}>`,M=document,R=()=>M.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,N="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,H=/>/g,D=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,V=/"/g,B=/^(?:script|style|textarea|title)$/i,K=(J=1,(t,...e)=>({_$litType$:J,strings:t,values:e})),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),G=new WeakMap,X=M.createTreeWalker(M,129);var J;function Y(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0;const n=t.length-1,o=this.parts,[l,d]=((t,e)=>{const i=t.length-1,s=[];let r,a=2===e?"<svg>":3===e?"<math>":"",n=z;for(let o=0;o<i;o++){const e=t[o];let i,l,d=-1,c=0;for(;c<e.length&&(n.lastIndex=c,l=n.exec(e),null!==l);)c=n.lastIndex,n===z?"!--"===l[1]?n=j:void 0!==l[1]?n=H:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=D):void 0!==l[3]&&(n=D):n===D?">"===l[0]?(n=r??z,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,i=l[1],n=void 0===l[3]?D:'"'===l[3]?V:F):n===V||n===F?n=D:n===j||n===H?n=z:(n=D,r=void 0);const h=n===D&&t[o+1].startsWith("/>")?" ":"";a+=n===z?e+O:d>=0?(s.push(i),e.slice(0,d)+T+e.slice(d)+I+h):e+I+(-2===d?o:h)}return[Y(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=Z.createElement(l,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&o.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(T)){const e=d[a++],i=s.getAttribute(t).split(I),n=/([.?@])?(.*)/.exec(e);o.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?st:"?"===n[1]?rt:"@"===n[1]?at:it}),s.removeAttribute(t)}else t.startsWith(I)&&(o.push({type:6,index:r}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(I),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],R()),X.nextNode(),o.push({type:2,index:++r});s.append(t[e],R())}}}else if(8===s.nodeType)if(s.data===P)o.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(I,t+1));)o.push({type:7,index:r}),t+=I.length-1}r++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===q)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const a=L(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);X.currentNode=s;let r=X.nextNode(),a=0,n=0,o=i[0];for(;void 0!==o;){if(a===o.index){let e;2===o.type?e=new et(r,r.nextSibling,this,t):1===o.type?e=new o.ctor(r,o.name,o.strings,this,t):6===o.type&&(e=new nt(r,this,t)),this._$AV.push(e),o=i[++n]}a!==o?.index&&(r=X.nextNode(),a++)}return X.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),L(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new et(this.O(R()),this.O(R()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const r=this.strings;let a=!1;if(void 0===r)t=Q(this,t,e,0),a=!L(t)||t!==this._$AH&&t!==q,a&&(this._$AH=t);else{const s=t;let n,o;for(t=r[0],n=0;n<r.length-1;n++)o=Q(this,s[i+n],e,n),o===q&&(o=this._$AH[n]),a||=!L(o)||o!==this._$AH[n],o===W?t=W:t!==W&&(t+=(o??"")+r[n+1]),this._$AH[n]=o}a&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class at extends it{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??W)===q)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=C.litHtmlPolyfillSupport;ot?.(Z,et),(C.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;class dt extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new et(e.insertBefore(R(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}dt._$litElement$=!0,dt.finalized=!0,lt.litElementHydrateSupport?.({LitElement:dt});const ct=lt.litElementPolyfillSupport;ct?.({LitElement:dt}),(lt.litElementVersions??=[]).push("4.2.2");const ht={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:$},pt=(t=ht,e,i)=>{const{kind:s,metadata:r}=i;let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function gt(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return gt({...t,state:!0,attribute:!1})}var ft=Object.defineProperty;class mt extends dt{constructor(){super(...arguments),this._busCleanups=[]}setConfig(t){this._config=t}shouldUpdate(t){if(!t.has("hass"))return!0;if(t.size>1)return!0;const e=t.get("hass");if(!e)return!0;const i=this.getTrackedEntityIds();return 0===i.length||i.some(t=>e.states[t]!==this.hass?.states[t])}getTrackedEntityIds(){const t=this._config?.entity;return t?[t]:[]}_listen(e,i){this._busCleanups.push(t.on(e,i))}disconnectedCallback(){super.disconnectedCallback(),this._busCleanups.forEach(t=>t()),this._busCleanups=[]}}function _t(t,e,i){return Object.values(e).filter(e=>!e.disabled_by&&!e.hidden_by&&function(t,e){if(t.area_id)return t.area_id;if(t.device_id&&e){const i=e[t.device_id];if(i?.area_id)return i.area_id}return null}(e,i)===t)}((t,e,i)=>{for(var s,r=void 0,a=t.length-1;a>=0;a--)(s=t[a])&&(r=s(e,i,r)||r);r&&ft(e,i,r)})([gt({attribute:!1})],mt.prototype,"hass");class bt{constructor(t){this.connection=t.connection}send(t,e={}){return this.connection.sendMessagePromise({type:`glass_cards/${t}`,...e})}subscribe(t,e,i={}){return this.connection.subscribeMessage(e,{type:`glass_cards/${t}`,...i})}}const vt=l`
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
  }
`,yt=l`
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
`,xt=l`
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
`;var $t=Object.defineProperty;class wt extends dt{setConfig(t){this._config=t}static{this.styles=[vt,l`
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
      .redirect a:hover {
        text-decoration: underline;
      }
      ha-icon {
        --mdc-icon-size: 20px;
        vertical-align: middle;
        margin-right: 4px;
      }
    `]}render(){return K`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          La configuration de Glass Cards se fait depuis le panneau dédié.
        </p>
        <p>
          <a href="/glass-cards">Ouvrir Glass Cards Config</a>
        </p>
      </div>
    `}}((t,e,i)=>{for(var s,r=void 0,a=t.length-1;a>=0;a--)(s=t[a])&&(r=s(e,i,r)||r);r&&$t(e,i,r)})([gt({attribute:!1})],wt.prototype,"hass"),customElements.define("glass-light-card-editor",wt);var kt=Object.defineProperty,Ct=(t,e,i,s)=>{for(var r,a=void 0,n=t.length-1;n>=0;n--)(r=t[n])&&(a=r(e,i,a)||a);return a&&kt(e,i,a),a};const At=[[3e3,"Chaud","#ffd4a3"],[4e3,"Chaud","#ffedb3"],[4800,"Neutre","#fff5e6"],[9999,"Froid","#e0ecf5"]],Et=[[251,191,36],[248,113,113],[244,114,182],[167,139,250],[129,140,248],[96,165,250],[74,222,128],[240,240,240]],St=[{key:"relax",label:"Relax",dotColor:"#ff9d4d",brightness:50,temp:2700,rgb:[251,191,36]},{key:"focus",label:"Focus",dotColor:"#e0ecf5",brightness:100,temp:5500,rgb:[96,165,250]},{key:"film",label:"Film",dotColor:"#ff7b3a",brightness:25,temp:2400,rgb:[248,113,113]},{key:"nuit",label:"Nuit",dotColor:"#ffd4a3",brightness:10,temp:2200,rgb:[167,139,250]}];function Tt(t){for(const[e,i,s]of At)if(t<e)return{label:i,color:s};return{label:"Froid",color:"#e0ecf5"}}function It(t){return"#"+t.map(t=>t.toString(16).padStart(2,"0")).join("")}function Pt(t,e){return`rgba(${t[0]},${t[1]},${t[2]},${e})`}class Ot extends mt{constructor(){super(...arguments),this._expandedEntity=null,this._activePresets=new Map,this._dragValues=new Map,this._throttleTimers=new Map,this._roomConfig=null,this._roomConfigLoaded=!1}static getConfigElement(){return document.createElement("glass-light-card-editor")}static{this.styles=[vt,yt,xt,l`
      :host {
        display: block;
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
        color: var(--c-warning);
      }
      .card-count.all {
        background: rgba(251, 191, 36, 0.2);
        color: var(--c-warning);
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
        background: var(--c-warning);
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
      .light-row:hover {
        background: var(--s1);
      }
      .light-row.compact {
        grid-column: span 1;
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
        color: var(--c-warning);
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
        text-overflow: ellipsis;
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
        background: var(--c-warning);
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
      .cdot:hover {
        transform: scale(1.15);
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
      .chip:hover {
        background: var(--s3);
        color: var(--t2);
        border-color: var(--b3);
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
    `]}setConfig(t){super.setConfig(t)}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._listen("room-config-changed",t=>{const e=this.areaId||this._config?.area;e&&t.areaId===e&&(this._roomConfigLoaded=!1,this._cachedLights=void 0,this._loadRoomConfig())})}disconnectedCallback(){super.disconnectedCallback(),this._throttleTimers.forEach(t=>clearTimeout(t)),this._throttleTimers.clear(),this._backend=void 0}async _loadRoomConfig(){const t=this.areaId||this._config?.area;if(t&&this.hass&&!this._roomConfigLoaded){this._roomConfigLoaded=!0,this._lastLoadedAreaId=t;try{this._backend||(this._backend=new bt(this.hass));const e=await this._backend.send("get_room",{area_id:t});e&&(this._roomConfig=e,this._cachedLights=void 0,this.requestUpdate())}catch{}}}_resetForNewArea(){this._roomConfig=null,this._roomConfigLoaded=!1,this._expandedEntity=null,this._activePresets=new Map,this._dragValues=new Map,this._cachedLights=void 0,this._throttleTimers.forEach(t=>clearTimeout(t)),this._throttleTimers.clear()}getTrackedEntityIds(){return this._getLights().map(t=>t.entity_id)}updated(t){super.updated(t);const e=this.areaId||this._config?.area;e&&this.hass&&(this._lastLoadedAreaId!==e&&this._resetForNewArea(),this._roomConfigLoaded||this._loadRoomConfig()),t.has("hass")&&(this._cachedLights=void 0);const i=this._getLightInfos();if(i.some(t=>t.isOn)?this.setAttribute("lights-on",""):this.removeAttribute("lights-on"),t.has("hass")&&this._dragValues.size>0){let t=!1;const e=new Map(this._dragValues);for(const s of i){const i=`bri:${s.entityId}`,r=e.get(i);void 0!==r&&Math.abs(s.brightnessPct-r)<=2&&(e.delete(i),t=!0);const a=`temp:${s.entityId}`,n=e.get(a);void 0!==n&&null!==s.colorTempKelvin&&Math.abs(s.colorTempKelvin-n)<=50&&(e.delete(a),t=!0)}t&&(this._dragValues=e)}}_getLights(){if(!this.hass)return[];if(this._cachedLights&&this._cachedLightsHassRef===this.hass.states)return this._cachedLights;this._cachedLightsHassRef=this.hass.states;const t=this._computeLights();return this._cachedLights=t,t}_computeLights(){if(!this.hass)return[];const t=this.areaId||this._config?.area;if(t){const e=this._config?.hidden_entities??[],i=this._roomConfig?.hidden_entities??[],s=new Set([...e,...i]),r=_t(t,this.hass.entities,this.hass.devices).filter(t=>t.entity_id.startsWith("light.")&&!s.has(t.entity_id)).map(t=>this.hass?.states[t.entity_id]).filter(t=>void 0!==t),a=this._config?.entity_order??[],n=a.length>0?a:this._roomConfig?.entity_order??[];if(n.length>0){const t=new Map;n.forEach((e,i)=>t.set(e,i)),r.sort((e,i)=>{const s=t.get(e.entity_id),r=t.get(i.entity_id);return void 0!==s&&void 0!==r?s-r:void 0!==s?-1:void 0!==r?1:0})}return r}if(this._config?.entity){const t=this.hass.states[this._config.entity];return t?[t]:[]}return[]}_getLightInfos(){return this._getLights().map(t=>this._buildLightInfo(t))}_buildLightInfo(t){const e="on"===t.state,i=function(t){const e=t.attributes.supported_color_modes;return e&&0!==e.length?e.some(t=>["hs","rgb","rgbw","rgbww","xy"].includes(t))?"rgb":e.includes("color_temp")?"color_temp":e.includes("brightness")?"dimmable":"simple":void 0!==t.attributes.brightness?"dimmable":"simple"}(t),s=t.attributes.brightness,r=e&&void 0!==s?Math.round(s/255*100):0;let a=null;const n=t.attributes.min_color_temp_kelvin||2e3,o=t.attributes.max_color_temp_kelvin||6500;e&&"color_temp"===i&&(a=t.attributes.color_temp_kelvin||null);let l=null;return e&&"rgb"===i&&(l=t.attributes.rgb_color||null),{entity:t,entityId:t.entity_id,name:t.attributes.friendly_name||t.entity_id,isOn:e,type:i,brightnessPct:r,colorTempKelvin:a,minKelvin:n,maxKelvin:o,rgbColor:l}}_toggleLight(t){this.hass?.callService("light","toggle",{},{entity_id:t})}_toggleAll(){const t=this._getLights(),e=t.some(t=>"on"===t.state),i=e?"turn_off":"turn_on",s=t.map(t=>t.entity_id);this.hass?.callService("light",i,{},{entity_id:s}),e&&(this._expandedEntity=null)}_toggleExpand(t,e){e&&(this._expandedEntity===t?this._expandedEntity=null:this._expandedEntity=t)}_onSliderInput(t,e,i){const s=new Map(this._dragValues);s.set(t,e),this._dragValues=s;const r=this._throttleTimers.get(t);void 0!==r&&clearTimeout(r),this._throttleTimers.set(t,setTimeout(()=>{this._throttleTimers.delete(t),i(this._dragValues.get(t)??e)},100))}_onSliderChange(t,e,i){i(e);const s=this._throttleTimers.get(t);void 0!==s&&clearTimeout(s),this._throttleTimers.delete(t)}_setBrightness(t,e){this.hass?.callService("light","turn_on",{brightness_pct:e},{entity_id:t})}_setColorTemp(t,e){this.hass?.callService("light","turn_on",{color_temp_kelvin:e},{entity_id:t})}_setRgbColor(t,e){this.hass?.callService("light","turn_on",{rgb_color:e},{entity_id:t})}_applyPreset(t,e){const i={brightness_pct:e.brightness};"color_temp"===t.type&&(i.color_temp_kelvin=e.temp),"rgb"===t.type&&(i.rgb_color=e.rgb),this.hass?.callService("light","turn_on",i,{entity_id:t.entityId});const s=new Map(this._activePresets);s.set(t.entityId,e.key),this._activePresets=s}_getEntityLayout(t){const e=this._config?.entity_layouts??{},i=this._roomConfig?.entity_layouts??{};return e[t]||i[t]||"auto"}_isCompact(t){const e=this._getEntityLayout(t.entityId);return"compact"===e||"full"!==e&&"simple"===t.type}_buildLayout(t){const e=[];let i=0;for(;i<t.length;){const s=t[i];if(this._isCompact(s)){const r=i+1<t.length&&this._isCompact(t[i+1])?t[i+1]:null;e.push({kind:"compact-pair",left:s,right:r}),i+=r?2:1}else e.push({kind:"full",light:s}),i++}return e}_computeTint(t){const e=t.filter(t=>t.isOn);if(0===e.length)return null;const i=e.length/t.length;let s="#fbbf24";const r=e.find(t=>"rgb"===t.type&&t.rgbColor);return r?.rgbColor&&(s=It(r.rgbColor)),{background:`radial-gradient(ellipse at 30% 30%, ${s}, transparent 70%)`,opacity:(.18*i).toFixed(3)}}_renderSubText(t){if(!t.isOn)return K`<span class="light-brightness-text">Éteint</span>`;if("simple"===t.type)return K`<span class="light-brightness-text">Allumé</span>`;const e=[K`<span class="light-brightness-text">${t.brightnessPct}%</span>`];if("color_temp"===t.type&&t.colorTempKelvin){const i=Tt(t.colorTempKelvin);e.push(K`<span class="light-temp-dot" style="background:${i.color}"></span>`),e.push(K`<span class="light-temp-text">${i.label}</span>`)}if("rgb"===t.type&&t.rgbColor){const i=It(t.rgbColor);e.push(K`<span class="light-temp-dot" style="background:${i}"></span>`),e.push(K`<span class="light-temp-text">Couleur</span>`)}return e}_renderLightRow(t,e,i){const s=["light-row",e?"compact":"",i?"compact-right":""].filter(Boolean).join(" "),r=t.isOn&&"rgb"===t.type&&t.rgbColor?`--light-rgb:${It(t.rgbColor)};--light-rgb-bg:${Pt(t.rgbColor,.1)};--light-rgb-border:${Pt(t.rgbColor,.15)};--light-rgb-glow:${Pt(t.rgbColor,.4)};--light-rgb-sub:${Pt(t.rgbColor,.55)}`:"",a=["light-icon-btn",t.isOn?"on":"",t.isOn&&t.rgbColor?"rgb":""].filter(Boolean).join(" ");return K`
      <div
        class=${s}
        data-on=${t.isOn}
        style=${r}
        ?data-rgb=${t.isOn&&"rgb"===t.type&&!!t.rgbColor}
      >
        <button
          class=${a}
          style=${r}
          @click=${()=>this._toggleLight(t.entityId)}
          aria-label="Toggle ${t.name}"
        >
          <ha-icon .icon=${"mdi:lightbulb"}></ha-icon>
        </button>
        <button
          class="light-expand-btn"
          @click=${()=>this._toggleExpand(t.entityId,t.isOn)}
          aria-label="${t.isOn?`Expand ${t.name} controls`:t.name}"
          aria-expanded=${t.isOn?this._expandedEntity===t.entityId?"true":"false":W}
        >
          <div class="light-info">
            <div class="light-name">${t.name}</div>
            <div class="light-sub">${this._renderSubText(t)}</div>
          </div>
          <span class="light-dot"></span>
        </button>
      </div>
    `}_getBrightnessFill(t){if("rgb"===t.type&&t.rgbColor){const[e,i,s]=t.rgbColor;return{fillClass:"dynamic",fillStyle:`--slider-fill-start:rgba(${e},${i},${s},0.15);--slider-fill-end:rgba(${e},${i},${s},0.35)`}}if("color_temp"===t.type&&t.colorTempKelvin){const e=Tt(t.colorTempKelvin).color,i=parseInt(e.slice(1,3),16),s=parseInt(e.slice(3,5),16),r=parseInt(e.slice(5,7),16);return{fillClass:"dynamic",fillStyle:`--slider-fill-start:rgba(${i},${s},${r},0.15);--slider-fill-end:rgba(${i},${s},${r},0.35)`}}return{fillClass:"warm",fillStyle:""}}_renderControlFold(t){const e=this._expandedEntity===t.entityId&&t.isOn,i="rgb"===t.type,{fillClass:s,fillStyle:r}=this._getBrightnessFill(t);return K`
      <div class="ctrl-fold ${e?"open":""}">
        <div class="ctrl-fold-inner">
          <div class="ctrl-panel" ?data-rgb=${i}>
            <span class="ctrl-label">${t.name}</span>

            ${"simple"!==t.type?this._renderSlider(`bri:${t.entityId}`,s,t.brightnessPct,"mdi:brightness-6","Intensité",t=>`${t}%`,1,100,e=>this._setBrightness(t.entityId,e),r):W}
            ${"color_temp"===t.type?this._renderTempSlider(t):W}
            ${"rgb"===t.type?this._renderColorDots(t):W}
            ${this._renderPresetChips(t)}
          </div>
        </div>
      </div>
    `}_renderSlider(t,e,i,s,r,a,n,o,l,d=""){const c=this._dragValues.get(t)??i,h=(c-n)/(o-n)*100;return K`
      <div class="slider">
        <div class="slider-fill ${e}" style=${d?`width:${h}%;${d}`:`width:${h}%`}></div>
        <div class="slider-thumb" style="left:${h}%"></div>
        <div class="slider-lbl">
          <ha-icon .icon=${s}></ha-icon>
          ${r}
        </div>
        <div class="slider-val">${a(c)}</div>
        <input
          type="range"
          class="slider-native"
          min=${n}
          max=${o}
          .value=${String(c)}
          aria-label=${r}
          @input=${e=>{const i=Number(e.target.value);this._onSliderInput(t,i,l)}}
          @change=${e=>{const i=Number(e.target.value);this._onSliderChange(t,i,l)}}
        />
      </div>
    `}_renderTempSlider(t){const e=t.colorTempKelvin||t.minKelvin,i=`temp:${t.entityId}`,s=this._dragValues.get(i)??e,r=Math.min(Math.max((s-t.minKelvin)/(t.maxKelvin-t.minKelvin)*100,2),98);return K`
      <div class="slider">
        <div class="slider-fill temp-gradient"></div>
        <div class="slider-thumb" style="left:${r}%"></div>
        <div class="slider-lbl">
          <ha-icon .icon=${"mdi:thermometer"}></ha-icon>
          Température
        </div>
        <div class="slider-val">${s}K</div>
        <input
          type="range"
          class="slider-native"
          min=${t.minKelvin}
          max=${t.maxKelvin}
          .value=${String(s)}
          aria-label="Température de couleur"
          @input=${e=>{const s=Number(e.target.value);this._onSliderInput(i,s,e=>this._setColorTemp(t.entityId,e))}}
          @change=${e=>{const s=Number(e.target.value);this._onSliderChange(i,s,e=>this._setColorTemp(t.entityId,e))}}
        />
      </div>
    `}_renderColorDots(t){return K`
      <div class="color-dots-row">
        ${Et.map(e=>{const i=!!t.rgbColor&&(s=t.rgbColor,r=e,s[0]===r[0]&&s[1]===r[1]&&s[2]===r[2]);var s,r;return K`
            <button
              class="cdot ${i?"active":""}"
              style="--cdot-color:${It(e)}"
              @click=${()=>this._setRgbColor(t.entityId,e)}
              aria-label="Couleur ${It(e)}"
            ></button>
          `})}
      </div>
    `}_renderPresetChips(t){const e=this._activePresets.get(t.entityId);return K`
      <div class="preset-row">
        ${St.map(i=>K`
            <button
              class="chip ${e===i.key?"active":""}"
              @click=${()=>this._applyPreset(t,i)}
              aria-label="Preset ${i.label}"
            >
              <span class="chip-dot" style="background:${i.dotColor}"></span>
              ${i.label}
            </button>
          `)}
      </div>
    `}_renderGrid(t){const e=this._buildLayout(t),i=[];for(const s of e)"full"===s.kind?(i.push(this._renderLightRow(s.light,!1,!1)),i.push(this._renderControlFold(s.light))):(i.push(this._renderLightRow(s.left,!0,!1)),s.right&&i.push(this._renderLightRow(s.right,!0,!0)));return i}render(){const t=this._getLightInfos();if(0===t.length)return W;const e=t.filter(t=>t.isOn).length,i=t.length,s=e>0,r=0===e?"none":e===i?"all":"some",a=this._computeTint(t);return K`
      <div class="card-header">
        <div class="card-header-left">
          <span class="card-title">LIGHTS</span>
          <span class="card-count ${r}">${e}/${i}</span>
        </div>
        <button
          class="toggle-all ${s?"on":""}"
          @click=${()=>this._toggleAll()}
          aria-label="${s?"Turn off all lights":"Turn on all lights"}"
        ></button>
      </div>

      <div class="card glass">
        <div
          class="tint"
          style=${a?`background:${a.background};opacity:${a.opacity}`:"opacity:0"}
        ></div>
        <div class="card-inner">
          <div class="lights-grid">${this._renderGrid(t)}</div>
        </div>
      </div>
    `}}Ct([gt({attribute:!1})],Ot.prototype,"areaId"),Ct([ut()],Ot.prototype,"_expandedEntity"),Ct([ut()],Ot.prototype,"_activePresets"),Ct([ut()],Ot.prototype,"_dragValues"),customElements.define("glass-light-card",Ot);const Mt=window;Mt.customCards=Mt.customCards||[],Mt.customCards.push({type:"glass-light-card",name:"Glass Light Card",description:"Neo-glassmorphism light control card"});var Rt=Object.defineProperty,Lt=(t,e,i,s)=>{for(var r,a=void 0,n=t.length-1;n>=0;n--)(r=t[n])&&(a=r(e,i,a)||a);return a&&Rt(e,i,a),a};const Ut=class e extends dt{constructor(){super(...arguments),this._areaId=null,this._open=!1,this._scenesOpen=!1,this._activeSceneId=null,this._peekedRooms=new Set,this._busCleanups=[],this._boundKeydown=this._onKeydown.bind(this),this._roomConfigs=new Map}shouldUpdate(t){if(!t.has("hass"))return!0;if(t.size>1)return!0;if(!this._areaId)return!1;const e=t.get("hass");if(!e||!this.hass)return!0;const i=_t(this._areaId,this.hass.entities,this.hass.devices),s=this.hass;return i.some(t=>e.states[t.entity_id]!==s.states[t.entity_id])}static{this.styles=[vt,yt,l`
      :host {
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: none;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .overlay {
        position: fixed;
        inset: 0;
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
        color: var(--c-warning);
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
        width: 12px;
        height: 3px;
        background: var(--t4);
        border-radius: 4px;
        margin-top: 6px;
        opacity: 0;
        transition:
          opacity 0.3s var(--ease-std),
          width 0.3s var(--ease-std);
      }
      .scene-dash.visible {
        opacity: 1;
        width: 16px;
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
      .close-btn:hover {
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
      .scene-chip:hover {
        background: var(--s3);
        border-color: var(--b3);
        color: var(--t1);
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

    `]}connectedCallback(){super.connectedCallback(),void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),this._busCleanups.push(t.on("popup-open",t=>this._handleOpen(t)),t.on("popup-close",()=>this._handleClose()),t.on("room-config-changed",t=>{this._roomConfigs.delete(t.areaId),this._peekedRooms.delete(t.areaId),this._areaId===t.areaId&&this._loadRoomConfig(t.areaId)}),t.on("navbar-config-changed",()=>{this._roomConfigs.clear(),this._areaId&&this._loadRoomConfig(this._areaId)})),document.addEventListener("keydown",this._boundKeydown)}disconnectedCallback(){super.disconnectedCallback(),void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),void 0!==this._closeTimeout&&(clearTimeout(this._closeTimeout),this._closeTimeout=void 0),this._peekedRooms.clear(),this._busCleanups.forEach(t=>t()),this._busCleanups=[],this._backend=void 0,document.removeEventListener("keydown",this._boundKeydown)}_handleOpen(t){void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),this._areaId=t.areaId,this._scenesOpen=!1,this._activeSceneId=null,this._loadRoomConfig(t.areaId),this._pendingRaf=requestAnimationFrame(()=>{this._pendingRaf=void 0,this._open=!0,this.setAttribute("open","")})}_maybePeekScenes(t){if(this._peekedRooms.has(t))return;const e=this._getAreaMeta();e&&0!==e.scenes.length&&(this._peekedRooms.add(t),this._peekTimeout=setTimeout(()=>{this._scenesOpen=!0;const t=setTimeout(()=>{this._scenesOpen=!1,this._peekTimeout===t&&(this._peekTimeout=void 0)},1e3);this._peekTimeout=t},400))}_handleClose(){void 0!==this._pendingRaf&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=void 0),void 0!==this._peekTimeout&&(clearTimeout(this._peekTimeout),this._peekTimeout=void 0),this._open=!1,this.removeAttribute("open"),this._closeTimeout=setTimeout(()=>{this._areaId=null,this._closeTimeout=void 0},350)}_onKeydown(e){"Escape"===e.key&&this._open&&t.emit("popup-close",void 0)}async _loadRoomConfig(t){if(this.hass)if(this._roomConfigs.has(t))this._open&&this._areaId===t&&this._maybePeekScenes(t);else{try{this._backend||(this._backend=new bt(this.hass));const e=await this._backend.send("get_room",{area_id:t});this._roomConfigs.set(t,e),this.requestUpdate()}catch{this._roomConfigs.set(t,null)}this._open&&this._areaId===t&&this._maybePeekScenes(t)}}_onOverlayClick(){t.emit("popup-close",void 0)}_getAreaMeta(){if(!this.hass||!this._areaId)return null;const t=this.hass.areas[this._areaId];if(!t)return null;const e=_t(this._areaId,this.hass.entities,this.hass.devices);let i=null,s=null,r=!1,a=!1;const n=[],o=new Set;for(const g of e){const t=this.hass?.states[g.entity_id];if(!t)continue;const e=g.entity_id.split(".")[0];if(o.add(e),"light"===e&&"on"===t.state&&(r=!0),"media_player"===e&&"playing"===t.state&&(a=!0),"sensor"===e){const e=t.attributes.device_class;"temperature"!==e||i||(i=`${t.state}${t.attributes.unit_of_measurement||"°C"}`),"humidity"!==e||s||(s=`${t.state}%`)}"scene"===e&&n.push(t)}const l=this._roomConfigs.get(this._areaId),d=l?.icon??t.icon??"mdi:home",c=new Set(l?.hidden_scenes??[]),h=n.filter(t=>!c.has(t.entity_id)),p=l?.scene_order;if(p&&p.length>0){const t=new Map(p.map((t,e)=>[t,e]));h.sort((e,i)=>(t.get(e.entity_id)??1/0)-(t.get(i.entity_id)??1/0))}return{name:t.name,icon:d,temperature:i,humidity:s,hasLight:r,hasMusic:a,scenes:h,domains:[...o]}}_activateScene(t){this._activeSceneId=t,this.hass?.callService("scene","turn_on",{},{entity_id:t})}static{this.DEFAULT_CARD_ORDER=["light","media_player","climate","fan","cover","vacuum"]}_getVisibleCards(t){const i=this._areaId?this._roomConfigs.get(this._areaId):void 0,s=i?.card_order;return s&&s.length>0?s.filter(e=>t.includes(e)):e.DEFAULT_CARD_ORDER.filter(e=>t.includes(e))}_renderDomainCard(t){return"light"===t?K`<glass-light-card .hass=${this.hass} .areaId=${this._areaId}></glass-light-card>`:W}render(){if(!this._areaId)return W;const e=this._getAreaMeta();if(!e)return W;const i=e.scenes.length>0,s=this._getVisibleCards(e.domains);return K`
      <div class="overlay" @click=${this._onOverlayClick}></div>
      <div class="dialog glass glass-float" role="dialog" aria-modal="true" aria-label=${e.name}>
        <div class="header">
          <div class="header-left">
            <button
              class="header-icon ${e.hasLight?"has-light":""} ${e.hasMusic?"has-music":""}"
              @click=${()=>i&&(this._scenesOpen=!this._scenesOpen)}
              aria-label=${i?"Toggle scenes":e.name}
              aria-expanded=${i?this._scenesOpen?"true":"false":W}
            >
              <ha-icon .icon=${e.icon}></ha-icon>
            </button>
            <div class="scene-dash ${i?"visible":""}"></div>
          </div>
          <div class="header-info">
            <div class="header-name">${e.name}</div>
            <div class="header-meta">
              ${e.temperature?K`<span>${e.temperature}</span>`:W}
              ${e.humidity?K`<span>${e.humidity}</span>`:W}
            </div>
          </div>
          <button
            class="close-btn"
            @click=${()=>t.emit("popup-close",void 0)}
            aria-label="Close"
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
                          aria-label="Activate ${t.attributes.friendly_name||t.entity_id}"
                        >
                          ${t.attributes.friendly_name||t.entity_id}
                        </button>
                      `)}
                  </div>
                </div>
              </div>
            `:W}

        <div class="cards">
          ${s.map(t=>this._renderDomainCard(t))}
        </div>
      </div>
    `}};Lt([gt({attribute:!1})],Ut.prototype,"hass"),Lt([ut()],Ut.prototype,"_areaId"),Lt([ut()],Ut.prototype,"_open"),Lt([ut()],Ut.prototype,"_scenesOpen"),Lt([ut()],Ut.prototype,"_activeSceneId");let Nt=Ut;customElements.define("glass-room-popup",Nt);var zt=Object.defineProperty;class jt extends dt{setConfig(t){this._config=t}static{this.styles=[vt,l`
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
      .redirect a:hover {
        text-decoration: underline;
      }
      ha-icon {
        --mdc-icon-size: 20px;
        vertical-align: middle;
        margin-right: 4px;
      }
    `]}render(){return K`
      <div class="redirect">
        <p>
          <ha-icon icon="mdi:cog"></ha-icon>
          La configuration de Glass Cards se fait depuis le panneau dédié.
        </p>
        <p>
          <a href="/glass-cards">Ouvrir Glass Cards Config</a>
        </p>
      </div>
    `}}((t,e,i)=>{for(var s,r=void 0,a=t.length-1;a>=0;a--)(s=t[a])&&(r=s(e,i,r)||r);r&&zt(e,i,r)})([gt({attribute:!1})],jt.prototype,"hass"),customElements.define("glass-navbar-card-editor",jt);var Ht=Object.defineProperty,Dt=(t,e,i,s)=>{for(var r,a=void 0,n=t.length-1;n>=0;n--)(r=t[n])&&(a=r(e,i,a)||a);return a&&Ht(e,i,a),a};class Ft extends mt{constructor(){super(...arguments),this._items=[],this._activeArea=null,this._scrollMask="none",this._popup=null,this._ownsPopup=!1,this._areaStructure=[],this._lastAreaKeys="",this._cachedEntityFingerprint="",this._boundUpdateMask=this._updateNavMask.bind(this),this._scrollEl=null,this._navbarConfig=null,this._configLoaded=!1,this._roomConfigs={},this._flipPositions=new Map,this._editMode=!1}static getConfigElement(){return document.createElement("glass-navbar-card-editor")}static{this.styles=[vt,yt,l`
      :host {
        display: block;
        height: 0;
        overflow: visible;
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
        z-index: 9990;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .nav-scroll {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        overflow-x: auto;
        scrollbar-width: none;
        flex: 1;
        padding: 0 8px;
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
        gap: 6px;
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
      .nav-item:hover {
        background: var(--s2);
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
      .nav-item.has-light ha-icon {
        color: var(--c-warning);
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

      /* 2. Humidity bar at bottom */
      .nav-item.has-humidity::after {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);
        width: 14px;
        height: 3px;
        border-radius: 2px;
        background: var(--c-info);
        opacity: 0.8;
        box-shadow: 0 0 6px rgba(96, 165, 250, 0.4);
      }

      /* 3. Music icon bounce */
      .nav-item.has-music ha-icon {
        animation: pulse-music 0.8s ease-in-out infinite;
      }
      /* Combined: light glow + music bounce */
      .nav-item.has-light.has-music ha-icon {
        color: var(--c-warning);
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
        color: var(--c-alert);
        filter: drop-shadow(0 0 4px rgba(248, 113, 113, 0.6));
        animation: pulse-temp-hot 2s infinite ease-in-out;
      }
      .nav-item.has-temp-cold .nav-temp-badge {
        opacity: 1;
        color: var(--c-info);
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
    `]}connectedCallback(){super.connectedCallback();const t=document.querySelector("glass-room-popup");t?(this._popup=t,this._ownsPopup=!1):(this._popup=document.createElement("glass-room-popup"),document.body.appendChild(this._popup),this._ownsPopup=!0),this._listen("popup-close",()=>{this._activeArea=null}),this._listen("navbar-config-changed",()=>{this._loadBackendConfig()}),this._editMode=this._detectEditMode()}disconnectedCallback(){super.disconnectedCallback(),this._ownsPopup&&this._popup?.remove(),this._popup=null,this._ownsPopup=!1,this._scrollEl&&(this._scrollEl.removeEventListener("scroll",this._boundUpdateMask),this._scrollEl=null),this._backend=void 0}firstUpdated(t){super.firstUpdated(t),this._attachScrollListener()}_detectEditMode(){let t=this.getRootNode();for(;t instanceof ShadowRoot;){const e=t.host;if("HUI-CARD-OPTIONS"===e.tagName)return!0;if("HUI-DIALOG-EDIT-CARD"===e.tagName)return!0;if("HA-PANEL-LOVELACE"===e.tagName&&e.lovelace?.editMode)return!0;t=e.getRootNode()}return!1}_attachScrollListener(){if(this._scrollEl)return;const t=this.renderRoot.querySelector(".nav-scroll");t&&(t.addEventListener("scroll",this._boundUpdateMask,{passive:!0}),this._scrollEl=t,this._updateNavMask())}setConfig(t){super.setConfig(t)}getCardSize(){return 0}getTrackedEntityIds(){return this._items.flatMap(t=>t.entityIds)}updated(t){if(super.updated(t),t.has("hass")&&this.hass){if(this._editMode=this._detectEditMode(),this._editMode)return;this._configLoaded||(this._configLoaded=!0,this._loadBackendConfig()),this._rebuildStructure(),this._aggregateState(),this._popup&&(this._popup.hass=this.hass)}t.has("_items")&&this.updateComplete.then(()=>{this._attachScrollListener(),this._updateNavMask(),this._animateFlip()})}async _loadBackendConfig(){if(this.hass)try{this._backend||(this._backend=new bt(this.hass));const t=await this._backend.send("get_config");this._navbarConfig=t.navbar,this._roomConfigs=t.rooms??{},this._lastAreaKeys="",this._rebuildStructure(),this._aggregateState()}catch{}}_rebuildStructure(){if(!this.hass?.areas)return;const t=this._navbarConfig?`${this._navbarConfig.room_order.join(",")}|${this._navbarConfig.hidden_rooms.join(",")}`:"";this.hass.entities!==this._lastEntitiesRef&&(this._lastEntitiesRef=this.hass.entities,this._cachedEntityFingerprint=Object.values(this.hass.entities).map(t=>`${t.entity_id}:${t.area_id??""}`).sort().join("|"));const e=this._cachedEntityFingerprint,i=Object.entries(this._roomConfigs).map(([t,e])=>`${t}:${e.icon??""}`).sort().join(","),s=Object.keys(this.hass.areas).sort().join(",")+"||"+e+"||"+t+"||"+i;if(s===this._lastAreaKeys)return;this._lastAreaKeys=s;const r=new Set(this._navbarConfig?.hidden_rooms??[]),a=new Map;(this._navbarConfig?.room_order??[]).forEach((t,e)=>a.set(t,e));const n=[];for(const o of Object.values(this.hass.areas)){if(r.has(o.area_id))continue;const t=_t(o.area_id,this.hass.entities,this.hass.devices);if(0===t.length)continue;const e=this._roomConfigs[o.area_id]?.icon;n.push({areaId:o.area_id,name:o.name,icon:e||o.icon||"mdi:home",entityIds:t.map(t=>t.entity_id)})}n.sort((t,e)=>{const i=a.get(t.areaId),s=a.get(e.areaId);return void 0!==i&&void 0!==s?i-s:void 0!==i?-1:void 0!==s?1:t.name.localeCompare(e.name)}),this._areaStructure=n}_aggregateState(){if(!this.hass)return;const t=this._areaStructure.map(t=>{let e=0,i=null,s=null,r=null,a=null,n=!1;for(const o of t.entityIds){const t=this.hass?.states[o];if(!t)continue;const l=o.split(".")[0];if("light"===l&&"on"===t.state&&e++,"sensor"===l){const e=t.attributes.device_class;"temperature"!==e||i||(i=`${t.state}°`,s=parseFloat(t.state)),"humidity"!==e||r||(r=`${t.state}%`,a=parseFloat(t.state))}"media_player"===l&&"playing"===t.state&&(n=!0)}return{...t,lightsOn:e,temperature:i,tempValue:s,humidity:r,humidityValue:a,mediaPlaying:n}});(this._navbarConfig?.room_order?.length??0)>0||t.sort((t,e)=>(t.lightsOn>0?0:1)-(e.lightsOn>0?0:1)),this._snapshotPositions(),this._items=t}_snapshotPositions(){this._flipPositions.clear();const t=this.renderRoot.querySelectorAll(".nav-item[data-area]");for(const e of t){const t=e.dataset.area;t&&this._flipPositions.set(t,e.getBoundingClientRect().left)}}_animateFlip(){if(0===this._flipPositions.size)return;const t=this.renderRoot.querySelectorAll(".nav-item[data-area]");for(const e of t){const t=e.dataset.area;if(!t)continue;const i=this._flipPositions.get(t);if(void 0===i)continue;const s=i-e.getBoundingClientRect().left;Math.abs(s)<1||e.animate([{transform:`translateX(${s}px)`},{transform:"translateX(0)"}],{duration:350,easing:"cubic-bezier(0.4, 0, 0.2, 1)"})}this._flipPositions.clear()}_updateNavMask(){const t=this.renderRoot.querySelector(".nav-scroll");if(!t)return;if(!(t.scrollWidth>t.offsetWidth))return void(this._scrollMask="none");const e=t.scrollLeft<=5,i=t.scrollLeft+t.offsetWidth>=t.scrollWidth-5;this._scrollMask=e&&i?"none":e?"mask-right":i?"mask-left":"mask-both"}_handleNavClick(e,i){const s=i.currentTarget.getBoundingClientRect();this._activeArea===e.areaId?(t.emit("popup-close",void 0),this._activeArea=null):(this._activeArea=e.areaId,t.emit("popup-open",{areaId:e.areaId,originRect:s}))}_renderNavItem(t){const e=this._activeArea===t.areaId,i=!1!==this._navbarConfig?.show_lights,s=!1!==this._navbarConfig?.show_temperature,r=!1!==this._navbarConfig?.show_humidity,a=!1!==this._navbarConfig?.show_media,n=this._navbarConfig?.temp_high??24,o=this._navbarConfig?.temp_low??17,l=this._navbarConfig?.humidity_threshold??65,d=i&&t.lightsOn>0,c=r&&null!==t.humidityValue&&t.humidityValue>=l,h=a&&t.mediaPlaying,p=s&&null!==t.tempValue&&t.tempValue>=n,g=["nav-item",e?"active":"",d?"has-light":"",c?"has-humidity":"",h?"has-music":"",p?"has-temp-hot":"",s&&null!==t.tempValue&&!p&&t.tempValue<=o?"has-temp-cold":""].filter(Boolean).join(" ");return K`
      <button
        class=${g}
        data-area=${t.areaId}
        @click=${e=>this._handleNavClick(t,e)}
        aria-label=${t.name}
      >
        <span class="nav-temp-badge">
          <ha-icon .icon=${p?"mdi:thermometer-high":"mdi:snowflake"}></ha-icon>
        </span>
        <ha-icon .icon=${t.icon}></ha-icon>
        <span class="nav-label-wrap"><span class="nav-label">${t.name}</span></span>
      </button>
    `}render(){if(this._editMode||0===this._items.length)return W;const t="nav-scroll"+("none"!==this._scrollMask?` ${this._scrollMask}`:"");return K`
      <nav class="navbar glass glass-float">
        <div class=${t}>${this._items.map(t=>this._renderNavItem(t))}</div>
      </nav>
    `}}Dt([ut()],Ft.prototype,"_items"),Dt([ut()],Ft.prototype,"_activeArea"),Dt([ut()],Ft.prototype,"_scrollMask"),Dt([ut()],Ft.prototype,"_editMode"),customElements.define("glass-navbar-card",Ft);const Vt=window;Vt.customCards=Vt.customCards||[],Vt.customCards.push({type:"glass-navbar-card",name:"Glass Navbar Card",description:"Auto-discovering bottom navigation for Glass Cards"}),function(){if(e)return;e=!0;const s=history.pushState,r=history.replaceState;history.pushState=function(e,i,r){s.call(this,e,i,r),window.dispatchEvent(new Event("location-changed")),t.emit("location-changed",void 0)},history.replaceState=function(e,i,s){r.call(this,e,i,s),window.dispatchEvent(new Event("location-changed")),t.emit("location-changed",void 0)},window.addEventListener("popstate",i)}(),window.dispatchEvent(new Event("ll-rebuild"))}();
