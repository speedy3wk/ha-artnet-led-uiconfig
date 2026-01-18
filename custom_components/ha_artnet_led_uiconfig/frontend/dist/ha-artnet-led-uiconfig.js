function e(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new o(i,e,n)},s=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,n))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,f=globalThis,m=f.trustedTypes,g=m?m.emptyScript:"",v=f.reactiveElementPolyfillSupport,_=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!l(e,t),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&c(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const o=n?.call(this);r?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,n)=>{if(i)e.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of n){const n=document.createElement("style"),r=t.litNonce;void 0!==r&&n.setAttribute("nonce",r),n.textContent=i.cssText,e.appendChild(n)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=n;const o=r.fromAttribute(t,e.type);this[n]=o??this._$Ej?.get(n)??o,this._$Em=null}}requestUpdate(e,t,i,n=!1,r){if(void 0!==e){const o=this.constructor;if(!1===n&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??b)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,v?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,w=e=>e,k=A.trustedTypes,C=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+E,I=`<${D}>`,T=document,N=()=>T.createComment(""),U=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,L="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,F=/>/g,P=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Y=/'/g,R=/"/g,z=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),H=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,K=T.createTreeWalker(T,129);function G(e,t){if(!O(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const V=(e,t)=>{const i=e.length-1,n=[];let r,o=2===t?"<svg>":3===t?"<math>":"",a=M;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===M?"!--"===l[1]?a=j:void 0!==l[1]?a=F:void 0!==l[2]?(z.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=P):void 0!==l[3]&&(a=P):a===P?">"===l[0]?(a=r??M,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?P:'"'===l[3]?R:Y):a===R||a===Y?a=P:a===j||a===F?a=M:(a=P,r=void 0);const p=a===P&&e[t+1].startsWith("/>")?" ":"";o+=a===M?i+I:c>=0?(n.push(s),i.slice(0,c)+S+i.slice(c)+E+p):i+E+(-2===c?t:p)}return[G(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class J{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let r=0,o=0;const a=e.length-1,s=this.parts,[l,c]=V(e,t);if(this.el=J.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=K.nextNode())&&s.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(S)){const t=c[o++],i=n.getAttribute(e).split(E),a=/([.?@])?(.*)/.exec(t);s.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?te:"?"===a[1]?ie:"@"===a[1]?ne:ee}),n.removeAttribute(e)}else e.startsWith(E)&&(s.push({type:6,index:r}),n.removeAttribute(e));if(z.test(n.tagName)){const e=n.textContent.split(E),t=e.length-1;if(t>0){n.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],N()),K.nextNode(),s.push({type:2,index:++r});n.append(e[t],N())}}}else if(8===n.nodeType)if(n.data===D)s.push({type:2,index:r});else{let e=-1;for(;-1!==(e=n.data.indexOf(E,e+1));)s.push({type:7,index:r}),e+=E.length-1}r++}}static createElement(e,t){const i=T.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,n){if(t===H)return t;let r=void 0!==n?i._$Co?.[n]:i._$Cl;const o=U(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=r:i._$Cl=r),void 0!==r&&(t=X(e,r._$AS(e,t.values),r,n)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??T).importNode(t,!0);K.currentNode=n;let r=K.nextNode(),o=0,a=0,s=i[0];for(;void 0!==s;){if(o===s.index){let t;2===s.type?t=new Q(r,r.nextSibling,this,e):1===s.type?t=new s.ctor(r,s.name,s.strings,this,e):6===s.type&&(t=new re(r,this,e)),this._$AV.push(t),s=i[++a]}o!==s?.index&&(r=K.nextNode(),o++)}return K.currentNode=T,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),U(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==H&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>O(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new Z(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new J(e)),t}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const r of e)n===t.length?t.push(i=new Q(this.O(N()),this.O(N()),this,this.options)):i=t[n],i._$AI(r),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,n){const r=this.strings;let o=!1;if(void 0===r)e=X(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==H,o&&(this._$AH=e);else{const n=e;let a,s;for(e=r[0],a=0;a<r.length-1;a++)s=X(this,n[i+a],t,a),s===H&&(s=this._$AH[a]),o||=!U(s)||s!==this._$AH[a],s===W?e=W:e!==W&&(e+=(s??"")+r[a+1]),this._$AH[a]=s}o&&!n&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ne extends ee{constructor(e,t,i,n,r){super(e,t,i,n,r),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??W)===H)return;const i=this._$AH,n=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==W&&(i===W||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const oe=A.litHtmlPolyfillSupport;oe?.(J,Q),(A.litHtmlVersions??=[]).push("3.3.2");const ae=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let se=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let r=n._$litPart$;if(void 0===r){const e=i?.renderBefore??null;n._$litPart$=r=new Q(t.insertBefore(N(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}};se._$litElement$=!0,se.finalized=!0,ae.litElementHydrateSupport?.({LitElement:se});const le=ae.litElementPolyfillSupport;le?.({LitElement:se}),(ae.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},de=(e=ce,t,i)=>{const{kind:n,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===n&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===n){const{name:n}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(n,r,e,!0,i)},init(t){return void 0!==t&&this.C(n,void 0,e,t),t}}}if("setter"===n){const{name:n}=i;return function(i){const r=this[n];t.call(this,i),this.requestUpdate(n,r,e,!0,i)}}throw Error("Unsupported decorator location: "+n)};function pe(e){return(t,i)=>"object"==typeof i?de(e,t,i):((e,t,i)=>{const n=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),n?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function he(e){return pe({...e,state:!0,attribute:!1})}const ue={type:"ha_artnet_led_uiconfig",title:"",nodes:[]},fe={de:{ready:"Bereit",loading:"Lade...",loaded:"Geladen",loadError:"Fehler beim Laden",saving:"Speichere...",saved:"Gespeichert",saveError:"Fehler beim Speichern",deployRunning:"Deploy läuft...",deployFailed:"Deploy fehlgeschlagen",deployWithError:"Deploy mit Fehler",deployOk:"Deploy OK",reloadFailed:"Reload fehlgeschlagen",reloadLabel:"Reload",haUrlLabel:"HA URL",tokenLabel:"Token",tokenPresent:"Token present",tokenLength:"Token length",statusLabel:"Status",urlLabel:"URL",title:"Art-Net LED UI Config",reloadButton:"Neu laden",showYaml:"YAML anzeigen",hideYaml:"YAML ausblenden",deploy:"Deploy",deployEllipsis:"Deploy...",save:"Speichern",saveEllipsis:"Speichern..."},en:{ready:"Ready",loading:"Loading...",loaded:"Loaded",loadError:"Failed to load",saving:"Saving...",saved:"Saved",saveError:"Failed to save",deployRunning:"Deploy running...",deployFailed:"Deploy failed",deployWithError:"Deploy with errors",deployOk:"Deploy OK",reloadFailed:"Reload failed",reloadLabel:"Reload",haUrlLabel:"HA URL",tokenLabel:"Token",tokenPresent:"Token present",tokenLength:"Token length",statusLabel:"Status",urlLabel:"URL",title:"Art-Net LED UI Config",reloadButton:"Reload",showYaml:"Show YAML",hideYaml:"Hide YAML",deploy:"Deploy",deployEllipsis:"Deploy...",save:"Save",saveEllipsis:"Saving..."}},me={de:{invalidYaml:"Ungültiges YAML",addNode:"Node hinzufügen",importYaml:"YAML importieren",loadExample:"Beispiel laden",clearAll:"Alles leeren",noNodes:"Keine Nodes vorhanden. Nutze “Node hinzufügen”.",yamlPreview:"YAML Vorschau",yamlSubtitle:"Kopiere diesen Block in deine configuration.yaml (HA erlaubt kein direktes Schreiben aus dem UI-Editor).",copyYaml:"YAML kopieren",nodeTitle:"Node",remove:"Entfernen",hostIp:"Host/IP",nodeType:"Node Type",maxFps:"Max FPS",refresh:"Refresh (s)",universes:"Universes",addUniverse:"Universe hinzufügen",universeTitle:"Universe",addLamp:"Lampe hinzufügen",universeId:"Universe ID",outputCorrection:"Output Correction",noUniverses:"Noch keine Universes.",noLamps:"Keine Lampen in diesem Universe.",yamlImportTitle:"YAML importieren",yamlImportSubtitle:"Füge deine artnet_led Konfiguration ein.",close:"Schließen",importAction:"Importieren",cancel:"Abbrechen",editLamp:"Lampe bearbeiten",name:"Name",channel:"Channel",type:"Type",transition:"Transition",channelSize:"Channel Size",channelSetup:"Channel Setup",minTemp:"Min Temp",maxTemp:"Max Temp",channelSetupEditor:"Channel Setup Editor",save:"Speichern",channelEditorTitle:"Channel Setup Editor",channelEditorSubtitle:"Baue die DMX‑Kanäle per Drag & Drop.",paletteTitle:"Bausteine",staticValue:"Statischer Wert (0‑255)",channelOrder:"Channel Reihenfolge",noChannels:"Noch keine Kanäle.",apply:"Übernehmen",channelDimmer:"Dimmer (skaliert)",channelCoolScaled:"Kaltweiß (skaliert)",channelCoolUnscaled:"Kaltweiß (unskaliert)",channelWarmScaled:"Warmweiß (skaliert)",channelWarmUnscaled:"Warmweiß (unskaliert)",channelTempScaled:"Temperatur (0 warm → 255 kalt)",channelTempUnscaled:"Temperatur (255 warm → 0 kalt)",channelRedScaled:"Rot (skaliert)",channelRedUnscaled:"Rot (unskaliert)",channelGreenScaled:"Grün (skaliert)",channelGreenUnscaled:"Grün (unskaliert)",channelBlueScaled:"Blau (skaliert)",channelBlueUnscaled:"Blau (unskaliert)",channelWhiteScaled:"Weiß (skaliert)",channelWhiteUnscaled:"Weiß (unskaliert)",channelHue:"Farbton",channelSaturation:"Sättigung",channelX:"X‑Wert (XY‑Modus)",channelY:"Y‑Wert (XY‑Modus)"},en:{invalidYaml:"Invalid YAML",addNode:"Add node",importYaml:"Import YAML",loadExample:"Load example",clearAll:"Clear all",noNodes:"No nodes yet. Use “Add node”.",yamlPreview:"YAML preview",yamlSubtitle:"Copy this block into your configuration.yaml (HA does not allow direct writes from the UI editor).",copyYaml:"Copy YAML",nodeTitle:"Node",remove:"Remove",hostIp:"Host/IP",nodeType:"Node type",maxFps:"Max FPS",refresh:"Refresh (s)",universes:"Universes",addUniverse:"Add universe",universeTitle:"Universe",addLamp:"Add lamp",universeId:"Universe ID",outputCorrection:"Output correction",noUniverses:"No universes yet.",noLamps:"No lamps in this universe.",yamlImportTitle:"Import YAML",yamlImportSubtitle:"Paste your artnet_led configuration.",close:"Close",importAction:"Import",cancel:"Cancel",editLamp:"Edit lamp",name:"Name",channel:"Channel",type:"Type",transition:"Transition",channelSize:"Channel size",channelSetup:"Channel setup",minTemp:"Min temp",maxTemp:"Max temp",channelSetupEditor:"Channel setup editor",save:"Save",channelEditorTitle:"Channel setup editor",channelEditorSubtitle:"Build DMX channels by drag & drop.",paletteTitle:"Blocks",staticValue:"Static value (0‑255)",channelOrder:"Channel order",noChannels:"No channels yet.",apply:"Apply",channelDimmer:"Dimmer (scaled)",channelCoolScaled:"Cool white (scaled)",channelCoolUnscaled:"Cool white (unscaled)",channelWarmScaled:"Warm white (scaled)",channelWarmUnscaled:"Warm white (unscaled)",channelTempScaled:"Temperature (0 warm → 255 cold)",channelTempUnscaled:"Temperature (255 warm → 0 cold)",channelRedScaled:"Red (scaled)",channelRedUnscaled:"Red (unscaled)",channelGreenScaled:"Green (scaled)",channelGreenUnscaled:"Green (unscaled)",channelBlueScaled:"Blue (scaled)",channelBlueUnscaled:"Blue (unscaled)",channelWhiteScaled:"White (scaled)",channelWhiteUnscaled:"White (unscaled)",channelHue:"Hue",channelSaturation:"Saturation",channelX:"X value (XY mode)",channelY:"Y value (XY mode)"}};
/*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT */
function ge(e){return null==e}var ve={isNothing:ge,isObject:function(e){return"object"==typeof e&&null!==e},toArray:function(e){return Array.isArray(e)?e:ge(e)?[]:[e]},repeat:function(e,t){var i,n="";for(i=0;i<t;i+=1)n+=e;return n},isNegativeZero:function(e){return 0===e&&Number.NEGATIVE_INFINITY===1/e},extend:function(e,t){var i,n,r,o;if(t)for(i=0,n=(o=Object.keys(t)).length;i<n;i+=1)e[r=o[i]]=t[r];return e}};function _e(e,t){var i="",n=e.reason||"(unknown reason)";return e.mark?(e.mark.name&&(i+='in "'+e.mark.name+'" '),i+="("+(e.mark.line+1)+":"+(e.mark.column+1)+")",!t&&e.mark.snippet&&(i+="\n\n"+e.mark.snippet),n+" "+i):n}function ye(e,t){Error.call(this),this.name="YAMLException",this.reason=e,this.mark=t,this.message=_e(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack||""}ye.prototype=Object.create(Error.prototype),ye.prototype.constructor=ye,ye.prototype.toString=function(e){return this.name+": "+_e(this,e)};var be=ye;function $e(e,t,i,n,r){var o="",a="",s=Math.floor(r/2)-1;return n-t>s&&(t=n-s+(o=" ... ").length),i-n>s&&(i=n+s-(a=" ...").length),{str:o+e.slice(t,i).replace(/\t/g,"→")+a,pos:n-t+o.length}}function xe(e,t){return ve.repeat(" ",t-e.length)+e}var Ae=function(e,t){if(t=Object.create(t||null),!e.buffer)return null;t.maxLength||(t.maxLength=79),"number"!=typeof t.indent&&(t.indent=1),"number"!=typeof t.linesBefore&&(t.linesBefore=3),"number"!=typeof t.linesAfter&&(t.linesAfter=2);for(var i,n=/\r?\n|\r|\0/g,r=[0],o=[],a=-1;i=n.exec(e.buffer);)o.push(i.index),r.push(i.index+i[0].length),e.position<=i.index&&a<0&&(a=r.length-2);a<0&&(a=r.length-1);var s,l,c="",d=Math.min(e.line+t.linesAfter,o.length).toString().length,p=t.maxLength-(t.indent+d+3);for(s=1;s<=t.linesBefore&&!(a-s<0);s++)l=$e(e.buffer,r[a-s],o[a-s],e.position-(r[a]-r[a-s]),p),c=ve.repeat(" ",t.indent)+xe((e.line-s+1).toString(),d)+" | "+l.str+"\n"+c;for(l=$e(e.buffer,r[a],o[a],e.position,p),c+=ve.repeat(" ",t.indent)+xe((e.line+1).toString(),d)+" | "+l.str+"\n",c+=ve.repeat("-",t.indent+d+3+l.pos)+"^\n",s=1;s<=t.linesAfter&&!(a+s>=o.length);s++)l=$e(e.buffer,r[a+s],o[a+s],e.position-(r[a]-r[a+s]),p),c+=ve.repeat(" ",t.indent)+xe((e.line+s+1).toString(),d)+" | "+l.str+"\n";return c.replace(/\n$/,"")},we=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],ke=["scalar","sequence","mapping"];var Ce=function(e,t){if(t=t||{},Object.keys(t).forEach(function(t){if(-1===we.indexOf(t))throw new be('Unknown option "'+t+'" is met in definition of "'+e+'" YAML type.')}),this.options=t,this.tag=e,this.kind=t.kind||null,this.resolve=t.resolve||function(){return!0},this.construct=t.construct||function(e){return e},this.instanceOf=t.instanceOf||null,this.predicate=t.predicate||null,this.represent=t.represent||null,this.representName=t.representName||null,this.defaultStyle=t.defaultStyle||null,this.multi=t.multi||!1,this.styleAliases=function(e){var t={};return null!==e&&Object.keys(e).forEach(function(i){e[i].forEach(function(e){t[String(e)]=i})}),t}(t.styleAliases||null),-1===ke.indexOf(this.kind))throw new be('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')};function Se(e,t){var i=[];return e[t].forEach(function(e){var t=i.length;i.forEach(function(i,n){i.tag===e.tag&&i.kind===e.kind&&i.multi===e.multi&&(t=n)}),i[t]=e}),i}function Ee(e){return this.extend(e)}Ee.prototype.extend=function(e){var t=[],i=[];if(e instanceof Ce)i.push(e);else if(Array.isArray(e))i=i.concat(e);else{if(!e||!Array.isArray(e.implicit)&&!Array.isArray(e.explicit))throw new be("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");e.implicit&&(t=t.concat(e.implicit)),e.explicit&&(i=i.concat(e.explicit))}t.forEach(function(e){if(!(e instanceof Ce))throw new be("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(e.loadKind&&"scalar"!==e.loadKind)throw new be("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(e.multi)throw new be("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),i.forEach(function(e){if(!(e instanceof Ce))throw new be("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var n=Object.create(Ee.prototype);return n.implicit=(this.implicit||[]).concat(t),n.explicit=(this.explicit||[]).concat(i),n.compiledImplicit=Se(n,"implicit"),n.compiledExplicit=Se(n,"explicit"),n.compiledTypeMap=function(){var e,t,i={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function n(e){e.multi?(i.multi[e.kind].push(e),i.multi.fallback.push(e)):i[e.kind][e.tag]=i.fallback[e.tag]=e}for(e=0,t=arguments.length;e<t;e+=1)arguments[e].forEach(n);return i}(n.compiledImplicit,n.compiledExplicit),n};var De=new Ee({explicit:[new Ce("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return null!==e?e:""}}),new Ce("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return null!==e?e:[]}}),new Ce("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return null!==e?e:{}}})]});var Ie=new Ce("tag:yaml.org,2002:null",{kind:"scalar",resolve:function(e){if(null===e)return!0;var t=e.length;return 1===t&&"~"===e||4===t&&("null"===e||"Null"===e||"NULL"===e)},construct:function(){return null},predicate:function(e){return null===e},represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});var Te=new Ce("tag:yaml.org,2002:bool",{kind:"scalar",resolve:function(e){if(null===e)return!1;var t=e.length;return 4===t&&("true"===e||"True"===e||"TRUE"===e)||5===t&&("false"===e||"False"===e||"FALSE"===e)},construct:function(e){return"true"===e||"True"===e||"TRUE"===e},predicate:function(e){return"[object Boolean]"===Object.prototype.toString.call(e)},represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"});function Ne(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function Ue(e){return 48<=e&&e<=55}function Oe(e){return 48<=e&&e<=57}var Le=new Ce("tag:yaml.org,2002:int",{kind:"scalar",resolve:function(e){if(null===e)return!1;var t,i=e.length,n=0,r=!1;if(!i)return!1;if("-"!==(t=e[n])&&"+"!==t||(t=e[++n]),"0"===t){if(n+1===i)return!0;if("b"===(t=e[++n])){for(n++;n<i;n++)if("_"!==(t=e[n])){if("0"!==t&&"1"!==t)return!1;r=!0}return r&&"_"!==t}if("x"===t){for(n++;n<i;n++)if("_"!==(t=e[n])){if(!Ne(e.charCodeAt(n)))return!1;r=!0}return r&&"_"!==t}if("o"===t){for(n++;n<i;n++)if("_"!==(t=e[n])){if(!Ue(e.charCodeAt(n)))return!1;r=!0}return r&&"_"!==t}}if("_"===t)return!1;for(;n<i;n++)if("_"!==(t=e[n])){if(!Oe(e.charCodeAt(n)))return!1;r=!0}return!(!r||"_"===t)},construct:function(e){var t,i=e,n=1;if(-1!==i.indexOf("_")&&(i=i.replace(/_/g,"")),"-"!==(t=i[0])&&"+"!==t||("-"===t&&(n=-1),t=(i=i.slice(1))[0]),"0"===i)return 0;if("0"===t){if("b"===i[1])return n*parseInt(i.slice(2),2);if("x"===i[1])return n*parseInt(i.slice(2),16);if("o"===i[1])return n*parseInt(i.slice(2),8)}return n*parseInt(i,10)},predicate:function(e){return"[object Number]"===Object.prototype.toString.call(e)&&e%1==0&&!ve.isNegativeZero(e)},represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0o"+e.toString(8):"-0o"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),Me=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");var je=/^[-+]?[0-9]+e/;var Fe=new Ce("tag:yaml.org,2002:float",{kind:"scalar",resolve:function(e){return null!==e&&!(!Me.test(e)||"_"===e[e.length-1])},construct:function(e){var t,i;return i="-"===(t=e.replace(/_/g,"").toLowerCase())[0]?-1:1,"+-".indexOf(t[0])>=0&&(t=t.slice(1)),".inf"===t?1===i?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:".nan"===t?NaN:i*parseFloat(t,10)},predicate:function(e){return"[object Number]"===Object.prototype.toString.call(e)&&(e%1!=0||ve.isNegativeZero(e))},represent:function(e,t){var i;if(isNaN(e))switch(t){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(t){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(t){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(ve.isNegativeZero(e))return"-0.0";return i=e.toString(10),je.test(i)?i.replace("e",".e"):i},defaultStyle:"lowercase"}),Pe=De.extend({implicit:[Ie,Te,Le,Fe]}),Ye=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Re=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");var ze=new Ce("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:function(e){return null!==e&&(null!==Ye.exec(e)||null!==Re.exec(e))},construct:function(e){var t,i,n,r,o,a,s,l,c=0,d=null;if(null===(t=Ye.exec(e))&&(t=Re.exec(e)),null===t)throw new Error("Date resolve error");if(i=+t[1],n=+t[2]-1,r=+t[3],!t[4])return new Date(Date.UTC(i,n,r));if(o=+t[4],a=+t[5],s=+t[6],t[7]){for(c=t[7].slice(0,3);c.length<3;)c+="0";c=+c}return t[9]&&(d=6e4*(60*+t[10]+ +(t[11]||0)),"-"===t[9]&&(d=-d)),l=new Date(Date.UTC(i,n,r,o,a,s,c)),d&&l.setTime(l.getTime()-d),l},instanceOf:Date,represent:function(e){return e.toISOString()}});var Be=new Ce("tag:yaml.org,2002:merge",{kind:"scalar",resolve:function(e){return"<<"===e||null===e}}),He="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";var We=new Ce("tag:yaml.org,2002:binary",{kind:"scalar",resolve:function(e){if(null===e)return!1;var t,i,n=0,r=e.length,o=He;for(i=0;i<r;i++)if(!((t=o.indexOf(e.charAt(i)))>64)){if(t<0)return!1;n+=6}return n%8==0},construct:function(e){var t,i,n=e.replace(/[\r\n=]/g,""),r=n.length,o=He,a=0,s=[];for(t=0;t<r;t++)t%4==0&&t&&(s.push(a>>16&255),s.push(a>>8&255),s.push(255&a)),a=a<<6|o.indexOf(n.charAt(t));return 0===(i=r%4*6)?(s.push(a>>16&255),s.push(a>>8&255),s.push(255&a)):18===i?(s.push(a>>10&255),s.push(a>>2&255)):12===i&&s.push(a>>4&255),new Uint8Array(s)},predicate:function(e){return"[object Uint8Array]"===Object.prototype.toString.call(e)},represent:function(e){var t,i,n="",r=0,o=e.length,a=He;for(t=0;t<o;t++)t%3==0&&t&&(n+=a[r>>18&63],n+=a[r>>12&63],n+=a[r>>6&63],n+=a[63&r]),r=(r<<8)+e[t];return 0===(i=o%3)?(n+=a[r>>18&63],n+=a[r>>12&63],n+=a[r>>6&63],n+=a[63&r]):2===i?(n+=a[r>>10&63],n+=a[r>>4&63],n+=a[r<<2&63],n+=a[64]):1===i&&(n+=a[r>>2&63],n+=a[r<<4&63],n+=a[64],n+=a[64]),n}}),qe=Object.prototype.hasOwnProperty,Ke=Object.prototype.toString;var Ge=new Ce("tag:yaml.org,2002:omap",{kind:"sequence",resolve:function(e){if(null===e)return!0;var t,i,n,r,o,a=[],s=e;for(t=0,i=s.length;t<i;t+=1){if(n=s[t],o=!1,"[object Object]"!==Ke.call(n))return!1;for(r in n)if(qe.call(n,r)){if(o)return!1;o=!0}if(!o)return!1;if(-1!==a.indexOf(r))return!1;a.push(r)}return!0},construct:function(e){return null!==e?e:[]}}),Ve=Object.prototype.toString;var Je=new Ce("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:function(e){if(null===e)return!0;var t,i,n,r,o,a=e;for(o=new Array(a.length),t=0,i=a.length;t<i;t+=1){if(n=a[t],"[object Object]"!==Ve.call(n))return!1;if(1!==(r=Object.keys(n)).length)return!1;o[t]=[r[0],n[r[0]]]}return!0},construct:function(e){if(null===e)return[];var t,i,n,r,o,a=e;for(o=new Array(a.length),t=0,i=a.length;t<i;t+=1)n=a[t],r=Object.keys(n),o[t]=[r[0],n[r[0]]];return o}}),Xe=Object.prototype.hasOwnProperty;var Ze=new Ce("tag:yaml.org,2002:set",{kind:"mapping",resolve:function(e){if(null===e)return!0;var t,i=e;for(t in i)if(Xe.call(i,t)&&null!==i[t])return!1;return!0},construct:function(e){return null!==e?e:{}}}),Qe=Pe.extend({implicit:[ze,Be],explicit:[We,Ge,Je,Ze]}),et=Object.prototype.hasOwnProperty,tt=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,it=/[\x85\u2028\u2029]/,nt=/[,\[\]\{\}]/,rt=/^(?:!|!!|![a-z\-]+!)$/i,ot=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function at(e){return Object.prototype.toString.call(e)}function st(e){return 10===e||13===e}function lt(e){return 9===e||32===e}function ct(e){return 9===e||32===e||10===e||13===e}function dt(e){return 44===e||91===e||93===e||123===e||125===e}function pt(e){var t;return 48<=e&&e<=57?e-48:97<=(t=32|e)&&t<=102?t-97+10:-1}function ht(e){return 120===e?2:117===e?4:85===e?8:0}function ut(e){return 48<=e&&e<=57?e-48:-1}function ft(e){return 48===e?"\0":97===e?"":98===e?"\b":116===e||9===e?"\t":110===e?"\n":118===e?"\v":102===e?"\f":114===e?"\r":101===e?"":32===e?" ":34===e?'"':47===e?"/":92===e?"\\":78===e?"":95===e?" ":76===e?"\u2028":80===e?"\u2029":""}function mt(e){return e<=65535?String.fromCharCode(e):String.fromCharCode(55296+(e-65536>>10),56320+(e-65536&1023))}function gt(e,t,i){"__proto__"===t?Object.defineProperty(e,t,{configurable:!0,enumerable:!0,writable:!0,value:i}):e[t]=i}for(var vt=new Array(256),_t=new Array(256),yt=0;yt<256;yt++)vt[yt]=ft(yt)?1:0,_t[yt]=ft(yt);function bt(e,t){this.input=e,this.filename=t.filename||null,this.schema=t.schema||Qe,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.json=t.json||!1,this.listener=t.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function $t(e,t){var i={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return i.snippet=Ae(i),new be(t,i)}function xt(e,t){throw $t(e,t)}function At(e,t){e.onWarning&&e.onWarning.call(null,$t(e,t))}var wt={YAML:function(e,t,i){var n,r,o;null!==e.version&&xt(e,"duplication of %YAML directive"),1!==i.length&&xt(e,"YAML directive accepts exactly one argument"),null===(n=/^([0-9]+)\.([0-9]+)$/.exec(i[0]))&&xt(e,"ill-formed argument of the YAML directive"),r=parseInt(n[1],10),o=parseInt(n[2],10),1!==r&&xt(e,"unacceptable YAML version of the document"),e.version=i[0],e.checkLineBreaks=o<2,1!==o&&2!==o&&At(e,"unsupported YAML version of the document")},TAG:function(e,t,i){var n,r;2!==i.length&&xt(e,"TAG directive accepts exactly two arguments"),n=i[0],r=i[1],rt.test(n)||xt(e,"ill-formed tag handle (first argument) of the TAG directive"),et.call(e.tagMap,n)&&xt(e,'there is a previously declared suffix for "'+n+'" tag handle'),ot.test(r)||xt(e,"ill-formed tag prefix (second argument) of the TAG directive");try{r=decodeURIComponent(r)}catch(t){xt(e,"tag prefix is malformed: "+r)}e.tagMap[n]=r}};function kt(e,t,i,n){var r,o,a,s;if(t<i){if(s=e.input.slice(t,i),n)for(r=0,o=s.length;r<o;r+=1)9===(a=s.charCodeAt(r))||32<=a&&a<=1114111||xt(e,"expected valid JSON character");else tt.test(s)&&xt(e,"the stream contains non-printable characters");e.result+=s}}function Ct(e,t,i,n){var r,o,a,s;for(ve.isObject(i)||xt(e,"cannot merge mappings; the provided source object is unacceptable"),a=0,s=(r=Object.keys(i)).length;a<s;a+=1)o=r[a],et.call(t,o)||(gt(t,o,i[o]),n[o]=!0)}function St(e,t,i,n,r,o,a,s,l){var c,d;if(Array.isArray(r))for(c=0,d=(r=Array.prototype.slice.call(r)).length;c<d;c+=1)Array.isArray(r[c])&&xt(e,"nested arrays are not supported inside keys"),"object"==typeof r&&"[object Object]"===at(r[c])&&(r[c]="[object Object]");if("object"==typeof r&&"[object Object]"===at(r)&&(r="[object Object]"),r=String(r),null===t&&(t={}),"tag:yaml.org,2002:merge"===n)if(Array.isArray(o))for(c=0,d=o.length;c<d;c+=1)Ct(e,t,o[c],i);else Ct(e,t,o,i);else e.json||et.call(i,r)||!et.call(t,r)||(e.line=a||e.line,e.lineStart=s||e.lineStart,e.position=l||e.position,xt(e,"duplicated mapping key")),gt(t,r,o),delete i[r];return t}function Et(e){var t;10===(t=e.input.charCodeAt(e.position))?e.position++:13===t?(e.position++,10===e.input.charCodeAt(e.position)&&e.position++):xt(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function Dt(e,t,i){for(var n=0,r=e.input.charCodeAt(e.position);0!==r;){for(;lt(r);)9===r&&-1===e.firstTabInLine&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(t&&35===r)do{r=e.input.charCodeAt(++e.position)}while(10!==r&&13!==r&&0!==r);if(!st(r))break;for(Et(e),r=e.input.charCodeAt(e.position),n++,e.lineIndent=0;32===r;)e.lineIndent++,r=e.input.charCodeAt(++e.position)}return-1!==i&&0!==n&&e.lineIndent<i&&At(e,"deficient indentation"),n}function It(e){var t,i=e.position;return!(45!==(t=e.input.charCodeAt(i))&&46!==t||t!==e.input.charCodeAt(i+1)||t!==e.input.charCodeAt(i+2)||(i+=3,0!==(t=e.input.charCodeAt(i))&&!ct(t)))}function Tt(e,t){1===t?e.result+=" ":t>1&&(e.result+=ve.repeat("\n",t-1))}function Nt(e,t){var i,n,r=e.tag,o=e.anchor,a=[],s=!1;if(-1!==e.firstTabInLine)return!1;for(null!==e.anchor&&(e.anchorMap[e.anchor]=a),n=e.input.charCodeAt(e.position);0!==n&&(-1!==e.firstTabInLine&&(e.position=e.firstTabInLine,xt(e,"tab characters must not be used in indentation")),45===n)&&ct(e.input.charCodeAt(e.position+1));)if(s=!0,e.position++,Dt(e,!0,-1)&&e.lineIndent<=t)a.push(null),n=e.input.charCodeAt(e.position);else if(i=e.line,Lt(e,t,3,!1,!0),a.push(e.result),Dt(e,!0,-1),n=e.input.charCodeAt(e.position),(e.line===i||e.lineIndent>t)&&0!==n)xt(e,"bad indentation of a sequence entry");else if(e.lineIndent<t)break;return!!s&&(e.tag=r,e.anchor=o,e.kind="sequence",e.result=a,!0)}function Ut(e){var t,i,n,r,o=!1,a=!1;if(33!==(r=e.input.charCodeAt(e.position)))return!1;if(null!==e.tag&&xt(e,"duplication of a tag property"),60===(r=e.input.charCodeAt(++e.position))?(o=!0,r=e.input.charCodeAt(++e.position)):33===r?(a=!0,i="!!",r=e.input.charCodeAt(++e.position)):i="!",t=e.position,o){do{r=e.input.charCodeAt(++e.position)}while(0!==r&&62!==r);e.position<e.length?(n=e.input.slice(t,e.position),r=e.input.charCodeAt(++e.position)):xt(e,"unexpected end of the stream within a verbatim tag")}else{for(;0!==r&&!ct(r);)33===r&&(a?xt(e,"tag suffix cannot contain exclamation marks"):(i=e.input.slice(t-1,e.position+1),rt.test(i)||xt(e,"named tag handle cannot contain such characters"),a=!0,t=e.position+1)),r=e.input.charCodeAt(++e.position);n=e.input.slice(t,e.position),nt.test(n)&&xt(e,"tag suffix cannot contain flow indicator characters")}n&&!ot.test(n)&&xt(e,"tag name cannot contain such characters: "+n);try{n=decodeURIComponent(n)}catch(t){xt(e,"tag name is malformed: "+n)}return o?e.tag=n:et.call(e.tagMap,i)?e.tag=e.tagMap[i]+n:"!"===i?e.tag="!"+n:"!!"===i?e.tag="tag:yaml.org,2002:"+n:xt(e,'undeclared tag handle "'+i+'"'),!0}function Ot(e){var t,i;if(38!==(i=e.input.charCodeAt(e.position)))return!1;for(null!==e.anchor&&xt(e,"duplication of an anchor property"),i=e.input.charCodeAt(++e.position),t=e.position;0!==i&&!ct(i)&&!dt(i);)i=e.input.charCodeAt(++e.position);return e.position===t&&xt(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(t,e.position),!0}function Lt(e,t,i,n,r){var o,a,s,l,c,d,p,h,u,f=1,m=!1,g=!1;if(null!==e.listener&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,o=a=s=4===i||3===i,n&&Dt(e,!0,-1)&&(m=!0,e.lineIndent>t?f=1:e.lineIndent===t?f=0:e.lineIndent<t&&(f=-1)),1===f)for(;Ut(e)||Ot(e);)Dt(e,!0,-1)?(m=!0,s=o,e.lineIndent>t?f=1:e.lineIndent===t?f=0:e.lineIndent<t&&(f=-1)):s=!1;if(s&&(s=m||r),1!==f&&4!==i||(h=1===i||2===i?t:t+1,u=e.position-e.lineStart,1===f?s&&(Nt(e,u)||function(e,t,i){var n,r,o,a,s,l,c,d=e.tag,p=e.anchor,h={},u=Object.create(null),f=null,m=null,g=null,v=!1,_=!1;if(-1!==e.firstTabInLine)return!1;for(null!==e.anchor&&(e.anchorMap[e.anchor]=h),c=e.input.charCodeAt(e.position);0!==c;){if(v||-1===e.firstTabInLine||(e.position=e.firstTabInLine,xt(e,"tab characters must not be used in indentation")),n=e.input.charCodeAt(e.position+1),o=e.line,63!==c&&58!==c||!ct(n)){if(a=e.line,s=e.lineStart,l=e.position,!Lt(e,i,2,!1,!0))break;if(e.line===o){for(c=e.input.charCodeAt(e.position);lt(c);)c=e.input.charCodeAt(++e.position);if(58===c)ct(c=e.input.charCodeAt(++e.position))||xt(e,"a whitespace character is expected after the key-value separator within a block mapping"),v&&(St(e,h,u,f,m,null,a,s,l),f=m=g=null),_=!0,v=!1,r=!1,f=e.tag,m=e.result;else{if(!_)return e.tag=d,e.anchor=p,!0;xt(e,"can not read an implicit mapping pair; a colon is missed")}}else{if(!_)return e.tag=d,e.anchor=p,!0;xt(e,"can not read a block mapping entry; a multiline key may not be an implicit key")}}else 63===c?(v&&(St(e,h,u,f,m,null,a,s,l),f=m=g=null),_=!0,v=!0,r=!0):v?(v=!1,r=!0):xt(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,c=n;if((e.line===o||e.lineIndent>t)&&(v&&(a=e.line,s=e.lineStart,l=e.position),Lt(e,t,4,!0,r)&&(v?m=e.result:g=e.result),v||(St(e,h,u,f,m,g,a,s,l),f=m=g=null),Dt(e,!0,-1),c=e.input.charCodeAt(e.position)),(e.line===o||e.lineIndent>t)&&0!==c)xt(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return v&&St(e,h,u,f,m,null,a,s,l),_&&(e.tag=d,e.anchor=p,e.kind="mapping",e.result=h),_}(e,u,h))||function(e,t){var i,n,r,o,a,s,l,c,d,p,h,u,f=!0,m=e.tag,g=e.anchor,v=Object.create(null);if(91===(u=e.input.charCodeAt(e.position)))a=93,c=!1,o=[];else{if(123!==u)return!1;a=125,c=!0,o={}}for(null!==e.anchor&&(e.anchorMap[e.anchor]=o),u=e.input.charCodeAt(++e.position);0!==u;){if(Dt(e,!0,t),(u=e.input.charCodeAt(e.position))===a)return e.position++,e.tag=m,e.anchor=g,e.kind=c?"mapping":"sequence",e.result=o,!0;f?44===u&&xt(e,"expected the node content, but found ','"):xt(e,"missed comma between flow collection entries"),h=null,s=l=!1,63===u&&ct(e.input.charCodeAt(e.position+1))&&(s=l=!0,e.position++,Dt(e,!0,t)),i=e.line,n=e.lineStart,r=e.position,Lt(e,t,1,!1,!0),p=e.tag,d=e.result,Dt(e,!0,t),u=e.input.charCodeAt(e.position),!l&&e.line!==i||58!==u||(s=!0,u=e.input.charCodeAt(++e.position),Dt(e,!0,t),Lt(e,t,1,!1,!0),h=e.result),c?St(e,o,v,p,d,h,i,n,r):s?o.push(St(e,null,v,p,d,h,i,n,r)):o.push(d),Dt(e,!0,t),44===(u=e.input.charCodeAt(e.position))?(f=!0,u=e.input.charCodeAt(++e.position)):f=!1}xt(e,"unexpected end of the stream within a flow collection")}(e,h)?g=!0:(a&&function(e,t){var i,n,r,o,a=1,s=!1,l=!1,c=t,d=0,p=!1;if(124===(o=e.input.charCodeAt(e.position)))n=!1;else{if(62!==o)return!1;n=!0}for(e.kind="scalar",e.result="";0!==o;)if(43===(o=e.input.charCodeAt(++e.position))||45===o)1===a?a=43===o?3:2:xt(e,"repeat of a chomping mode identifier");else{if(!((r=ut(o))>=0))break;0===r?xt(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):l?xt(e,"repeat of an indentation width identifier"):(c=t+r-1,l=!0)}if(lt(o)){do{o=e.input.charCodeAt(++e.position)}while(lt(o));if(35===o)do{o=e.input.charCodeAt(++e.position)}while(!st(o)&&0!==o)}for(;0!==o;){for(Et(e),e.lineIndent=0,o=e.input.charCodeAt(e.position);(!l||e.lineIndent<c)&&32===o;)e.lineIndent++,o=e.input.charCodeAt(++e.position);if(!l&&e.lineIndent>c&&(c=e.lineIndent),st(o))d++;else{if(e.lineIndent<c){3===a?e.result+=ve.repeat("\n",s?1+d:d):1===a&&s&&(e.result+="\n");break}for(n?lt(o)?(p=!0,e.result+=ve.repeat("\n",s?1+d:d)):p?(p=!1,e.result+=ve.repeat("\n",d+1)):0===d?s&&(e.result+=" "):e.result+=ve.repeat("\n",d):e.result+=ve.repeat("\n",s?1+d:d),s=!0,l=!0,d=0,i=e.position;!st(o)&&0!==o;)o=e.input.charCodeAt(++e.position);kt(e,i,e.position,!1)}}return!0}(e,h)||function(e,t){var i,n,r;if(39!==(i=e.input.charCodeAt(e.position)))return!1;for(e.kind="scalar",e.result="",e.position++,n=r=e.position;0!==(i=e.input.charCodeAt(e.position));)if(39===i){if(kt(e,n,e.position,!0),39!==(i=e.input.charCodeAt(++e.position)))return!0;n=e.position,e.position++,r=e.position}else st(i)?(kt(e,n,r,!0),Tt(e,Dt(e,!1,t)),n=r=e.position):e.position===e.lineStart&&It(e)?xt(e,"unexpected end of the document within a single quoted scalar"):(e.position++,r=e.position);xt(e,"unexpected end of the stream within a single quoted scalar")}(e,h)||function(e,t){var i,n,r,o,a,s;if(34!==(s=e.input.charCodeAt(e.position)))return!1;for(e.kind="scalar",e.result="",e.position++,i=n=e.position;0!==(s=e.input.charCodeAt(e.position));){if(34===s)return kt(e,i,e.position,!0),e.position++,!0;if(92===s){if(kt(e,i,e.position,!0),st(s=e.input.charCodeAt(++e.position)))Dt(e,!1,t);else if(s<256&&vt[s])e.result+=_t[s],e.position++;else if((a=ht(s))>0){for(r=a,o=0;r>0;r--)(a=pt(s=e.input.charCodeAt(++e.position)))>=0?o=(o<<4)+a:xt(e,"expected hexadecimal character");e.result+=mt(o),e.position++}else xt(e,"unknown escape sequence");i=n=e.position}else st(s)?(kt(e,i,n,!0),Tt(e,Dt(e,!1,t)),i=n=e.position):e.position===e.lineStart&&It(e)?xt(e,"unexpected end of the document within a double quoted scalar"):(e.position++,n=e.position)}xt(e,"unexpected end of the stream within a double quoted scalar")}(e,h)?g=!0:!function(e){var t,i,n;if(42!==(n=e.input.charCodeAt(e.position)))return!1;for(n=e.input.charCodeAt(++e.position),t=e.position;0!==n&&!ct(n)&&!dt(n);)n=e.input.charCodeAt(++e.position);return e.position===t&&xt(e,"name of an alias node must contain at least one character"),i=e.input.slice(t,e.position),et.call(e.anchorMap,i)||xt(e,'unidentified alias "'+i+'"'),e.result=e.anchorMap[i],Dt(e,!0,-1),!0}(e)?function(e,t,i){var n,r,o,a,s,l,c,d,p=e.kind,h=e.result;if(ct(d=e.input.charCodeAt(e.position))||dt(d)||35===d||38===d||42===d||33===d||124===d||62===d||39===d||34===d||37===d||64===d||96===d)return!1;if((63===d||45===d)&&(ct(n=e.input.charCodeAt(e.position+1))||i&&dt(n)))return!1;for(e.kind="scalar",e.result="",r=o=e.position,a=!1;0!==d;){if(58===d){if(ct(n=e.input.charCodeAt(e.position+1))||i&&dt(n))break}else if(35===d){if(ct(e.input.charCodeAt(e.position-1)))break}else{if(e.position===e.lineStart&&It(e)||i&&dt(d))break;if(st(d)){if(s=e.line,l=e.lineStart,c=e.lineIndent,Dt(e,!1,-1),e.lineIndent>=t){a=!0,d=e.input.charCodeAt(e.position);continue}e.position=o,e.line=s,e.lineStart=l,e.lineIndent=c;break}}a&&(kt(e,r,o,!1),Tt(e,e.line-s),r=o=e.position,a=!1),lt(d)||(o=e.position+1),d=e.input.charCodeAt(++e.position)}return kt(e,r,o,!1),!!e.result||(e.kind=p,e.result=h,!1)}(e,h,1===i)&&(g=!0,null===e.tag&&(e.tag="?")):(g=!0,null===e.tag&&null===e.anchor||xt(e,"alias node should not have any properties")),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):0===f&&(g=s&&Nt(e,u))),null===e.tag)null!==e.anchor&&(e.anchorMap[e.anchor]=e.result);else if("?"===e.tag){for(null!==e.result&&"scalar"!==e.kind&&xt(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),l=0,c=e.implicitTypes.length;l<c;l+=1)if((p=e.implicitTypes[l]).resolve(e.result)){e.result=p.construct(e.result),e.tag=p.tag,null!==e.anchor&&(e.anchorMap[e.anchor]=e.result);break}}else if("!"!==e.tag){if(et.call(e.typeMap[e.kind||"fallback"],e.tag))p=e.typeMap[e.kind||"fallback"][e.tag];else for(p=null,l=0,c=(d=e.typeMap.multi[e.kind||"fallback"]).length;l<c;l+=1)if(e.tag.slice(0,d[l].tag.length)===d[l].tag){p=d[l];break}p||xt(e,"unknown tag !<"+e.tag+">"),null!==e.result&&p.kind!==e.kind&&xt(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+p.kind+'", not "'+e.kind+'"'),p.resolve(e.result,e.tag)?(e.result=p.construct(e.result,e.tag),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):xt(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return null!==e.listener&&e.listener("close",e),null!==e.tag||null!==e.anchor||g}function Mt(e){var t,i,n,r,o=e.position,a=!1;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);0!==(r=e.input.charCodeAt(e.position))&&(Dt(e,!0,-1),r=e.input.charCodeAt(e.position),!(e.lineIndent>0||37!==r));){for(a=!0,r=e.input.charCodeAt(++e.position),t=e.position;0!==r&&!ct(r);)r=e.input.charCodeAt(++e.position);for(n=[],(i=e.input.slice(t,e.position)).length<1&&xt(e,"directive name must not be less than one character in length");0!==r;){for(;lt(r);)r=e.input.charCodeAt(++e.position);if(35===r){do{r=e.input.charCodeAt(++e.position)}while(0!==r&&!st(r));break}if(st(r))break;for(t=e.position;0!==r&&!ct(r);)r=e.input.charCodeAt(++e.position);n.push(e.input.slice(t,e.position))}0!==r&&Et(e),et.call(wt,i)?wt[i](e,i,n):At(e,'unknown document directive "'+i+'"')}Dt(e,!0,-1),0===e.lineIndent&&45===e.input.charCodeAt(e.position)&&45===e.input.charCodeAt(e.position+1)&&45===e.input.charCodeAt(e.position+2)?(e.position+=3,Dt(e,!0,-1)):a&&xt(e,"directives end mark is expected"),Lt(e,e.lineIndent-1,4,!1,!0),Dt(e,!0,-1),e.checkLineBreaks&&it.test(e.input.slice(o,e.position))&&At(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&It(e)?46===e.input.charCodeAt(e.position)&&(e.position+=3,Dt(e,!0,-1)):e.position<e.length-1&&xt(e,"end of the stream or a document separator is expected")}var jt={load:function(e,t){var i=function(e,t){t=t||{},0!==(e=String(e)).length&&(10!==e.charCodeAt(e.length-1)&&13!==e.charCodeAt(e.length-1)&&(e+="\n"),65279===e.charCodeAt(0)&&(e=e.slice(1)));var i=new bt(e,t),n=e.indexOf("\0");for(-1!==n&&(i.position=n,xt(i,"null byte is not allowed in input")),i.input+="\0";32===i.input.charCodeAt(i.position);)i.lineIndent+=1,i.position+=1;for(;i.position<i.length-1;)Mt(i);return i.documents}(e,t);if(0!==i.length){if(1===i.length)return i[0];throw new be("expected a single document in the stream, but found more")}}}.load;const Ft=(e,t,i)=>{e.push(`${(e=>"  ".repeat(e))(t)}${i}`)},Pt=(e,t,i,n)=>{null!=n&&""!==n&&Ft(e,t,`${i}: ${n}`)},Yt=(e,t)=>{Ft(e,5,`- channel: ${t.channel}`),Ft(e,6,`name: ${t.name}`),Pt(e,6,"type",t.type),Pt(e,6,"transition",t.transition),Pt(e,6,"output_correction",t.output_correction),Pt(e,6,"channel_size",t.channel_size),Pt(e,6,"byte_order",t.byte_order),Pt(e,6,"min_temp",t.min_temp),Pt(e,6,"max_temp",t.max_temp),((e,t,i)=>{if(null!=i)Array.isArray(i)?(Ft(e,t,"channel_setup:"),i.forEach(i=>{Ft(e,t+1,`- ${i}`)})):Ft(e,t,`channel_setup: ${i}`)})(e,6,t.channel_setup)},Rt=(e,t)=>{Ft(e,1,"- platform: artnet_led"),Ft(e,2,`host: ${t.host}`),Pt(e,2,"port",t.port),Pt(e,2,"max_fps",t.max_fps),Pt(e,2,"refresh_every",t.refresh_every),Pt(e,2,"node_type",t.node_type),Ft(e,2,"universes:"),t.universes.forEach(t=>((e,t)=>{Ft(e,4,`${t.id}:`),Pt(e,5,"send_partial_universe",t.send_partial_universe),Pt(e,5,"output_correction",t.output_correction),Ft(e,5,"devices:"),t.devices.forEach(t=>Yt(e,t))})(e,t))},zt=e=>{const t=[];return Ft(t,0,"light:"),e.nodes.forEach(e=>Rt(t,e)),t.join("\n")},Bt=(e,t=void 0)=>{if(null==e||""===e)return t;const i=Number(e);return Number.isFinite(i)?i:t},Ht=(e,t)=>{const i=Array.isArray(t.devices)?t.devices.map(e=>(e=>({channel:Bt(e.channel,1)??1,name:String(e.name??""),type:e.type?String(e.type):void 0,transition:Bt(e.transition),output_correction:e.output_correction?String(e.output_correction):void 0,channel_size:e.channel_size?String(e.channel_size):void 0,channel_setup:e.channel_setup,byte_order:e.byte_order?String(e.byte_order):void 0,min_temp:e.min_temp?String(e.min_temp):void 0,max_temp:e.max_temp?String(e.max_temp):void 0}))(e)):[];return{id:e,send_partial_universe:void 0!==t.send_partial_universe?Boolean(t.send_partial_universe):void 0,output_correction:t.output_correction?String(t.output_correction):void 0,devices:i}},Wt=e=>{if(!e.trim())return{...ue,nodes:[]};const t=jt(e),i=t?.light;if(!Array.isArray(i))return{...ue,nodes:[]};const n=i.filter(e=>!e.platform||"artnet_led"===e.platform).map(e=>(e=>{const t=e.universes??{},i=Array.isArray(t)?t.map((e,t)=>Ht(Bt(e.id,t)??t,e)):Object.entries(t).map(([e,t])=>Ht(Bt(e,0)??0,t??{}));return{host:String(e.host??""),port:Bt(e.port),max_fps:Bt(e.max_fps),refresh_every:Bt(e.refresh_every),node_type:e.node_type?String(e.node_type):void 0,universes:i}})(e));return{type:ue.type,title:"",nodes:n}},qt={type:"ha_artnet_led_uiconfig",title:"Artnet LED Example",nodes:[{host:"192.168.0.10",max_fps:25,refresh_every:0,node_type:"artnet-direct",universes:[{id:0,send_partial_universe:!0,output_correction:"quadratic",devices:[{channel:1,name:"my_dimmer",type:"dimmer",transition:1,output_correction:"quadratic",channel_size:"16bit"},{channel:3,name:"my_rgb_lamp",type:"rgb",transition:1,channel_size:"16bit",output_correction:"quadratic",channel_setup:"rbgw"},{channel:125,name:"my_color_temp_lamp",type:"color_temp",min_temp:"2500K",max_temp:"6500K",channel_setup:"ch"},{channel:41,name:"my_rgbww_lamp",type:"rgbww",transition:10},{channel:50,name:"sp4led_1_dimmer",type:"fixed",channel_setup:[255]}]}]}]},Kt=e=>JSON.parse(JSON.stringify(e)),Gt=(e,t)=>{const i=Number(e);return Number.isFinite(i)?i:t},Vt=[{key:"d",label:"d",descKey:"channelDimmer"},{key:"c",label:"c",descKey:"channelCoolScaled"},{key:"C",label:"C",descKey:"channelCoolUnscaled"},{key:"h",label:"h",descKey:"channelWarmScaled"},{key:"H",label:"H",descKey:"channelWarmUnscaled"},{key:"t",label:"t",descKey:"channelTempScaled"},{key:"T",label:"T",descKey:"channelTempUnscaled"},{key:"r",label:"r",descKey:"channelRedScaled"},{key:"R",label:"R",descKey:"channelRedUnscaled"},{key:"g",label:"g",descKey:"channelGreenScaled"},{key:"G",label:"G",descKey:"channelGreenUnscaled"},{key:"b",label:"b",descKey:"channelBlueScaled"},{key:"B",label:"B",descKey:"channelBlueUnscaled"},{key:"w",label:"w",descKey:"channelWhiteScaled"},{key:"W",label:"W",descKey:"channelWhiteUnscaled"},{key:"u",label:"u",descKey:"channelHue"},{key:"U",label:"U",descKey:"channelSaturation"},{key:"x",label:"x",descKey:"channelX"},{key:"y",label:"y",descKey:"channelY"}];class Jt extends se{constructor(){super(...arguments),this.compact=!1,this.hideYaml=!1,this._config=ue,this._showImport=!1,this._importYaml="",this._showChannelEditor=!1,this._channelDraft=[]}_lang(){return(this.hass?.language??navigator.language??"en").toLowerCase().startsWith("de")?"de":"en"}_t(e){return me[this._lang()][e]}updated(e){e.has("config")&&this.config&&this.setConfig(this.config)}setConfig(e){this._config={...ue,...e,nodes:e.nodes??[]}}_updateConfig(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_addNode(){const e=Kt(this._config);e.nodes.push({host:"",node_type:"artnet-direct",max_fps:25,refresh_every:0,universes:[]}),this._updateConfig(e)}_addUniverse(e){const t=Kt(this._config),i=t.nodes[e],n=i.universes.length?Math.max(...i.universes.map(e=>e.id))+1:0;i.universes.push({id:n,send_partial_universe:!0,devices:[]}),this._updateConfig(t)}_addDevice(e,t){const i=Kt(this._config);i.nodes[e].universes[t].devices.push({channel:1,name:"new_light",type:"dimmer"}),this._updateConfig(i)}_removeNode(e){const t=Kt(this._config);t.nodes.splice(e,1),this._updateConfig(t)}_removeUniverse(e,t){const i=Kt(this._config);i.nodes[e].universes.splice(t,1),this._updateConfig(i)}_removeDevice(e,t,i){const n=Kt(this._config);n.nodes[e].universes[t].devices.splice(i,1),this._updateConfig(n)}_updateNodeField(e,t,i){const n=Kt(this._config),r=n.nodes[e];r[t]="max_fps"===t||"refresh_every"===t||"port"===t?Gt(i,0):i,this._updateConfig(n)}_updateUniverseField(e,t,i,n){const r=Kt(this._config),o=r.nodes[e].universes[t];o[i]="id"===i?Gt(n,0):n,this._updateConfig(r)}_openDeviceEditor(e,t,i){const n=this._config.nodes[e].universes[t].devices[i];this._activeDevice={nodeIndex:e,universeIndex:t,deviceIndex:i,device:{...n}}}_closeDeviceEditor(){this._activeDevice=void 0}_saveDeviceEditor(){if(!this._activeDevice)return;const{nodeIndex:e,universeIndex:t,deviceIndex:i,device:n}=this._activeDevice,r=Kt(this._config);r.nodes[e].universes[t].devices[i]=n,this._updateConfig(r),this._activeDevice=void 0}_openChannelEditor(){var e;this._activeDevice&&(this._channelDraft=null==(e=this._activeDevice.device.channel_setup)||""===e?[]:Array.isArray(e)?[...e]:String(e).split("").map(e=>e.trim()).filter(Boolean),this._showChannelEditor=!0)}_closeChannelEditor(){this._showChannelEditor=!1,this._channelDragIndex=void 0}_addChannelToken(e){this._channelDraft=[...this._channelDraft,e]}_removeChannelToken(e){this._channelDraft=this._channelDraft.filter((t,i)=>i!==e)}_setChannelDraftValue(e){const t=Number(e);if(!Number.isFinite(t))return;const i=Math.min(255,Math.max(0,t));this._channelDraft=[...this._channelDraft,i]}_saveChannelEditor(){if(!this._activeDevice)return;const e={...this._activeDevice.device,channel_setup:this._channelDraft.length?[...this._channelDraft]:void 0};this._activeDevice={...this._activeDevice,device:e},this._showChannelEditor=!1}_onChannelDragStart(e,t){this._channelDragIndex=t,e.dataTransfer?.setData("text/plain",String(t))}_onChannelDragOver(e){e.preventDefault()}_onChannelDrop(e,t){e.preventDefault();const i=this._channelDragIndex;if(void 0===i||i===t)return void(this._channelDragIndex=void 0);const n=[...this._channelDraft],[r]=n.splice(i,1);n.splice(t,0,r),this._channelDraft=n,this._channelDragIndex=void 0}_updateDeviceField(e,t){if(!this._activeDevice)return;let i=t;"channel"!==e&&"transition"!==e||(i=Gt(t,0)),"channel_setup"===e&&(i=(e=>{const t=e.trim();if(!t)return;if(t.includes(","))return t.split(",").map(e=>e.trim()).filter(Boolean).map(e=>{const t=Number(e);return Number.isFinite(t)?t:e});const i=Number(t);return Number.isFinite(i)?[i]:t})(t)),this._activeDevice={...this._activeDevice,device:{...this._activeDevice.device,[e]:i}}}_copyYaml(){const e=zt(this._config);navigator.clipboard?.writeText(e)}_loadExample(){this._updateConfig(Kt(qt))}_clearAll(){this._updateConfig({...ue,nodes:[]})}_openImport(){this._showImport=!0,this._importYaml="",this._importError=void 0}_closeImport(){this._showImport=!1,this._importError=void 0}_applyImport(){try{const e=Wt(this._importYaml);this._updateConfig({...e,title:this._config.title??""}),this._showImport=!1}catch(e){this._importError=e instanceof Error?e.message:this._t("invalidYaml")}}_onDragStart(e,t,i,n){e.dataTransfer?.setData("text/plain","device"),this._dragging={nodeIndex:t,universeIndex:i,deviceIndex:n}}_onDragOver(e){e.preventDefault()}_onDrop(e,t,i,n){if(e.preventDefault(),!this._dragging)return;const r=this._dragging;if(r.nodeIndex!==t||r.universeIndex!==i)return void(this._dragging=void 0);const o=Kt(this._config),a=o.nodes[t].universes[i].devices,[s]=a.splice(r.deviceIndex,1);a.splice(n,0,s),this._dragging=void 0,this._updateConfig(o)}render(){return B`
      <section class="editor">
        <div class="toolbar${this.compact?" compact":""}">
          <div class="buttons">
            <button class="primary" @click=${this._addNode}>${this._t("addNode")}</button>
            <button @click=${this._openImport}>${this._t("importYaml")}</button>
            <button @click=${this._loadExample}>${this._t("loadExample")}</button>
            <button @click=${this._clearAll}>${this._t("clearAll")}</button>
          </div>
        </div>

        ${0===this._config.nodes.length?B`<div class="empty">${this._t("noNodes")}</div>`:this._config.nodes.map((e,t)=>this.renderNode(e,t))}

        ${this.hideYaml?null:B`
              <section class="yaml">
                <div class="yaml-header">
                  <div>
                    <div class="yaml-title">${this._t("yamlPreview")}</div>
                    <div class="yaml-subtitle">
                      ${this._t("yamlSubtitle")}
                    </div>
                  </div>
                  <button @click=${this._copyYaml}>${this._t("copyYaml")}</button>
                </div>
                <pre>${zt(this._config)}</pre>
              </section>
            `}
      </section>

      ${this._activeDevice?this.renderDeviceEditor(this._activeDevice):null}
      ${this._showImport?this.renderImportModal():null}
      ${this.renderChannelEditor()}
    `}renderNode(e,t){return B`
      <section class="node">
        <div class="node-header">
          <div class="node-title">${this._t("nodeTitle")} ${t+1}</div>
          <button class="danger" @click=${()=>this._removeNode(t)}>
            ${this._t("remove")}
          </button>
        </div>
        <div class="node-fields">
          <label>
            ${this._t("hostIp")}
            <input
              type="text"
              .value=${e.host}
              @input=${e=>this._updateNodeField(t,"host",e.target.value)}
              placeholder="192.168.0.10"
            />
          </label>
          <label>
            ${this._t("nodeType")}
            <select
              .value=${e.node_type??"artnet-direct"}
              @change=${e=>this._updateNodeField(t,"node_type",e.target.value)}
            >
              <option value="artnet-direct">artnet-direct</option>
              <option value="artnet-controller">artnet-controller</option>
              <option value="sacn">sacn</option>
              <option value="kinet">kinet</option>
            </select>
          </label>
          <label>
            ${this._t("maxFps")}
            <input
              type="number"
              .value=${String(e.max_fps??25)}
              @input=${e=>this._updateNodeField(t,"max_fps",e.target.value)}
            />
          </label>
          <label>
            ${this._t("refresh")}
            <input
              type="number"
              .value=${String(e.refresh_every??0)}
              @input=${e=>this._updateNodeField(t,"refresh_every",e.target.value)}
            />
          </label>
        </div>

        <div class="universes">
          <div class="universe-header">
            <div>${this._t("universes")}</div>
            <button @click=${()=>this._addUniverse(t)}>${this._t("addUniverse")}</button>
          </div>
          ${0===e.universes.length?B`<div class="empty">${this._t("noUniverses")}</div>`:e.universes.map((e,i)=>this.renderUniverse(e,t,i))}
        </div>
      </section>
    `}renderUniverse(e,t,i){return B`
      <div class="universe">
        <div class="universe-title">
          <div>${this._t("universeTitle")} ${e.id}</div>
          <div class="universe-actions">
            <button @click=${()=>this._addDevice(t,i)}>
              ${this._t("addLamp")}
            </button>
            <button class="danger" @click=${()=>this._removeUniverse(t,i)}>
              ${this._t("remove")}
            </button>
          </div>
        </div>
        <div class="universe-fields">
          <label>
            ${this._t("universeId")}
            <input
              type="number"
              .value=${String(e.id)}
              @input=${e=>this._updateUniverseField(t,i,"id",e.target.value)}
            />
          </label>
          <label>
            ${this._t("outputCorrection")}
            <select
              .value=${e.output_correction??""}
              @change=${e=>this._updateUniverseField(t,i,"output_correction",e.target.value)}
            >
              <option value="">(default)</option>
              <option value="linear">linear</option>
              <option value="quadratic">quadratic</option>
              <option value="cubic">cubic</option>
              <option value="quadruple">quadruple</option>
            </select>
          </label>
        </div>
        <div class="devices">
          ${0===e.devices.length?B`<div class="empty">${this._t("noLamps")}</div>`:e.devices.map((e,n)=>this.renderDevice(e,t,i,n))}
        </div>
      </div>
    `}renderDevice(e,t,i,n){return B`
      <div
        class="device"
        draggable="true"
        @dragstart=${e=>this._onDragStart(e,t,i,n)}
        @dragover=${this._onDragOver}
        @drop=${e=>this._onDrop(e,t,i,n)}
      >
        <ha-icon class="device-icon" icon=${(e=>{switch(e){case"rgb":case"rgbw":case"rgbww":return"mdi:palette";case"color_temp":return"mdi:thermometer";case"fixed":return"mdi:lightbulb";case"binary":return"mdi:toggle-switch";case"dimmer":return"mdi:brightness-6";default:return"mdi:lightbulb-outline"}})(e.type)}></ha-icon>
        <div class="device-info" @click=${()=>this._openDeviceEditor(t,i,n)}>
          <div class="device-name">${e.name}</div>
          <div class="device-meta">Ch ${e.channel} · ${e.type??"dimmer"}</div>
        </div>
        <button class="danger" @click=${()=>this._removeDevice(t,i,n)}>
          ✕
        </button>
      </div>
    `}renderImportModal(){return B`
      <div class="overlay" @click=${this._closeImport}>
        <div class="modal" @click=${e=>e.stopPropagation()}>
          <div class="modal-header">
            <div>
              <div class="modal-title">${this._t("yamlImportTitle")}</div>
              <div class="modal-subtitle">${this._t("yamlImportSubtitle")}</div>
            </div>
            <button class="danger" @click=${this._closeImport}>${this._t("close")}</button>
          </div>
          <textarea
            class="yaml-input"
            .value=${this._importYaml}
            @input=${e=>this._importYaml=e.target.value}
            placeholder="light:\n  - platform: artnet_led\n    host: 192.168.0.10\n    universes:"
          ></textarea>
          ${this._importError?B`<div class="error">${this._importError}</div>`:null}
          <div class="modal-actions">
            <button class="primary" @click=${this._applyImport}>${this._t("importAction")}</button>
            <button @click=${this._closeImport}>${this._t("cancel")}</button>
          </div>
        </div>
      </div>
    `}renderDeviceEditor(e){const t=e.device;return B`
      <div class="overlay" @click=${this._closeDeviceEditor}>
        <div class="modal" @click=${e=>e.stopPropagation()}>
          <div class="modal-header">
            <div>
              <div class="modal-title">${this._t("editLamp")}</div>
              <div class="modal-subtitle">${this._t("universeTitle")} ${e.universeIndex+1}</div>
            </div>
            <button class="danger" @click=${this._closeDeviceEditor}>${this._t("close")}</button>
          </div>
          <div class="modal-grid">
            <label>
              ${this._t("name")}
              <input
                type="text"
                .value=${t.name}
                @input=${e=>this._updateDeviceField("name",e.target.value)}
              />
            </label>
            <label>
              ${this._t("channel")}
              <input
                type="number"
                .value=${String(t.channel)}
                @input=${e=>this._updateDeviceField("channel",e.target.value)}
              />
            </label>
            <label>
              ${this._t("type")}
              <select
                .value=${t.type??"dimmer"}
                @change=${e=>this._updateDeviceField("type",e.target.value)}
              >
                <option value="fixed">fixed</option>
                <option value="binary">binary</option>
                <option value="dimmer">dimmer</option>
                <option value="rgb">rgb</option>
                <option value="rgbw">rgbw</option>
                <option value="rgbww">rgbww</option>
                <option value="color_temp">color_temp</option>
              </select>
            </label>
            <label>
              ${this._t("transition")}
              <input
                type="number"
                .value=${String(t.transition??0)}
                @input=${e=>this._updateDeviceField("transition",e.target.value)}
              />
            </label>
            <label>
              ${this._t("outputCorrection")}
              <select
                .value=${t.output_correction??""}
                @change=${e=>this._updateDeviceField("output_correction",e.target.value)}
              >
                <option value="">(default)</option>
                <option value="linear">linear</option>
                <option value="quadratic">quadratic</option>
                <option value="cubic">cubic</option>
                <option value="quadruple">quadruple</option>
              </select>
            </label>
            <label>
              ${this._t("channelSize")}
              <select
                .value=${t.channel_size??""}
                @change=${e=>this._updateDeviceField("channel_size",e.target.value)}
              >
                <option value="">(default)</option>
                <option value="8bit">8bit</option>
                <option value="16bit">16bit</option>
                <option value="24bit">24bit</option>
                <option value="32bit">32bit</option>
              </select>
            </label>
            <label>
              ${this._t("channelSetup")}
              <input
                type="text"
                .value=${Array.isArray(t.channel_setup)?t.channel_setup.join(","):t.channel_setup??""}
                @input=${e=>this._updateDeviceField("channel_setup",e.target.value)}
                placeholder=${"de"===this._lang()?"rbgw oder 255":"rgbw or 255"}
              />
            </label>
            <label>
              ${this._t("minTemp")}
              <input
                type="text"
                .value=${t.min_temp??""}
                @input=${e=>this._updateDeviceField("min_temp",e.target.value)}
                placeholder="2500K"
              />
            </label>
            <label>
              ${this._t("maxTemp")}
              <input
                type="text"
                .value=${t.max_temp??""}
                @input=${e=>this._updateDeviceField("max_temp",e.target.value)}
                placeholder="6500K"
              />
            </label>
          </div>
          <div class="modal-actions">
            <button class="ghost" @click=${this._openChannelEditor}>
              ${this._t("channelSetupEditor")}
            </button>
            <div class="modal-actions-right">
              <button class="primary" @click=${this._saveDeviceEditor}>${this._t("save")}</button>
              <button @click=${this._closeDeviceEditor}>${this._t("cancel")}</button>
            </div>
          </div>
        </div>
      </div>
    `}renderChannelEditor(){return this._showChannelEditor?B`
      <div class="overlay" @click=${this._closeChannelEditor}>
        <div class="modal channel-editor" @click=${e=>e.stopPropagation()}>
          <div class="modal-header">
            <div>
              <div class="modal-title">${this._t("channelEditorTitle")}</div>
              <div class="modal-subtitle">${this._t("channelEditorSubtitle")}</div>
            </div>
            <button class="danger" @click=${this._closeChannelEditor}>${this._t("close")}</button>
          </div>
          <div class="channel-editor-body">
            <div class="channel-palette">
              <div class="palette-title">${this._t("paletteTitle")}</div>
              <div class="palette-grid">
                ${Vt.map(e=>B`
                    <button
                      class="palette-item"
                      @click=${()=>this._addChannelToken(e.key)}
                      title=${this._t(e.descKey)}
                    >
                      <span class="palette-key">${e.label}</span>
                      <span class="palette-desc">
                        ${this._t(e.descKey)}
                      </span>
                    </button>
                  `)}
              </div>
              <div class="palette-static">
                <label>
                  ${this._t("staticValue")}
                  <input
                    type="number"
                    min="0"
                    max="255"
                    placeholder="128"
                    @change=${e=>this._setChannelDraftValue(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div class="channel-sequence" @dragover=${this._onChannelDragOver}>
              <div class="sequence-title">${this._t("channelOrder")}</div>
              ${0===this._channelDraft.length?B`<div class="empty">${this._t("noChannels")}</div>`:this._channelDraft.map((e,t)=>B`
                      <div
                        class="channel-token"
                        draggable="true"
                        @dragstart=${e=>this._onChannelDragStart(e,t)}
                        @drop=${e=>this._onChannelDrop(e,t)}
                      >
                        <span>${e}</span>
                        <button class="mini" @click=${()=>this._removeChannelToken(t)}>✕</button>
                      </div>
                    `)}
            </div>
          </div>
          <div class="modal-actions">
            <button class="primary" @click=${this._saveChannelEditor}>${this._t("apply")}</button>
            <button @click=${this._closeChannelEditor}>${this._t("cancel")}</button>
          </div>
        </div>
      </div>
    `:null}}Jt.styles=a`
    :host {
      display: block;
    }

    .editor {
      display: grid;
      gap: 18px;
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: flex-end;
      justify-content: space-between;
    }

    .toolbar.compact {
      align-items: center;
    }

    .field {
      display: grid;
      gap: 6px;
    }

    label {
      display: grid;
      gap: 6px;
      font-size: 0.85rem;
      color: var(--secondary-text-color, #8b8b8b);
    }

    input,
    select {
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid rgba(127, 127, 127, 0.25);
      background: rgba(255, 255, 255, 0.06);
      color: inherit;
    }

    button {
      border: none;
      padding: 8px 12px;
      border-radius: 10px;
      background: rgba(127, 127, 127, 0.2);
      color: inherit;
      cursor: pointer;
    }

    button.primary {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }

    button.danger {
      background: rgba(244, 67, 54, 0.18);
      color: #ff8a80;
    }

    .node {
      border-radius: 16px;
      padding: 16px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(127, 127, 127, 0.2);
      display: grid;
      gap: 14px;
    }

    .node-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .node-title {
      font-weight: 600;
    }

    .node-fields {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }

    .universes {
      display: grid;
      gap: 12px;
    }

    .universe {
      padding: 12px;
      border-radius: 14px;
      border: 1px solid rgba(127, 127, 127, 0.16);
      background: rgba(255, 255, 255, 0.03);
      display: grid;
      gap: 12px;
    }

    .universe-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
    }

    .universe-actions {
      display: flex;
      gap: 8px;
    }

    .universe-fields {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    }

    .devices {
      display: grid;
      gap: 10px;
    }

    .device {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 12px;
      align-items: center;
      padding: 10px 12px;
      border-radius: 12px;
      border: 1px solid rgba(127, 127, 127, 0.2);
      background: rgba(255, 255, 255, 0.05);
      cursor: grab;
    }

    .device-icon {
      font-size: 1.1rem;
      color: var(--secondary-text-color, #9aa0a6);
    }

    .device-info {
      cursor: pointer;
    }

    .device-name {
      font-weight: 600;
    }

    .device-meta {
      font-size: 0.8rem;
      opacity: 0.7;
    }

    .yaml {
      border-radius: 16px;
      border: 1px solid rgba(127, 127, 127, 0.2);
      background: rgba(255, 255, 255, 0.02);
      padding: 14px 16px;
      display: grid;
      gap: 12px;
    }

    .yaml-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .yaml-title {
      font-weight: 600;
    }

    .yaml-subtitle {
      font-size: 0.8rem;
      opacity: 0.7;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;
      font-size: 0.85rem;
      background: rgba(0, 0, 0, 0.2);
      padding: 12px;
      border-radius: 12px;
      max-height: 280px;
      overflow: auto;
    }

    .empty {
      padding: 12px;
      border: 1px dashed rgba(127, 127, 127, 0.3);
      border-radius: 12px;
      font-size: 0.85rem;
      opacity: 0.7;
      text-align: center;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }

    .modal {
      background: var(--card-background-color, #1f1f1f);
      padding: 20px;
      border-radius: 18px;
      min-width: min(680px, 90vw);
      display: grid;
      gap: 16px;
      border: 1px solid rgba(127, 127, 127, 0.2);
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-title {
      font-weight: 600;
      font-size: 1rem;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      opacity: 0.7;
    }

    .modal-grid {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }

    .modal-actions {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }

    .modal-actions-right {
      display: flex;
      gap: 10px;
    }

    .ghost {
      background: rgba(31, 41, 55, 0.8);
      color: inherit;
      border: 1px solid rgba(148, 163, 184, 0.25);
    }

    .channel-editor {
      max-width: 980px;
    }

    .channel-editor-body {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 16px;
    }

    .palette-title,
    .sequence-title {
      font-weight: 600;
      margin-bottom: 8px;
    }

    .palette-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 8px;
    }

    .palette-item {
      display: grid;
      gap: 2px;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      background: rgba(15, 23, 42, 0.8);
      color: inherit;
      text-align: left;
    }

    .palette-key {
      font-weight: 700;
      font-size: 0.9rem;
    }

    .palette-desc {
      font-size: 0.75rem;
      opacity: 0.7;
    }

    .palette-static {
      margin-top: 12px;
    }

    .channel-sequence {
      background: rgba(15, 23, 42, 0.6);
      border: 1px dashed rgba(148, 163, 184, 0.35);
      border-radius: 12px;
      padding: 12px;
      min-height: 200px;
    }

    .channel-token {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 10px;
      margin-bottom: 8px;
      border-radius: 10px;
      background: rgba(31, 41, 55, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.2);
      cursor: grab;
    }

    .channel-token .mini {
      padding: 2px 6px;
      font-size: 0.75rem;
    }

    .yaml-input {
      min-height: 220px;
      border-radius: 12px;
      border: 1px solid rgba(127, 127, 127, 0.2);
      background: rgba(0, 0, 0, 0.2);
      color: inherit;
      padding: 12px;
      font-size: 0.85rem;
      resize: vertical;
    }

    .error {
      color: #ff8a80;
      font-size: 0.85rem;
    }

    @media (max-width: 720px) {
      .toolbar {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `,e([pe({attribute:!1})],Jt.prototype,"hass",void 0),e([pe({attribute:!1})],Jt.prototype,"config",void 0),e([pe({type:Boolean,attribute:"compact"})],Jt.prototype,"compact",void 0),e([pe({type:Boolean,attribute:"hide-yaml"})],Jt.prototype,"hideYaml",void 0),e([he()],Jt.prototype,"_config",void 0),e([he()],Jt.prototype,"_dragging",void 0),e([he()],Jt.prototype,"_activeDevice",void 0),e([he()],Jt.prototype,"_showImport",void 0),e([he()],Jt.prototype,"_importYaml",void 0),e([he()],Jt.prototype,"_importError",void 0),e([he()],Jt.prototype,"_showChannelEditor",void 0),e([he()],Jt.prototype,"_channelDraft",void 0),e([he()],Jt.prototype,"_channelDragIndex",void 0),customElements.define("artnet-led-config-card-editor",Jt);class Xt extends se{constructor(){super(),this._config={...ue},this._status="Bereit",this._saving=!1,this._showYaml=!1,this._deploying=!1,this._saveDirty=!1,this._deployDirty=!1,this._loaded=!1,this._status=this._t("ready")}_lang(){return(this.hass?.language??navigator.language??"en").toLowerCase().startsWith("de")?"de":"en"}_t(e){return fe[this._lang()][e]}updated(e){e.has("hass")&&this.hass&&!this._loaded&&(this._loaded=!0,this._loadConfig())}async _loadConfig(){this._status=this._t("loading");try{const e=await this.hass.callWS({type:"ha_artnet_led_uiconfig/get"});this._config={...ue,...e,type:ue.type};const t=JSON.stringify(this._config);this._lastSaved=t,this._lastDeployed=t,this._saveDirty=!1,this._deployDirty=!1,this._status=this._t("loaded")}catch(e){this._status=this._t("loadError")}}_onConfigChanged(e){const t=e.detail?.config;if(!t)return;this._config=t;const i=JSON.stringify(t);this._saveDirty=i!==this._lastSaved,this._deployDirty=i!==this._lastDeployed,this._queueSave()}_queueSave(){this._saveTimeout&&window.clearTimeout(this._saveTimeout),this._saving=!0,this._status=this._t("saving"),this._saveTimeout=window.setTimeout(()=>{this._saveConfig()},700)}async _saveConfig(){try{await this.hass.callWS({type:"ha_artnet_led_uiconfig/save",config:this._config}),this._lastSaved=JSON.stringify(this._config),this._saveDirty=!1,this._status=this._t("saved")}catch(e){this._status=this._t("saveError")}this._saving=!1}_manualSave(){this._saveTimeout&&window.clearTimeout(this._saveTimeout),this._saveConfig()}_toggleYaml(){this._showYaml=!this._showYaml}async _deployToAddon(){this._deploying=!0,this._status=this._t("deployRunning"),this._deployDetail=void 0;const e=zt(this._config);try{const t=await this.hass.callWS({type:"ha_artnet_led_uiconfig/deploy",yaml:e});if(t?.error){const e=t.error?.message||t.error?.error||("string"==typeof t.error?t.error:JSON.stringify(t.error)),i=t.status?`${this._t("statusLabel")} ${t.status}`:void 0,n=t.url?`${this._t("urlLabel")}: ${t.url}`:void 0;return this._deployDetail=[e,i,n].filter(Boolean).join(" · "),this._status=this._t("deployFailed"),void(this._deploying=!1)}if("failed"===t?.reload){const e=[t?.error??this._t("reloadFailed")];t?.ha_url&&e.push(`${this._t("haUrlLabel")}: ${t.ha_url}`),t?.token_source&&e.push(`${this._t("tokenLabel")}: ${t.token_source}`),"boolean"==typeof t?.token_present&&e.push(`${this._t("tokenPresent")}: ${t.token_present}`),"number"==typeof t?.token_length&&e.push(`${this._t("tokenLength")}: ${t.token_length}`),this._deployDetail=e.filter(Boolean).join(" · "),this._status=this._t("deployWithError")}else this._deployDetail=t?.reload?`${this._t("reloadLabel")}: ${t.reload}`:void 0,this._status=this._t("deployOk");"written"!==t?.status&&void 0!==t?.status||(this._lastDeployed=JSON.stringify(this._config),this._deployDirty=!1)}catch(e){this._status=this._t("deployFailed");const t=e;this._deployDetail=t?.message||t?.error||t?.body?.message||JSON.stringify(e)}this._deploying=!1}render(){return B`
      <section class="panel">
        <header class="header">
          <div>
            <div class="title">${this._t("title")}</div>
            <div class="subtitle">${this._status}</div>
            <div class="version">${"0.1.0"}</div>
            ${this._deployDetail?B`<div class="detail">${this._deployDetail}</div>`:null}
          </div>
          <div class="actions">
            <button @click=${()=>{this._loadConfig()}}>${this._t("reloadButton")}</button>
            <button @click=${this._toggleYaml}>
              ${this._showYaml?this._t("hideYaml"):this._t("showYaml")}
            </button>
            <button
              class=${this._deployDirty?"primary":""}
              ?disabled=${this._deploying}
              @click=${this._deployToAddon}
            >
              ${this._deploying?this._t("deployEllipsis"):this._t("deploy")}
            </button>
            <button
              class=${this._saveDirty?"primary":""}
              ?disabled=${this._saving}
              @click=${this._manualSave}
            >
              ${this._saving?this._t("saveEllipsis"):this._t("save")}
            </button>
          </div>
        </header>
        <artnet-led-config-card-editor
          .config=${this._config}
          compact
          ?hide-yaml=${!this._showYaml}
          @config-changed=${this._onConfigChanged}
        ></artnet-led-config-card-editor>
      </section>
    `}}Xt.styles=a`
    :host {
      display: block;
      padding: 24px;
    }

    .panel {
      display: grid;
      gap: 18px;
    }

    .header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .title {
      font-size: 1.2rem;
      font-weight: 600;
    }

    .subtitle {
      font-size: 0.85rem;
      opacity: 0.7;
    }

    .detail {
      margin-top: 4px;
      font-size: 0.78rem;
      color: var(--error-color, #ff8a80);
      max-width: 560px;
      word-break: break-word;
    }

    .version {
      font-size: 0.7rem;
      opacity: 0.5;
      margin-top: 4px;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    button {
      border: none;
      padding: 8px 12px;
      border-radius: 10px;
      background: rgba(127, 127, 127, 0.2);
      color: inherit;
      cursor: pointer;
    }

    button.primary {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }

    button[disabled] {
      opacity: 0.6;
      cursor: default;
    }
  `,e([pe({attribute:!1})],Xt.prototype,"hass",void 0),e([he()],Xt.prototype,"_config",void 0),e([he()],Xt.prototype,"_status",void 0),e([he()],Xt.prototype,"_saving",void 0),e([he()],Xt.prototype,"_showYaml",void 0),e([he()],Xt.prototype,"_deploying",void 0),e([he()],Xt.prototype,"_deployDetail",void 0),e([he()],Xt.prototype,"_saveDirty",void 0),e([he()],Xt.prototype,"_deployDirty",void 0),customElements.define("ha-artnet-led-uiconfig-panel",Xt);class Zt extends se{setConfig(e){this.config=e}getCardSize(){return 6}render(){return B`
      <ha-card class="card">
        <ha-artnet-led-uiconfig-panel .hass=${this.hass}></ha-artnet-led-uiconfig-panel>
      </ha-card>
    `}}Zt.styles=a`
    :host {
      display: block;
    }

    .card {
      overflow: hidden;
    }

    ha-artnet-led-uiconfig-panel {
      display: block;
    }
  `,e([pe({attribute:!1})],Zt.prototype,"hass",void 0),e([pe({attribute:!1})],Zt.prototype,"config",void 0),customElements.define("ha-artnet-led-uiconfig-card",Zt),customElements.define("ha-artnet-led-uiconfig",Zt),window.customCards=window.customCards||[],window.customCards.push({type:"ha-artnet-led-uiconfig",name:"Art-Net LED UI Config",description:"WYSIWYG editor for ha-artnet-led inside a Lovelace card."});
//# sourceMappingURL=ha-artnet-led-uiconfig.js.map
