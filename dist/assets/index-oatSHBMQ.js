(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=e(o);fetch(o.href,a)}})();/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ut,Bt;function Gt(){return{geminiUrl:Ut,vertexUrl:Bt}}function Ht(i,t,e){var n,o,a;if(!(!((n=i.httpOptions)===null||n===void 0)&&n.baseUrl)){const l=Gt();return i.vertexai?(o=l.vertexUrl)!==null&&o!==void 0?o:t:(a=l.geminiUrl)!==null&&a!==void 0?a:e}return i.httpOptions.baseUrl}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class J{}function S(i,t){const e=/\{([^}]+)\}/g;return i.replace(e,(n,o)=>{if(Object.prototype.hasOwnProperty.call(t,o)){const a=t[o];return a!=null?String(a):""}else throw new Error(`Key '${o}' not found in valueMap.`)})}function r(i,t,e){for(let a=0;a<t.length-1;a++){const l=t[a];if(l.endsWith("[]")){const c=l.slice(0,-2);if(!(c in i))if(Array.isArray(e))i[c]=Array.from({length:e.length},()=>({}));else throw new Error(`Value must be a list given an array path ${l}`);if(Array.isArray(i[c])){const u=i[c];if(Array.isArray(e))for(let d=0;d<u.length;d++){const p=u[d];r(p,t.slice(a+1),e[d])}else for(const d of u)r(d,t.slice(a+1),e)}return}else if(l.endsWith("[0]")){const c=l.slice(0,-3);c in i||(i[c]=[{}]);const u=i[c];r(u[0],t.slice(a+1),e);return}(!i[l]||typeof i[l]!="object")&&(i[l]={}),i=i[l]}const n=t[t.length-1],o=i[n];if(o!==void 0){if(!e||typeof e=="object"&&Object.keys(e).length===0||e===o)return;if(typeof o=="object"&&typeof e=="object"&&o!==null&&e!==null)Object.assign(o,e);else throw new Error(`Cannot set value for an existing key. Key: ${n}`)}else i[n]=e}function s(i,t){try{if(t.length===1&&t[0]==="_self")return i;for(let e=0;e<t.length;e++){if(typeof i!="object"||i===null)return;const n=t[e];if(n.endsWith("[]")){const o=n.slice(0,-2);if(o in i){const a=i[o];return Array.isArray(a)?a.map(l=>s(l,t.slice(e+1))):void 0}else return}else i=i[n]}return i}catch(e){if(e instanceof TypeError)return;throw e}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function R(i,t){if(!t||typeof t!="string")throw new Error("model is required and must be a string");if(i.isVertexAI()){if(t.startsWith("publishers/")||t.startsWith("projects/")||t.startsWith("models/"))return t;if(t.indexOf("/")>=0){const e=t.split("/",2);return`publishers/${e[0]}/models/${e[1]}`}else return`publishers/google/models/${t}`}else return t.startsWith("models/")||t.startsWith("tunedModels/")?t:`models/${t}`}function St(i,t){const e=R(i,t);return e?e.startsWith("publishers/")&&i.isVertexAI()?`projects/${i.getProject()}/locations/${i.getLocation()}/${e}`:e.startsWith("models/")&&i.isVertexAI()?`projects/${i.getProject()}/locations/${i.getLocation()}/publishers/google/${e}`:e:""}function It(i,t){return Array.isArray(t)?t.map(e=>te(i,e)):[te(i,t)]}function te(i,t){if(typeof t=="object"&&t!==null)return t;throw new Error(`Could not parse input as Blob. Unsupported blob type: ${typeof t}`)}function $t(i,t){const e=te(i,t);if(e.mimeType&&e.mimeType.startsWith("image/"))return e;throw new Error(`Unsupported mime type: ${e.mimeType}`)}function Wt(i,t){const e=te(i,t);if(e.mimeType&&e.mimeType.startsWith("audio/"))return e;throw new Error(`Unsupported mime type: ${e.mimeType}`)}function ve(i,t){if(t==null)throw new Error("PartUnion is required");if(typeof t=="object")return t;if(typeof t=="string")return{text:t};throw new Error(`Unsupported part type: ${typeof t}`)}function xt(i,t){if(t==null||Array.isArray(t)&&t.length===0)throw new Error("PartListUnion is required");return Array.isArray(t)?t.map(e=>ve(i,e)):[ve(i,t)]}function ce(i){return i!=null&&typeof i=="object"&&"parts"in i&&Array.isArray(i.parts)}function Ce(i){return i!=null&&typeof i=="object"&&"functionCall"in i}function Te(i){return i!=null&&typeof i=="object"&&"functionResponse"in i}function N(i,t){if(t==null)throw new Error("ContentUnion is required");return ce(t)?t:{role:"user",parts:xt(i,t)}}function At(i,t){if(!t)return[];if(i.isVertexAI()&&Array.isArray(t))return t.flatMap(e=>{const n=N(i,e);return n.parts&&n.parts.length>0&&n.parts[0].text!==void 0?[n.parts[0].text]:[]});if(i.isVertexAI()){const e=N(i,t);return e.parts&&e.parts.length>0&&e.parts[0].text!==void 0?[e.parts[0].text]:[]}return Array.isArray(t)?t.map(e=>N(i,e)):[N(i,t)]}function V(i,t){if(t==null||Array.isArray(t)&&t.length===0)throw new Error("contents are required");if(!Array.isArray(t)){if(Ce(t)||Te(t))throw new Error("To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them");return[N(i,t)]}const e=[],n=[],o=ce(t[0]);for(const a of t){const l=ce(a);if(l!=o)throw new Error("Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them");if(l)e.push(a);else{if(Ce(a)||Te(a))throw new Error("To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them");n.push(a)}}return o||e.push({role:"user",parts:xt(i,n)}),e}function kt(i,t){return t}function _t(i,t){if(typeof t=="object")return t;if(typeof t=="string")return{voiceConfig:{prebuiltVoiceConfig:{voiceName:t}}};throw new Error(`Unsupported speechConfig type: ${typeof t}`)}function oe(i,t){return t}function se(i,t){if(!Array.isArray(t))throw new Error("tool is required and must be an array of Tools");return t}function zt(i,t,e,n=1){const o=!t.startsWith(`${e}/`)&&t.split("/").length===n;return i.isVertexAI()?t.startsWith("projects/")?t:t.startsWith("locations/")?`projects/${i.getProject()}/${t}`:t.startsWith(`${e}/`)?`projects/${i.getProject()}/locations/${i.getLocation()}/${t}`:o?`projects/${i.getProject()}/locations/${i.getLocation()}/${e}/${t}`:t:o?`${e}/${t}`:t}function U(i,t){if(typeof t!="string")throw new Error("name must be a string");return zt(i,t,"cachedContents")}function Rt(i,t){switch(t){case"STATE_UNSPECIFIED":return"JOB_STATE_UNSPECIFIED";case"CREATING":return"JOB_STATE_RUNNING";case"ACTIVE":return"JOB_STATE_SUCCEEDED";case"FAILED":return"JOB_STATE_FAILED";default:return t}}function B(i,t){if(typeof t!="string")throw new Error("fromImageBytes must be a string");return t}function Mt(i,t){if(typeof t!="string")throw new Error("fromName must be a string");return t.startsWith("files/")?t.split("files/")[1]:t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Ot(i,t){const e={};if(s(t,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const o=s(t,["codeExecutionResult"]);o!=null&&r(e,["codeExecutionResult"],o);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const c=s(t,["functionCall"]);c!=null&&r(e,["functionCall"],c);const u=s(t,["functionResponse"]);u!=null&&r(e,["functionResponse"],u);const d=s(t,["inlineData"]);d!=null&&r(e,["inlineData"],d);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function be(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Ot(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function Yt(){return{}}function Jt(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["dynamicThreshold"]);return o!=null&&r(e,["dynamicThreshold"],o),e}function Kt(i,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],Jt(i,n)),e}function Qt(i,t){const e={};if(s(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");s(t,["googleSearch"])!=null&&r(e,["googleSearch"],Yt());const o=s(t,["googleSearchRetrieval"]);o!=null&&r(e,["googleSearchRetrieval"],Kt(i,o));const a=s(t,["codeExecution"]);a!=null&&r(e,["codeExecution"],a);const l=s(t,["functionDeclarations"]);return l!=null&&r(e,["functionDeclarations"],l),e}function Xt(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["allowedFunctionNames"]);return o!=null&&r(e,["allowedFunctionNames"],o),e}function Zt(i,t){const e={},n=s(t,["functionCallingConfig"]);return n!=null&&r(e,["functionCallingConfig"],Xt(i,n)),e}function jt(i,t,e){const n={},o=s(t,["ttl"]);e!==void 0&&o!=null&&r(e,["ttl"],o);const a=s(t,["expireTime"]);e!==void 0&&a!=null&&r(e,["expireTime"],a);const l=s(t,["displayName"]);e!==void 0&&l!=null&&r(e,["displayName"],l);const c=s(t,["contents"]);if(e!==void 0&&c!=null){let f=V(i,c);Array.isArray(f)&&(f=f.map(h=>be(i,h))),r(e,["contents"],f)}const u=s(t,["systemInstruction"]);e!==void 0&&u!=null&&r(e,["systemInstruction"],be(i,N(i,u)));const d=s(t,["tools"]);if(e!==void 0&&d!=null){let f=d;Array.isArray(f)&&(f=f.map(h=>Qt(i,h))),r(e,["tools"],f)}const p=s(t,["toolConfig"]);return e!==void 0&&p!=null&&r(e,["toolConfig"],Zt(i,p)),n}function en(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["model"],St(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],jt(i,o,e)),e}function tn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],U(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function nn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],U(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function on(i,t,e){const n={},o=s(t,["ttl"]);e!==void 0&&o!=null&&r(e,["ttl"],o);const a=s(t,["expireTime"]);return e!==void 0&&a!=null&&r(e,["expireTime"],a),n}function sn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],U(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],on(i,o,e)),e}function rn(i,t,e){const n={},o=s(t,["pageSize"]);e!==void 0&&o!=null&&r(e,["_query","pageSize"],o);const a=s(t,["pageToken"]);return e!==void 0&&a!=null&&r(e,["_query","pageToken"],a),n}function an(i,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],rn(i,n,e)),e}function ln(i,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const o=s(t,["thought"]);o!=null&&r(e,["thought"],o);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const c=s(t,["fileData"]);c!=null&&r(e,["fileData"],c);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const d=s(t,["functionResponse"]);d!=null&&r(e,["functionResponse"],d);const p=s(t,["inlineData"]);p!=null&&r(e,["inlineData"],p);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function we(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>ln(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function cn(){return{}}function dn(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["dynamicThreshold"]);return o!=null&&r(e,["dynamicThreshold"],o),e}function un(i,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],dn(i,n)),e}function pn(i,t){const e={},n=s(t,["retrieval"]);n!=null&&r(e,["retrieval"],n),s(t,["googleSearch"])!=null&&r(e,["googleSearch"],cn());const a=s(t,["googleSearchRetrieval"]);a!=null&&r(e,["googleSearchRetrieval"],un(i,a));const l=s(t,["codeExecution"]);l!=null&&r(e,["codeExecution"],l);const c=s(t,["functionDeclarations"]);return c!=null&&r(e,["functionDeclarations"],c),e}function fn(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["allowedFunctionNames"]);return o!=null&&r(e,["allowedFunctionNames"],o),e}function hn(i,t){const e={},n=s(t,["functionCallingConfig"]);return n!=null&&r(e,["functionCallingConfig"],fn(i,n)),e}function mn(i,t,e){const n={},o=s(t,["ttl"]);e!==void 0&&o!=null&&r(e,["ttl"],o);const a=s(t,["expireTime"]);e!==void 0&&a!=null&&r(e,["expireTime"],a);const l=s(t,["displayName"]);e!==void 0&&l!=null&&r(e,["displayName"],l);const c=s(t,["contents"]);if(e!==void 0&&c!=null){let f=V(i,c);Array.isArray(f)&&(f=f.map(h=>we(i,h))),r(e,["contents"],f)}const u=s(t,["systemInstruction"]);e!==void 0&&u!=null&&r(e,["systemInstruction"],we(i,N(i,u)));const d=s(t,["tools"]);if(e!==void 0&&d!=null){let f=d;Array.isArray(f)&&(f=f.map(h=>pn(i,h))),r(e,["tools"],f)}const p=s(t,["toolConfig"]);return e!==void 0&&p!=null&&r(e,["toolConfig"],hn(i,p)),n}function gn(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["model"],St(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],mn(i,o,e)),e}function yn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],U(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function vn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],U(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function Cn(i,t,e){const n={},o=s(t,["ttl"]);e!==void 0&&o!=null&&r(e,["ttl"],o);const a=s(t,["expireTime"]);return e!==void 0&&a!=null&&r(e,["expireTime"],a),n}function Tn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],U(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],Cn(i,o,e)),e}function bn(i,t,e){const n={},o=s(t,["pageSize"]);e!==void 0&&o!=null&&r(e,["_query","pageSize"],o);const a=s(t,["pageToken"]);return e!==void 0&&a!=null&&r(e,["_query","pageToken"],a),n}function wn(i,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],bn(i,n,e)),e}function j(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["displayName"]);o!=null&&r(e,["displayName"],o);const a=s(t,["model"]);a!=null&&r(e,["model"],a);const l=s(t,["createTime"]);l!=null&&r(e,["createTime"],l);const c=s(t,["updateTime"]);c!=null&&r(e,["updateTime"],c);const u=s(t,["expireTime"]);u!=null&&r(e,["expireTime"],u);const d=s(t,["usageMetadata"]);return d!=null&&r(e,["usageMetadata"],d),e}function En(){return{}}function Sn(i,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const o=s(t,["cachedContents"]);if(o!=null){let a=o;Array.isArray(a)&&(a=a.map(l=>j(i,l))),r(e,["cachedContents"],a)}return e}function ee(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["displayName"]);o!=null&&r(e,["displayName"],o);const a=s(t,["model"]);a!=null&&r(e,["model"],a);const l=s(t,["createTime"]);l!=null&&r(e,["createTime"],l);const c=s(t,["updateTime"]);c!=null&&r(e,["updateTime"],c);const u=s(t,["expireTime"]);u!=null&&r(e,["expireTime"],u);const d=s(t,["usageMetadata"]);return d!=null&&r(e,["usageMetadata"],d),e}function In(){return{}}function xn(i,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const o=s(t,["cachedContents"]);if(o!=null){let a=o;Array.isArray(a)&&(a=a.map(l=>ee(i,l))),r(e,["cachedContents"],a)}return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var Y;(function(i){i.PAGED_ITEM_BATCH_JOBS="batchJobs",i.PAGED_ITEM_MODELS="models",i.PAGED_ITEM_TUNING_JOBS="tuningJobs",i.PAGED_ITEM_FILES="files",i.PAGED_ITEM_CACHED_CONTENTS="cachedContents"})(Y||(Y={}));class ge{constructor(t,e,n,o){this.pageInternal=[],this.paramsInternal={},this.requestInternal=e,this.init(t,n,o)}init(t,e,n){var o,a;this.nameInternal=t,this.pageInternal=e[this.nameInternal]||[],this.idxInternal=0;let l={config:{}};n?typeof n=="object"?l=Object.assign({},n):l=n:l={config:{}},l.config&&(l.config.pageToken=e.nextPageToken),this.paramsInternal=l,this.pageInternalSize=(a=(o=l.config)===null||o===void 0?void 0:o.pageSize)!==null&&a!==void 0?a:this.pageInternal.length}initNextPage(t){this.init(this.nameInternal,t,this.paramsInternal)}get page(){return this.pageInternal}get name(){return this.nameInternal}get pageSize(){return this.pageInternalSize}get params(){return this.paramsInternal}get pageLength(){return this.pageInternal.length}getItem(t){return this.pageInternal[t]}[Symbol.asyncIterator](){return{next:async()=>{if(this.idxInternal>=this.pageLength)if(this.hasNextPage())await this.nextPage();else return{value:void 0,done:!0};const t=this.getItem(this.idxInternal);return this.idxInternal+=1,{value:t,done:!1}},return:async()=>({value:void 0,done:!0})}}async nextPage(){if(!this.hasNextPage())throw new Error("No more pages to fetch.");const t=await this.requestInternal(this.params);return this.initNextPage(t),this.page}hasNextPage(){var t;return((t=this.params.config)===null||t===void 0?void 0:t.pageToken)!==void 0}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var Ee;(function(i){i.OUTCOME_UNSPECIFIED="OUTCOME_UNSPECIFIED",i.OUTCOME_OK="OUTCOME_OK",i.OUTCOME_FAILED="OUTCOME_FAILED",i.OUTCOME_DEADLINE_EXCEEDED="OUTCOME_DEADLINE_EXCEEDED"})(Ee||(Ee={}));var Se;(function(i){i.LANGUAGE_UNSPECIFIED="LANGUAGE_UNSPECIFIED",i.PYTHON="PYTHON"})(Se||(Se={}));var Ie;(function(i){i.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",i.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",i.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",i.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",i.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",i.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(Ie||(Ie={}));var xe;(function(i){i.HARM_BLOCK_METHOD_UNSPECIFIED="HARM_BLOCK_METHOD_UNSPECIFIED",i.SEVERITY="SEVERITY",i.PROBABILITY="PROBABILITY"})(xe||(xe={}));var Ae;(function(i){i.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",i.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",i.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",i.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",i.BLOCK_NONE="BLOCK_NONE",i.OFF="OFF"})(Ae||(Ae={}));var ke;(function(i){i.MODE_UNSPECIFIED="MODE_UNSPECIFIED",i.MODE_DYNAMIC="MODE_DYNAMIC"})(ke||(ke={}));var k;(function(i){i.TYPE_UNSPECIFIED="TYPE_UNSPECIFIED",i.STRING="STRING",i.NUMBER="NUMBER",i.INTEGER="INTEGER",i.BOOLEAN="BOOLEAN",i.ARRAY="ARRAY",i.OBJECT="OBJECT"})(k||(k={}));var _e;(function(i){i.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",i.STOP="STOP",i.MAX_TOKENS="MAX_TOKENS",i.SAFETY="SAFETY",i.RECITATION="RECITATION",i.LANGUAGE="LANGUAGE",i.OTHER="OTHER",i.BLOCKLIST="BLOCKLIST",i.PROHIBITED_CONTENT="PROHIBITED_CONTENT",i.SPII="SPII",i.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",i.IMAGE_SAFETY="IMAGE_SAFETY"})(_e||(_e={}));var Re;(function(i){i.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",i.NEGLIGIBLE="NEGLIGIBLE",i.LOW="LOW",i.MEDIUM="MEDIUM",i.HIGH="HIGH"})(Re||(Re={}));var Me;(function(i){i.HARM_SEVERITY_UNSPECIFIED="HARM_SEVERITY_UNSPECIFIED",i.HARM_SEVERITY_NEGLIGIBLE="HARM_SEVERITY_NEGLIGIBLE",i.HARM_SEVERITY_LOW="HARM_SEVERITY_LOW",i.HARM_SEVERITY_MEDIUM="HARM_SEVERITY_MEDIUM",i.HARM_SEVERITY_HIGH="HARM_SEVERITY_HIGH"})(Me||(Me={}));var Pe;(function(i){i.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",i.SAFETY="SAFETY",i.OTHER="OTHER",i.BLOCKLIST="BLOCKLIST",i.PROHIBITED_CONTENT="PROHIBITED_CONTENT"})(Pe||(Pe={}));var De;(function(i){i.TRAFFIC_TYPE_UNSPECIFIED="TRAFFIC_TYPE_UNSPECIFIED",i.ON_DEMAND="ON_DEMAND",i.PROVISIONED_THROUGHPUT="PROVISIONED_THROUGHPUT"})(De||(De={}));var ne;(function(i){i.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",i.TEXT="TEXT",i.IMAGE="IMAGE",i.AUDIO="AUDIO"})(ne||(ne={}));var Ne;(function(i){i.MEDIA_RESOLUTION_UNSPECIFIED="MEDIA_RESOLUTION_UNSPECIFIED",i.MEDIA_RESOLUTION_LOW="MEDIA_RESOLUTION_LOW",i.MEDIA_RESOLUTION_MEDIUM="MEDIA_RESOLUTION_MEDIUM",i.MEDIA_RESOLUTION_HIGH="MEDIA_RESOLUTION_HIGH"})(Ne||(Ne={}));var de;(function(i){i.JOB_STATE_UNSPECIFIED="JOB_STATE_UNSPECIFIED",i.JOB_STATE_QUEUED="JOB_STATE_QUEUED",i.JOB_STATE_PENDING="JOB_STATE_PENDING",i.JOB_STATE_RUNNING="JOB_STATE_RUNNING",i.JOB_STATE_SUCCEEDED="JOB_STATE_SUCCEEDED",i.JOB_STATE_FAILED="JOB_STATE_FAILED",i.JOB_STATE_CANCELLING="JOB_STATE_CANCELLING",i.JOB_STATE_CANCELLED="JOB_STATE_CANCELLED",i.JOB_STATE_PAUSED="JOB_STATE_PAUSED",i.JOB_STATE_EXPIRED="JOB_STATE_EXPIRED",i.JOB_STATE_UPDATING="JOB_STATE_UPDATING",i.JOB_STATE_PARTIALLY_SUCCEEDED="JOB_STATE_PARTIALLY_SUCCEEDED"})(de||(de={}));var Le;(function(i){i.ADAPTER_SIZE_UNSPECIFIED="ADAPTER_SIZE_UNSPECIFIED",i.ADAPTER_SIZE_ONE="ADAPTER_SIZE_ONE",i.ADAPTER_SIZE_TWO="ADAPTER_SIZE_TWO",i.ADAPTER_SIZE_FOUR="ADAPTER_SIZE_FOUR",i.ADAPTER_SIZE_EIGHT="ADAPTER_SIZE_EIGHT",i.ADAPTER_SIZE_SIXTEEN="ADAPTER_SIZE_SIXTEEN",i.ADAPTER_SIZE_THIRTY_TWO="ADAPTER_SIZE_THIRTY_TWO"})(Le||(Le={}));var qe;(function(i){i.FEATURE_SELECTION_PREFERENCE_UNSPECIFIED="FEATURE_SELECTION_PREFERENCE_UNSPECIFIED",i.PRIORITIZE_QUALITY="PRIORITIZE_QUALITY",i.BALANCED="BALANCED",i.PRIORITIZE_COST="PRIORITIZE_COST"})(qe||(qe={}));var Fe;(function(i){i.MODE_UNSPECIFIED="MODE_UNSPECIFIED",i.MODE_DYNAMIC="MODE_DYNAMIC"})(Fe||(Fe={}));var Ve;(function(i){i.MODE_UNSPECIFIED="MODE_UNSPECIFIED",i.AUTO="AUTO",i.ANY="ANY",i.NONE="NONE"})(Ve||(Ve={}));var Ue;(function(i){i.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",i.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",i.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",i.BLOCK_NONE="BLOCK_NONE"})(Ue||(Ue={}));var Be;(function(i){i.DONT_ALLOW="DONT_ALLOW",i.ALLOW_ADULT="ALLOW_ADULT",i.ALLOW_ALL="ALLOW_ALL"})(Be||(Be={}));var Ge;(function(i){i.auto="auto",i.en="en",i.ja="ja",i.ko="ko",i.hi="hi"})(Ge||(Ge={}));var He;(function(i){i.STATE_UNSPECIFIED="STATE_UNSPECIFIED",i.PROCESSING="PROCESSING",i.ACTIVE="ACTIVE",i.FAILED="FAILED"})(He||(He={}));var $e;(function(i){i.SOURCE_UNSPECIFIED="SOURCE_UNSPECIFIED",i.UPLOADED="UPLOADED",i.GENERATED="GENERATED"})($e||($e={}));var We;(function(i){i.MASK_MODE_DEFAULT="MASK_MODE_DEFAULT",i.MASK_MODE_USER_PROVIDED="MASK_MODE_USER_PROVIDED",i.MASK_MODE_BACKGROUND="MASK_MODE_BACKGROUND",i.MASK_MODE_FOREGROUND="MASK_MODE_FOREGROUND",i.MASK_MODE_SEMANTIC="MASK_MODE_SEMANTIC"})(We||(We={}));var ze;(function(i){i.CONTROL_TYPE_DEFAULT="CONTROL_TYPE_DEFAULT",i.CONTROL_TYPE_CANNY="CONTROL_TYPE_CANNY",i.CONTROL_TYPE_SCRIBBLE="CONTROL_TYPE_SCRIBBLE",i.CONTROL_TYPE_FACE_MESH="CONTROL_TYPE_FACE_MESH"})(ze||(ze={}));var Oe;(function(i){i.SUBJECT_TYPE_DEFAULT="SUBJECT_TYPE_DEFAULT",i.SUBJECT_TYPE_PERSON="SUBJECT_TYPE_PERSON",i.SUBJECT_TYPE_ANIMAL="SUBJECT_TYPE_ANIMAL",i.SUBJECT_TYPE_PRODUCT="SUBJECT_TYPE_PRODUCT"})(Oe||(Oe={}));var Ye;(function(i){i.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",i.TEXT="TEXT",i.IMAGE="IMAGE",i.VIDEO="VIDEO",i.AUDIO="AUDIO",i.DOCUMENT="DOCUMENT"})(Ye||(Ye={}));var Je;(function(i){i.START_SENSITIVITY_UNSPECIFIED="START_SENSITIVITY_UNSPECIFIED",i.START_SENSITIVITY_HIGH="START_SENSITIVITY_HIGH",i.START_SENSITIVITY_LOW="START_SENSITIVITY_LOW"})(Je||(Je={}));var Ke;(function(i){i.END_SENSITIVITY_UNSPECIFIED="END_SENSITIVITY_UNSPECIFIED",i.END_SENSITIVITY_HIGH="END_SENSITIVITY_HIGH",i.END_SENSITIVITY_LOW="END_SENSITIVITY_LOW"})(Ke||(Ke={}));var Qe;(function(i){i.ACTIVITY_HANDLING_UNSPECIFIED="ACTIVITY_HANDLING_UNSPECIFIED",i.START_OF_ACTIVITY_INTERRUPTS="START_OF_ACTIVITY_INTERRUPTS",i.NO_INTERRUPTION="NO_INTERRUPTION"})(Qe||(Qe={}));var Xe;(function(i){i.TURN_COVERAGE_UNSPECIFIED="TURN_COVERAGE_UNSPECIFIED",i.TURN_INCLUDES_ONLY_ACTIVITY="TURN_INCLUDES_ONLY_ACTIVITY",i.TURN_INCLUDES_ALL_INPUT="TURN_INCLUDES_ALL_INPUT"})(Xe||(Xe={}));class Q{get text(){var t,e,n,o,a,l,c,u;if(((o=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||o===void 0?void 0:o.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning text from the first one.");let d="",p=!1;const f=[];for(const h of(u=(c=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)!==null&&u!==void 0?u:[]){for(const[m,y]of Object.entries(h))m!=="text"&&m!=="thought"&&(y!==null||y!==void 0)&&f.push(m);if(typeof h.text=="string"){if(typeof h.thought=="boolean"&&h.thought)continue;p=!0,d+=h.text}}return f.length>0&&console.warn(`there are non-text parts ${f} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),p?d:void 0}get data(){var t,e,n,o,a,l,c,u;if(((o=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||o===void 0?void 0:o.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning data from the first one.");let d="";const p=[];for(const f of(u=(c=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)!==null&&u!==void 0?u:[]){for(const[h,m]of Object.entries(f))h!=="inlineData"&&(m!==null||m!==void 0)&&p.push(h);f.inlineData&&typeof f.inlineData.data=="string"&&(d+=atob(f.inlineData.data))}return p.length>0&&console.warn(`there are non-data parts ${p} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`),d.length>0?btoa(d):void 0}get functionCalls(){var t,e,n,o,a,l,c,u;if(((o=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||o===void 0?void 0:o.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning function calls from the first one.");const d=(u=(c=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)===null||u===void 0?void 0:u.filter(p=>p.functionCall).map(p=>p.functionCall).filter(p=>p!==void 0);if((d==null?void 0:d.length)!==0)return d}get executableCode(){var t,e,n,o,a,l,c,u,d;if(((o=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||o===void 0?void 0:o.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning executable code from the first one.");const p=(u=(c=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)===null||u===void 0?void 0:u.filter(f=>f.executableCode).map(f=>f.executableCode).filter(f=>f!==void 0);if((p==null?void 0:p.length)!==0)return(d=p==null?void 0:p[0])===null||d===void 0?void 0:d.code}get codeExecutionResult(){var t,e,n,o,a,l,c,u,d;if(((o=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||o===void 0?void 0:o.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning code execution result from the first one.");const p=(u=(c=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)===null||u===void 0?void 0:u.filter(f=>f.codeExecutionResult).map(f=>f.codeExecutionResult).filter(f=>f!==void 0);if((p==null?void 0:p.length)!==0)return(d=p==null?void 0:p[0])===null||d===void 0?void 0:d.output}}class Ze{}class je{}class et{}class tt{}class An{}class nt{}class it{}class ot{}class kn{}class ue{constructor(t){const e={};for(const n of t.headers.entries())e[n[0]]=n[1];this.headers=e,this.responseInternal=t}json(){return this.responseInternal.json()}}class _n{}class Rn{}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Mn extends J{constructor(t){super(),this.apiClient=t,this.list=async(e={})=>new ge(Y.PAGED_ITEM_CACHED_CONTENTS,n=>this.listInternal(n),await this.listInternal(e),e)}async create(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=gn(this.apiClient,t);return c=S("cachedContents",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>ee(this.apiClient,p))}else{const d=en(this.apiClient,t);return c=S("cachedContents",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>j(this.apiClient,p))}}async get(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=yn(this.apiClient,t);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>ee(this.apiClient,p))}else{const d=tn(this.apiClient,t);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>j(this.apiClient,p))}}async delete(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=vn(this.apiClient,t);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(()=>{const p=In(),f=new it;return Object.assign(f,p),f})}else{const d=nn(this.apiClient,t);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(()=>{const p=En(),f=new it;return Object.assign(f,p),f})}}async update(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Tn(this.apiClient,t);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"PATCH",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>ee(this.apiClient,p))}else{const d=sn(this.apiClient,t);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"PATCH",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>j(this.apiClient,p))}}async listInternal(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=wn(this.apiClient,t);return c=S("cachedContents",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=xn(this.apiClient,p),h=new ot;return Object.assign(h,f),h})}else{const d=an(this.apiClient,t);return c=S("cachedContents",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Sn(this.apiClient,p),h=new ot;return Object.assign(h,f),h})}}}function st(i){var t=typeof Symbol=="function"&&Symbol.iterator,e=t&&i[t],n=0;if(e)return e.call(i);if(i&&typeof i.length=="number")return{next:function(){return i&&n>=i.length&&(i=void 0),{value:i&&i[n++],done:!i}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function D(i){return this instanceof D?(this.v=i,this):new D(i)}function ie(i,t,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=e.apply(i,t||[]),o,a=[];return o=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),c("next"),c("throw"),c("return",l),o[Symbol.asyncIterator]=function(){return this},o;function l(m){return function(y){return Promise.resolve(y).then(m,f)}}function c(m,y){n[m]&&(o[m]=function(b){return new Promise(function(E,g){a.push([m,b,E,g])>1||u(m,b)})},y&&(o[m]=y(o[m])))}function u(m,y){try{d(n[m](y))}catch(b){h(a[0][3],b)}}function d(m){m.value instanceof D?Promise.resolve(m.value.v).then(p,f):h(a[0][2],m)}function p(m){u("next",m)}function f(m){u("throw",m)}function h(m,y){m(y),a.shift(),a.length&&u(a[0][0],a[0][1])}}function pe(i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=i[Symbol.asyncIterator],e;return t?t.call(i):(i=typeof st=="function"?st(i):i[Symbol.iterator](),e={},n("next"),n("throw"),n("return"),e[Symbol.asyncIterator]=function(){return this},e);function n(a){e[a]=i[a]&&function(l){return new Promise(function(c,u){l=i[a](l),o(c,u,l.done,l.value)})}}function o(a,l,c,u){Promise.resolve(u).then(function(d){a({value:d,done:c})},l)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Pn(i){var t;if(i.candidates==null||i.candidates.length===0)return!1;const e=(t=i.candidates[0])===null||t===void 0?void 0:t.content;return e===void 0?!1:Pt(e)}function Pt(i){if(i.parts===void 0||i.parts.length===0)return!1;for(const t of i.parts)if(t===void 0||Object.keys(t).length===0||t.text!==void 0&&t.text==="")return!1;return!0}function Dn(i){if(i.length!==0){if(i[0].role!=="user")throw new Error("History must start with a user turn.");for(const t of i)if(t.role!=="user"&&t.role!=="model")throw new Error(`Role must be user or model, but got ${t.role}.`)}}function Nn(i){if(i===void 0||i.length===0)return[];const t=[],e=i.length;let n=0,o=i[0];for(;n<e;)if(i[n].role==="user")o=i[n],n++;else{const a=[];let l=!0;for(;n<e&&i[n].role==="model";)a.push(i[n]),l&&!Pt(i[n])&&(l=!1),n++;l&&(t.push(o),t.push(...a))}return t}class Ln{constructor(t,e){this.modelsModule=t,this.apiClient=e}create(t){return new qn(this.apiClient,this.modelsModule,t.model,t.config,t.history)}}class qn{constructor(t,e,n,o={},a=[]){this.apiClient=t,this.modelsModule=e,this.model=n,this.config=o,this.history=a,this.sendPromise=Promise.resolve(),Dn(a)}async sendMessage(t){var e;await this.sendPromise;const n=N(this.apiClient,t.message),o=this.modelsModule.generateContent({model:this.model,contents:this.getHistory(!0).concat(n),config:(e=t.config)!==null&&e!==void 0?e:this.config});return this.sendPromise=(async()=>{var a,l;const u=(l=(a=(await o).candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content,d=u?[u]:[];this.recordHistory(n,d)})(),await this.sendPromise,o}async sendMessageStream(t){var e;await this.sendPromise;const n=N(this.apiClient,t.message),o=this.modelsModule.generateContentStream({model:this.model,contents:this.getHistory(!0).concat(n),config:(e=t.config)!==null&&e!==void 0?e:this.config});this.sendPromise=o.then(()=>{}).catch(()=>{});const a=await o;return this.processStreamResponse(a,n)}getHistory(t=!1){return t?Nn(this.history):this.history}processStreamResponse(t,e){var n,o;return ie(this,arguments,function*(){var l,c,u,d;const p=[];try{for(var f=!0,h=pe(t),m;m=yield D(h.next()),l=m.done,!l;f=!0){d=m.value,f=!1;const y=d;if(Pn(y)){const b=(o=(n=y.candidates)===null||n===void 0?void 0:n[0])===null||o===void 0?void 0:o.content;b!==void 0&&p.push(b)}yield yield D(y)}}catch(y){c={error:y}}finally{try{!f&&!l&&(u=h.return)&&(yield D(u.call(h)))}finally{if(c)throw c.error}}this.recordHistory(e,p)})}recordHistory(t,e){let n=[];e.length>0&&e.every(o=>o.role==="model")?n=e:n.push({role:"model",parts:[]}),this.history.push(t),this.history.push(...n)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Fn(i,t,e){const n={},o=s(t,["pageSize"]);e!==void 0&&o!=null&&r(e,["_query","pageSize"],o);const a=s(t,["pageToken"]);return e!==void 0&&a!=null&&r(e,["_query","pageToken"],a),n}function Vn(i,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],Fn(i,n,e)),e}function Un(i,t){const e={},n=s(t,["details"]);n!=null&&r(e,["details"],n);const o=s(t,["message"]);o!=null&&r(e,["message"],o);const a=s(t,["code"]);return a!=null&&r(e,["code"],a),e}function Bn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["displayName"]);o!=null&&r(e,["displayName"],o);const a=s(t,["mimeType"]);a!=null&&r(e,["mimeType"],a);const l=s(t,["sizeBytes"]);l!=null&&r(e,["sizeBytes"],l);const c=s(t,["createTime"]);c!=null&&r(e,["createTime"],c);const u=s(t,["expirationTime"]);u!=null&&r(e,["expirationTime"],u);const d=s(t,["updateTime"]);d!=null&&r(e,["updateTime"],d);const p=s(t,["sha256Hash"]);p!=null&&r(e,["sha256Hash"],p);const f=s(t,["uri"]);f!=null&&r(e,["uri"],f);const h=s(t,["downloadUri"]);h!=null&&r(e,["downloadUri"],h);const m=s(t,["state"]);m!=null&&r(e,["state"],m);const y=s(t,["source"]);y!=null&&r(e,["source"],y);const b=s(t,["videoMetadata"]);b!=null&&r(e,["videoMetadata"],b);const E=s(t,["error"]);return E!=null&&r(e,["error"],Un(i,E)),e}function Gn(i,t){const e={},n=s(t,["file"]);n!=null&&r(e,["file"],Bn(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function Hn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","file"],Mt(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function $n(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","file"],Mt(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function Wn(i,t){const e={},n=s(t,["details"]);n!=null&&r(e,["details"],n);const o=s(t,["message"]);o!=null&&r(e,["message"],o);const a=s(t,["code"]);return a!=null&&r(e,["code"],a),e}function fe(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["displayName"]);o!=null&&r(e,["displayName"],o);const a=s(t,["mimeType"]);a!=null&&r(e,["mimeType"],a);const l=s(t,["sizeBytes"]);l!=null&&r(e,["sizeBytes"],l);const c=s(t,["createTime"]);c!=null&&r(e,["createTime"],c);const u=s(t,["expirationTime"]);u!=null&&r(e,["expirationTime"],u);const d=s(t,["updateTime"]);d!=null&&r(e,["updateTime"],d);const p=s(t,["sha256Hash"]);p!=null&&r(e,["sha256Hash"],p);const f=s(t,["uri"]);f!=null&&r(e,["uri"],f);const h=s(t,["downloadUri"]);h!=null&&r(e,["downloadUri"],h);const m=s(t,["state"]);m!=null&&r(e,["state"],m);const y=s(t,["source"]);y!=null&&r(e,["source"],y);const b=s(t,["videoMetadata"]);b!=null&&r(e,["videoMetadata"],b);const E=s(t,["error"]);return E!=null&&r(e,["error"],Wn(i,E)),e}function zn(i,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const o=s(t,["files"]);if(o!=null){let a=o;Array.isArray(a)&&(a=a.map(l=>fe(i,l))),r(e,["files"],a)}return e}function On(){return{}}function Yn(){return{}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Jn extends J{constructor(t){super(),this.apiClient=t,this.list=async(e={})=>new ge(Y.PAGED_ITEM_FILES,n=>this.listInternal(n),await this.listInternal(e),e)}async upload(t){if(this.apiClient.isVertexAI())throw new Error("Vertex AI does not support uploading files. You can share files through a GCS bucket.");return this.apiClient.uploadFile(t.file,t.config).then(e=>fe(this.apiClient,e))}async listInternal(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=Vn(this.apiClient,t);return a=S("files",c._url),l=c._query,delete c.config,delete c._url,delete c._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(u=>{const d=zn(this.apiClient,u),p=new kn;return Object.assign(p,d),p})}}async createInternal(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=Gn(this.apiClient,t);return a=S("upload/v1beta/files",c._url),l=c._query,delete c.config,delete c._url,delete c._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(()=>{const u=On(),d=new _n;return Object.assign(d,u),d})}}async get(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=Hn(this.apiClient,t);return a=S("files/{file}",c._url),l=c._query,delete c.config,delete c._url,delete c._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(u=>fe(this.apiClient,u))}}async delete(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=$n(this.apiClient,t);return a=S("files/{file}",c._url),l=c._query,delete c.config,delete c._url,delete c._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(c),httpMethod:"DELETE",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(()=>{const u=Yn(),d=new Rn;return Object.assign(d,u),d})}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Kn(i,t){const e={};if(s(t,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const o=s(t,["codeExecutionResult"]);o!=null&&r(e,["codeExecutionResult"],o);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const c=s(t,["functionCall"]);c!=null&&r(e,["functionCall"],c);const u=s(t,["functionResponse"]);u!=null&&r(e,["functionResponse"],u);const d=s(t,["inlineData"]);d!=null&&r(e,["inlineData"],d);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function Qn(i,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const o=s(t,["thought"]);o!=null&&r(e,["thought"],o);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const c=s(t,["fileData"]);c!=null&&r(e,["fileData"],c);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const d=s(t,["functionResponse"]);d!=null&&r(e,["functionResponse"],d);const p=s(t,["inlineData"]);p!=null&&r(e,["inlineData"],p);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function Xn(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Kn(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function Zn(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Qn(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function jn(){return{}}function ei(){return{}}function ti(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["dynamicThreshold"]);return o!=null&&r(e,["dynamicThreshold"],o),e}function ni(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["dynamicThreshold"]);return o!=null&&r(e,["dynamicThreshold"],o),e}function ii(i,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],ti(i,n)),e}function oi(i,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],ni(i,n)),e}function si(i,t){const e={};if(s(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");s(t,["googleSearch"])!=null&&r(e,["googleSearch"],jn());const o=s(t,["googleSearchRetrieval"]);o!=null&&r(e,["googleSearchRetrieval"],ii(i,o));const a=s(t,["codeExecution"]);a!=null&&r(e,["codeExecution"],a);const l=s(t,["functionDeclarations"]);return l!=null&&r(e,["functionDeclarations"],l),e}function ri(i,t){const e={},n=s(t,["retrieval"]);n!=null&&r(e,["retrieval"],n),s(t,["googleSearch"])!=null&&r(e,["googleSearch"],ei());const a=s(t,["googleSearchRetrieval"]);a!=null&&r(e,["googleSearchRetrieval"],oi(i,a));const l=s(t,["codeExecution"]);l!=null&&r(e,["codeExecution"],l);const c=s(t,["functionDeclarations"]);return c!=null&&r(e,["functionDeclarations"],c),e}function ai(i,t){const e={},n=s(t,["handle"]);if(n!=null&&r(e,["handle"],n),s(t,["transparent"])!==void 0)throw new Error("transparent parameter is not supported in Gemini API.");return e}function li(i,t){const e={},n=s(t,["handle"]);n!=null&&r(e,["handle"],n);const o=s(t,["transparent"]);return o!=null&&r(e,["transparent"],o),e}function ci(){return{}}function rt(){return{}}function di(i,t){const e={},n=s(t,["disabled"]);n!=null&&r(e,["disabled"],n);const o=s(t,["startOfSpeechSensitivity"]);o!=null&&r(e,["startOfSpeechSensitivity"],o);const a=s(t,["endOfSpeechSensitivity"]);a!=null&&r(e,["endOfSpeechSensitivity"],a);const l=s(t,["prefixPaddingMs"]);l!=null&&r(e,["prefixPaddingMs"],l);const c=s(t,["silenceDurationMs"]);return c!=null&&r(e,["silenceDurationMs"],c),e}function ui(i,t){const e={},n=s(t,["disabled"]);n!=null&&r(e,["disabled"],n);const o=s(t,["startOfSpeechSensitivity"]);o!=null&&r(e,["startOfSpeechSensitivity"],o);const a=s(t,["endOfSpeechSensitivity"]);a!=null&&r(e,["endOfSpeechSensitivity"],a);const l=s(t,["prefixPaddingMs"]);l!=null&&r(e,["prefixPaddingMs"],l);const c=s(t,["silenceDurationMs"]);return c!=null&&r(e,["silenceDurationMs"],c),e}function pi(i,t){const e={},n=s(t,["automaticActivityDetection"]);n!=null&&r(e,["automaticActivityDetection"],di(i,n));const o=s(t,["activityHandling"]);o!=null&&r(e,["activityHandling"],o);const a=s(t,["turnCoverage"]);return a!=null&&r(e,["turnCoverage"],a),e}function fi(i,t){const e={},n=s(t,["automaticActivityDetection"]);n!=null&&r(e,["automaticActivityDetection"],ui(i,n));const o=s(t,["activityHandling"]);o!=null&&r(e,["activityHandling"],o);const a=s(t,["turnCoverage"]);return a!=null&&r(e,["turnCoverage"],a),e}function hi(i,t){const e={},n=s(t,["targetTokens"]);return n!=null&&r(e,["targetTokens"],n),e}function mi(i,t){const e={},n=s(t,["targetTokens"]);return n!=null&&r(e,["targetTokens"],n),e}function gi(i,t){const e={},n=s(t,["triggerTokens"]);n!=null&&r(e,["triggerTokens"],n);const o=s(t,["slidingWindow"]);return o!=null&&r(e,["slidingWindow"],hi(i,o)),e}function yi(i,t){const e={},n=s(t,["triggerTokens"]);n!=null&&r(e,["triggerTokens"],n);const o=s(t,["slidingWindow"]);return o!=null&&r(e,["slidingWindow"],mi(i,o)),e}function vi(i,t,e){const n={},o=s(t,["generationConfig"]);e!==void 0&&o!=null&&r(e,["setup","generationConfig"],o);const a=s(t,["responseModalities"]);e!==void 0&&a!=null&&r(e,["setup","generationConfig","responseModalities"],a);const l=s(t,["temperature"]);e!==void 0&&l!=null&&r(e,["setup","generationConfig","temperature"],l);const c=s(t,["topP"]);e!==void 0&&c!=null&&r(e,["setup","generationConfig","topP"],c);const u=s(t,["topK"]);e!==void 0&&u!=null&&r(e,["setup","generationConfig","topK"],u);const d=s(t,["maxOutputTokens"]);e!==void 0&&d!=null&&r(e,["setup","generationConfig","maxOutputTokens"],d);const p=s(t,["mediaResolution"]);e!==void 0&&p!=null&&r(e,["setup","generationConfig","mediaResolution"],p);const f=s(t,["seed"]);e!==void 0&&f!=null&&r(e,["setup","generationConfig","seed"],f);const h=s(t,["speechConfig"]);e!==void 0&&h!=null&&r(e,["setup","generationConfig","speechConfig"],h);const m=s(t,["systemInstruction"]);e!==void 0&&m!=null&&r(e,["setup","systemInstruction"],Xn(i,N(i,m)));const y=s(t,["tools"]);if(e!==void 0&&y!=null){let v=se(i,y);Array.isArray(v)&&(v=v.map(T=>si(i,oe(i,T)))),r(e,["setup","tools"],v)}const b=s(t,["sessionResumption"]);if(e!==void 0&&b!=null&&r(e,["setup","sessionResumption"],ai(i,b)),s(t,["inputAudioTranscription"])!==void 0)throw new Error("inputAudioTranscription parameter is not supported in Gemini API.");const E=s(t,["outputAudioTranscription"]);e!==void 0&&E!=null&&r(e,["setup","outputAudioTranscription"],ci());const g=s(t,["realtimeInputConfig"]);e!==void 0&&g!=null&&r(e,["setup","realtimeInputConfig"],pi(i,g));const C=s(t,["contextWindowCompression"]);return e!==void 0&&C!=null&&r(e,["setup","contextWindowCompression"],gi(i,C)),n}function Ci(i,t,e){const n={},o=s(t,["generationConfig"]);e!==void 0&&o!=null&&r(e,["setup","generationConfig"],o);const a=s(t,["responseModalities"]);e!==void 0&&a!=null&&r(e,["setup","generationConfig","responseModalities"],a);const l=s(t,["temperature"]);e!==void 0&&l!=null&&r(e,["setup","generationConfig","temperature"],l);const c=s(t,["topP"]);e!==void 0&&c!=null&&r(e,["setup","generationConfig","topP"],c);const u=s(t,["topK"]);e!==void 0&&u!=null&&r(e,["setup","generationConfig","topK"],u);const d=s(t,["maxOutputTokens"]);e!==void 0&&d!=null&&r(e,["setup","generationConfig","maxOutputTokens"],d);const p=s(t,["mediaResolution"]);e!==void 0&&p!=null&&r(e,["setup","generationConfig","mediaResolution"],p);const f=s(t,["seed"]);e!==void 0&&f!=null&&r(e,["setup","generationConfig","seed"],f);const h=s(t,["speechConfig"]);e!==void 0&&h!=null&&r(e,["setup","generationConfig","speechConfig"],h);const m=s(t,["systemInstruction"]);e!==void 0&&m!=null&&r(e,["setup","systemInstruction"],Zn(i,N(i,m)));const y=s(t,["tools"]);if(e!==void 0&&y!=null){let T=se(i,y);Array.isArray(T)&&(T=T.map(w=>ri(i,oe(i,w)))),r(e,["setup","tools"],T)}const b=s(t,["sessionResumption"]);e!==void 0&&b!=null&&r(e,["setup","sessionResumption"],li(i,b));const E=s(t,["inputAudioTranscription"]);e!==void 0&&E!=null&&r(e,["setup","inputAudioTranscription"],rt());const g=s(t,["outputAudioTranscription"]);e!==void 0&&g!=null&&r(e,["setup","outputAudioTranscription"],rt());const C=s(t,["realtimeInputConfig"]);e!==void 0&&C!=null&&r(e,["setup","realtimeInputConfig"],fi(i,C));const v=s(t,["contextWindowCompression"]);return e!==void 0&&v!=null&&r(e,["setup","contextWindowCompression"],yi(i,v)),n}function Ti(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["setup","model"],R(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],vi(i,o,e)),e}function bi(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["setup","model"],R(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],Ci(i,o,e)),e}function wi(){return{}}function Ei(){return{}}function Si(){return{}}function Ii(){return{}}function xi(i,t){const e={},n=s(t,["media"]);n!=null&&r(e,["mediaChunks"],It(i,n));const o=s(t,["audio"]);o!=null&&r(e,["audio"],Wt(i,o));const a=s(t,["audioStreamEnd"]);a!=null&&r(e,["audioStreamEnd"],a);const l=s(t,["video"]);l!=null&&r(e,["video"],$t(i,l));const c=s(t,["text"]);return c!=null&&r(e,["text"],c),s(t,["activityStart"])!=null&&r(e,["activityStart"],wi()),s(t,["activityEnd"])!=null&&r(e,["activityEnd"],Si()),e}function Ai(i,t){const e={},n=s(t,["media"]);if(n!=null&&r(e,["mediaChunks"],It(i,n)),s(t,["audio"])!==void 0)throw new Error("audio parameter is not supported in Vertex AI.");const o=s(t,["audioStreamEnd"]);if(o!=null&&r(e,["audioStreamEnd"],o),s(t,["video"])!==void 0)throw new Error("video parameter is not supported in Vertex AI.");if(s(t,["text"])!==void 0)throw new Error("text parameter is not supported in Vertex AI.");return s(t,["activityStart"])!=null&&r(e,["activityStart"],Ei()),s(t,["activityEnd"])!=null&&r(e,["activityEnd"],Ii()),e}function ki(){return{}}function _i(){return{}}function Ri(i,t){const e={},n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const o=s(t,["codeExecutionResult"]);o!=null&&r(e,["codeExecutionResult"],o);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const c=s(t,["functionCall"]);c!=null&&r(e,["functionCall"],c);const u=s(t,["functionResponse"]);u!=null&&r(e,["functionResponse"],u);const d=s(t,["inlineData"]);d!=null&&r(e,["inlineData"],d);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function Mi(i,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const o=s(t,["thought"]);o!=null&&r(e,["thought"],o);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const c=s(t,["fileData"]);c!=null&&r(e,["fileData"],c);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const d=s(t,["functionResponse"]);d!=null&&r(e,["functionResponse"],d);const p=s(t,["inlineData"]);p!=null&&r(e,["inlineData"],p);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function Pi(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Ri(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function Di(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Mi(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function at(i,t){const e={},n=s(t,["text"]);n!=null&&r(e,["text"],n);const o=s(t,["finished"]);return o!=null&&r(e,["finished"],o),e}function lt(i,t){const e={},n=s(t,["text"]);n!=null&&r(e,["text"],n);const o=s(t,["finished"]);return o!=null&&r(e,["finished"],o),e}function Ni(i,t){const e={},n=s(t,["modelTurn"]);n!=null&&r(e,["modelTurn"],Pi(i,n));const o=s(t,["turnComplete"]);o!=null&&r(e,["turnComplete"],o);const a=s(t,["interrupted"]);a!=null&&r(e,["interrupted"],a);const l=s(t,["groundingMetadata"]);l!=null&&r(e,["groundingMetadata"],l);const c=s(t,["generationComplete"]);c!=null&&r(e,["generationComplete"],c);const u=s(t,["inputTranscription"]);u!=null&&r(e,["inputTranscription"],at(i,u));const d=s(t,["outputTranscription"]);return d!=null&&r(e,["outputTranscription"],at(i,d)),e}function Li(i,t){const e={},n=s(t,["modelTurn"]);n!=null&&r(e,["modelTurn"],Di(i,n));const o=s(t,["turnComplete"]);o!=null&&r(e,["turnComplete"],o);const a=s(t,["interrupted"]);a!=null&&r(e,["interrupted"],a);const l=s(t,["groundingMetadata"]);l!=null&&r(e,["groundingMetadata"],l);const c=s(t,["generationComplete"]);c!=null&&r(e,["generationComplete"],c);const u=s(t,["inputTranscription"]);u!=null&&r(e,["inputTranscription"],lt(i,u));const d=s(t,["outputTranscription"]);return d!=null&&r(e,["outputTranscription"],lt(i,d)),e}function qi(i,t){const e={},n=s(t,["id"]);n!=null&&r(e,["id"],n);const o=s(t,["args"]);o!=null&&r(e,["args"],o);const a=s(t,["name"]);return a!=null&&r(e,["name"],a),e}function Fi(i,t){const e={},n=s(t,["args"]);n!=null&&r(e,["args"],n);const o=s(t,["name"]);return o!=null&&r(e,["name"],o),e}function Vi(i,t){const e={},n=s(t,["functionCalls"]);if(n!=null){let o=n;Array.isArray(o)&&(o=o.map(a=>qi(i,a))),r(e,["functionCalls"],o)}return e}function Ui(i,t){const e={},n=s(t,["functionCalls"]);if(n!=null){let o=n;Array.isArray(o)&&(o=o.map(a=>Fi(i,a))),r(e,["functionCalls"],o)}return e}function Bi(i,t){const e={},n=s(t,["ids"]);return n!=null&&r(e,["ids"],n),e}function Gi(i,t){const e={},n=s(t,["ids"]);return n!=null&&r(e,["ids"],n),e}function X(i,t){const e={},n=s(t,["modality"]);n!=null&&r(e,["modality"],n);const o=s(t,["tokenCount"]);return o!=null&&r(e,["tokenCount"],o),e}function Z(i,t){const e={},n=s(t,["modality"]);n!=null&&r(e,["modality"],n);const o=s(t,["tokenCount"]);return o!=null&&r(e,["tokenCount"],o),e}function Hi(i,t){const e={},n=s(t,["promptTokenCount"]);n!=null&&r(e,["promptTokenCount"],n);const o=s(t,["cachedContentTokenCount"]);o!=null&&r(e,["cachedContentTokenCount"],o);const a=s(t,["responseTokenCount"]);a!=null&&r(e,["responseTokenCount"],a);const l=s(t,["toolUsePromptTokenCount"]);l!=null&&r(e,["toolUsePromptTokenCount"],l);const c=s(t,["thoughtsTokenCount"]);c!=null&&r(e,["thoughtsTokenCount"],c);const u=s(t,["totalTokenCount"]);u!=null&&r(e,["totalTokenCount"],u);const d=s(t,["promptTokensDetails"]);if(d!=null){let m=d;Array.isArray(m)&&(m=m.map(y=>X(i,y))),r(e,["promptTokensDetails"],m)}const p=s(t,["cacheTokensDetails"]);if(p!=null){let m=p;Array.isArray(m)&&(m=m.map(y=>X(i,y))),r(e,["cacheTokensDetails"],m)}const f=s(t,["responseTokensDetails"]);if(f!=null){let m=f;Array.isArray(m)&&(m=m.map(y=>X(i,y))),r(e,["responseTokensDetails"],m)}const h=s(t,["toolUsePromptTokensDetails"]);if(h!=null){let m=h;Array.isArray(m)&&(m=m.map(y=>X(i,y))),r(e,["toolUsePromptTokensDetails"],m)}return e}function $i(i,t){const e={},n=s(t,["promptTokenCount"]);n!=null&&r(e,["promptTokenCount"],n);const o=s(t,["cachedContentTokenCount"]);o!=null&&r(e,["cachedContentTokenCount"],o);const a=s(t,["candidatesTokenCount"]);a!=null&&r(e,["responseTokenCount"],a);const l=s(t,["toolUsePromptTokenCount"]);l!=null&&r(e,["toolUsePromptTokenCount"],l);const c=s(t,["thoughtsTokenCount"]);c!=null&&r(e,["thoughtsTokenCount"],c);const u=s(t,["totalTokenCount"]);u!=null&&r(e,["totalTokenCount"],u);const d=s(t,["promptTokensDetails"]);if(d!=null){let y=d;Array.isArray(y)&&(y=y.map(b=>Z(i,b))),r(e,["promptTokensDetails"],y)}const p=s(t,["cacheTokensDetails"]);if(p!=null){let y=p;Array.isArray(y)&&(y=y.map(b=>Z(i,b))),r(e,["cacheTokensDetails"],y)}const f=s(t,["candidatesTokensDetails"]);if(f!=null){let y=f;Array.isArray(y)&&(y=y.map(b=>Z(i,b))),r(e,["responseTokensDetails"],y)}const h=s(t,["toolUsePromptTokensDetails"]);if(h!=null){let y=h;Array.isArray(y)&&(y=y.map(b=>Z(i,b))),r(e,["toolUsePromptTokensDetails"],y)}const m=s(t,["trafficType"]);return m!=null&&r(e,["trafficType"],m),e}function Wi(i,t){const e={},n=s(t,["timeLeft"]);return n!=null&&r(e,["timeLeft"],n),e}function zi(i,t){const e={},n=s(t,["timeLeft"]);return n!=null&&r(e,["timeLeft"],n),e}function Oi(i,t){const e={},n=s(t,["newHandle"]);n!=null&&r(e,["newHandle"],n);const o=s(t,["resumable"]);o!=null&&r(e,["resumable"],o);const a=s(t,["lastConsumedClientMessageIndex"]);return a!=null&&r(e,["lastConsumedClientMessageIndex"],a),e}function Yi(i,t){const e={},n=s(t,["newHandle"]);n!=null&&r(e,["newHandle"],n);const o=s(t,["resumable"]);o!=null&&r(e,["resumable"],o);const a=s(t,["lastConsumedClientMessageIndex"]);return a!=null&&r(e,["lastConsumedClientMessageIndex"],a),e}function Ji(i,t){const e={};s(t,["setupComplete"])!=null&&r(e,["setupComplete"],ki());const o=s(t,["serverContent"]);o!=null&&r(e,["serverContent"],Ni(i,o));const a=s(t,["toolCall"]);a!=null&&r(e,["toolCall"],Vi(i,a));const l=s(t,["toolCallCancellation"]);l!=null&&r(e,["toolCallCancellation"],Bi(i,l));const c=s(t,["usageMetadata"]);c!=null&&r(e,["usageMetadata"],Hi(i,c));const u=s(t,["goAway"]);u!=null&&r(e,["goAway"],Wi(i,u));const d=s(t,["sessionResumptionUpdate"]);return d!=null&&r(e,["sessionResumptionUpdate"],Oi(i,d)),e}function Ki(i,t){const e={};s(t,["setupComplete"])!=null&&r(e,["setupComplete"],_i());const o=s(t,["serverContent"]);o!=null&&r(e,["serverContent"],Li(i,o));const a=s(t,["toolCall"]);a!=null&&r(e,["toolCall"],Ui(i,a));const l=s(t,["toolCallCancellation"]);l!=null&&r(e,["toolCallCancellation"],Gi(i,l));const c=s(t,["usageMetadata"]);c!=null&&r(e,["usageMetadata"],$i(i,c));const u=s(t,["goAway"]);u!=null&&r(e,["goAway"],zi(i,u));const d=s(t,["sessionResumptionUpdate"]);return d!=null&&r(e,["sessionResumptionUpdate"],Yi(i,d)),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Qi(i,t){const e={};if(s(t,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const o=s(t,["codeExecutionResult"]);o!=null&&r(e,["codeExecutionResult"],o);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const c=s(t,["functionCall"]);c!=null&&r(e,["functionCall"],c);const u=s(t,["functionResponse"]);u!=null&&r(e,["functionResponse"],u);const d=s(t,["inlineData"]);d!=null&&r(e,["inlineData"],d);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function re(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Qi(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function Xi(i,t){const e={};if(s(t,["method"])!==void 0)throw new Error("method parameter is not supported in Gemini API.");const n=s(t,["category"]);n!=null&&r(e,["category"],n);const o=s(t,["threshold"]);return o!=null&&r(e,["threshold"],o),e}function Zi(){return{}}function ji(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["dynamicThreshold"]);return o!=null&&r(e,["dynamicThreshold"],o),e}function eo(i,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],ji(i,n)),e}function to(i,t){const e={};if(s(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");s(t,["googleSearch"])!=null&&r(e,["googleSearch"],Zi());const o=s(t,["googleSearchRetrieval"]);o!=null&&r(e,["googleSearchRetrieval"],eo(i,o));const a=s(t,["codeExecution"]);a!=null&&r(e,["codeExecution"],a);const l=s(t,["functionDeclarations"]);return l!=null&&r(e,["functionDeclarations"],l),e}function no(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["allowedFunctionNames"]);return o!=null&&r(e,["allowedFunctionNames"],o),e}function io(i,t){const e={},n=s(t,["functionCallingConfig"]);return n!=null&&r(e,["functionCallingConfig"],no(i,n)),e}function oo(i,t){const e={},n=s(t,["voiceName"]);return n!=null&&r(e,["voiceName"],n),e}function so(i,t){const e={},n=s(t,["prebuiltVoiceConfig"]);return n!=null&&r(e,["prebuiltVoiceConfig"],oo(i,n)),e}function ro(i,t){const e={},n=s(t,["voiceConfig"]);n!=null&&r(e,["voiceConfig"],so(i,n));const o=s(t,["languageCode"]);return o!=null&&r(e,["languageCode"],o),e}function ao(i,t){const e={},n=s(t,["includeThoughts"]);n!=null&&r(e,["includeThoughts"],n);const o=s(t,["thinkingBudget"]);return o!=null&&r(e,["thinkingBudget"],o),e}function lo(i,t,e){const n={},o=s(t,["systemInstruction"]);e!==void 0&&o!=null&&r(e,["systemInstruction"],re(i,N(i,o)));const a=s(t,["temperature"]);a!=null&&r(n,["temperature"],a);const l=s(t,["topP"]);l!=null&&r(n,["topP"],l);const c=s(t,["topK"]);c!=null&&r(n,["topK"],c);const u=s(t,["candidateCount"]);u!=null&&r(n,["candidateCount"],u);const d=s(t,["maxOutputTokens"]);d!=null&&r(n,["maxOutputTokens"],d);const p=s(t,["stopSequences"]);p!=null&&r(n,["stopSequences"],p);const f=s(t,["responseLogprobs"]);f!=null&&r(n,["responseLogprobs"],f);const h=s(t,["logprobs"]);h!=null&&r(n,["logprobs"],h);const m=s(t,["presencePenalty"]);m!=null&&r(n,["presencePenalty"],m);const y=s(t,["frequencyPenalty"]);y!=null&&r(n,["frequencyPenalty"],y);const b=s(t,["seed"]);b!=null&&r(n,["seed"],b);const E=s(t,["responseMimeType"]);E!=null&&r(n,["responseMimeType"],E);const g=s(t,["responseSchema"]);if(g!=null&&r(n,["responseSchema"],kt(i,g)),s(t,["routingConfig"])!==void 0)throw new Error("routingConfig parameter is not supported in Gemini API.");if(s(t,["modelSelectionConfig"])!==void 0)throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");const C=s(t,["safetySettings"]);if(e!==void 0&&C!=null){let _=C;Array.isArray(_)&&(_=_.map(q=>Xi(i,q))),r(e,["safetySettings"],_)}const v=s(t,["tools"]);if(e!==void 0&&v!=null){let _=se(i,v);Array.isArray(_)&&(_=_.map(q=>to(i,oe(i,q)))),r(e,["tools"],_)}const T=s(t,["toolConfig"]);if(e!==void 0&&T!=null&&r(e,["toolConfig"],io(i,T)),s(t,["labels"])!==void 0)throw new Error("labels parameter is not supported in Gemini API.");const w=s(t,["cachedContent"]);e!==void 0&&w!=null&&r(e,["cachedContent"],U(i,w));const I=s(t,["responseModalities"]);I!=null&&r(n,["responseModalities"],I);const x=s(t,["mediaResolution"]);x!=null&&r(n,["mediaResolution"],x);const A=s(t,["speechConfig"]);if(A!=null&&r(n,["speechConfig"],ro(i,_t(i,A))),s(t,["audioTimestamp"])!==void 0)throw new Error("audioTimestamp parameter is not supported in Gemini API.");const P=s(t,["thinkingConfig"]);return P!=null&&r(n,["thinkingConfig"],ao(i,P)),n}function ct(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],R(i,n));const o=s(t,["contents"]);if(o!=null){let l=V(i,o);Array.isArray(l)&&(l=l.map(c=>re(i,c))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["generationConfig"],lo(i,a,e)),e}function co(i,t,e){const n={},o=s(t,["taskType"]);e!==void 0&&o!=null&&r(e,["requests[]","taskType"],o);const a=s(t,["title"]);e!==void 0&&a!=null&&r(e,["requests[]","title"],a);const l=s(t,["outputDimensionality"]);if(e!==void 0&&l!=null&&r(e,["requests[]","outputDimensionality"],l),s(t,["mimeType"])!==void 0)throw new Error("mimeType parameter is not supported in Gemini API.");if(s(t,["autoTruncate"])!==void 0)throw new Error("autoTruncate parameter is not supported in Gemini API.");return n}function uo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],R(i,n));const o=s(t,["contents"]);o!=null&&r(e,["requests[]","content"],At(i,o));const a=s(t,["config"]);a!=null&&r(e,["config"],co(i,a,e));const l=s(t,["model"]);return l!==void 0&&r(e,["requests[]","model"],R(i,l)),e}function po(i,t,e){const n={};if(s(t,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(s(t,["negativePrompt"])!==void 0)throw new Error("negativePrompt parameter is not supported in Gemini API.");const o=s(t,["numberOfImages"]);e!==void 0&&o!=null&&r(e,["parameters","sampleCount"],o);const a=s(t,["aspectRatio"]);e!==void 0&&a!=null&&r(e,["parameters","aspectRatio"],a);const l=s(t,["guidanceScale"]);if(e!==void 0&&l!=null&&r(e,["parameters","guidanceScale"],l),s(t,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const c=s(t,["safetyFilterLevel"]);e!==void 0&&c!=null&&r(e,["parameters","safetySetting"],c);const u=s(t,["personGeneration"]);e!==void 0&&u!=null&&r(e,["parameters","personGeneration"],u);const d=s(t,["includeSafetyAttributes"]);e!==void 0&&d!=null&&r(e,["parameters","includeSafetyAttributes"],d);const p=s(t,["includeRaiReason"]);e!==void 0&&p!=null&&r(e,["parameters","includeRaiReason"],p);const f=s(t,["language"]);e!==void 0&&f!=null&&r(e,["parameters","language"],f);const h=s(t,["outputMimeType"]);e!==void 0&&h!=null&&r(e,["parameters","outputOptions","mimeType"],h);const m=s(t,["outputCompressionQuality"]);if(e!==void 0&&m!=null&&r(e,["parameters","outputOptions","compressionQuality"],m),s(t,["addWatermark"])!==void 0)throw new Error("addWatermark parameter is not supported in Gemini API.");if(s(t,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return n}function fo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],R(i,n));const o=s(t,["prompt"]);o!=null&&r(e,["instances[0]","prompt"],o);const a=s(t,["config"]);return a!=null&&r(e,["config"],po(i,a,e)),e}function ho(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],R(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function mo(i,t,e){const n={},o=s(t,["displayName"]);e!==void 0&&o!=null&&r(e,["displayName"],o);const a=s(t,["description"]);return e!==void 0&&a!=null&&r(e,["description"],a),n}function go(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],R(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],mo(i,o,e)),e}function yo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],R(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function vo(i,t){const e={};if(s(t,["systemInstruction"])!==void 0)throw new Error("systemInstruction parameter is not supported in Gemini API.");if(s(t,["tools"])!==void 0)throw new Error("tools parameter is not supported in Gemini API.");if(s(t,["generationConfig"])!==void 0)throw new Error("generationConfig parameter is not supported in Gemini API.");return e}function Co(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],R(i,n));const o=s(t,["contents"]);if(o!=null){let l=V(i,o);Array.isArray(l)&&(l=l.map(c=>re(i,c))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["config"],vo(i,a)),e}function To(i,t){const e={};if(s(t,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");const n=s(t,["imageBytes"]);n!=null&&r(e,["bytesBase64Encoded"],B(i,n));const o=s(t,["mimeType"]);return o!=null&&r(e,["mimeType"],o),e}function bo(i,t,e){const n={},o=s(t,["numberOfVideos"]);if(e!==void 0&&o!=null&&r(e,["parameters","sampleCount"],o),s(t,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(s(t,["fps"])!==void 0)throw new Error("fps parameter is not supported in Gemini API.");const a=s(t,["durationSeconds"]);if(e!==void 0&&a!=null&&r(e,["parameters","durationSeconds"],a),s(t,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const l=s(t,["aspectRatio"]);if(e!==void 0&&l!=null&&r(e,["parameters","aspectRatio"],l),s(t,["resolution"])!==void 0)throw new Error("resolution parameter is not supported in Gemini API.");const c=s(t,["personGeneration"]);if(e!==void 0&&c!=null&&r(e,["parameters","personGeneration"],c),s(t,["pubsubTopic"])!==void 0)throw new Error("pubsubTopic parameter is not supported in Gemini API.");const u=s(t,["negativePrompt"]);if(e!==void 0&&u!=null&&r(e,["parameters","negativePrompt"],u),s(t,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return n}function wo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],R(i,n));const o=s(t,["prompt"]);o!=null&&r(e,["instances[0]","prompt"],o);const a=s(t,["image"]);a!=null&&r(e,["instances[0]","image"],To(i,a));const l=s(t,["config"]);return l!=null&&r(e,["config"],bo(i,l,e)),e}function Eo(i,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const o=s(t,["thought"]);o!=null&&r(e,["thought"],o);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const c=s(t,["fileData"]);c!=null&&r(e,["fileData"],c);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const d=s(t,["functionResponse"]);d!=null&&r(e,["functionResponse"],d);const p=s(t,["inlineData"]);p!=null&&r(e,["inlineData"],p);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function H(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Eo(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function So(i,t){const e={},n=s(t,["featureSelectionPreference"]);return n!=null&&r(e,["featureSelectionPreference"],n),e}function Io(i,t){const e={},n=s(t,["method"]);n!=null&&r(e,["method"],n);const o=s(t,["category"]);o!=null&&r(e,["category"],o);const a=s(t,["threshold"]);return a!=null&&r(e,["threshold"],a),e}function xo(){return{}}function Ao(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["dynamicThreshold"]);return o!=null&&r(e,["dynamicThreshold"],o),e}function ko(i,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],Ao(i,n)),e}function Dt(i,t){const e={},n=s(t,["retrieval"]);n!=null&&r(e,["retrieval"],n),s(t,["googleSearch"])!=null&&r(e,["googleSearch"],xo());const a=s(t,["googleSearchRetrieval"]);a!=null&&r(e,["googleSearchRetrieval"],ko(i,a));const l=s(t,["codeExecution"]);l!=null&&r(e,["codeExecution"],l);const c=s(t,["functionDeclarations"]);return c!=null&&r(e,["functionDeclarations"],c),e}function _o(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["allowedFunctionNames"]);return o!=null&&r(e,["allowedFunctionNames"],o),e}function Ro(i,t){const e={},n=s(t,["functionCallingConfig"]);return n!=null&&r(e,["functionCallingConfig"],_o(i,n)),e}function Mo(i,t){const e={},n=s(t,["voiceName"]);return n!=null&&r(e,["voiceName"],n),e}function Po(i,t){const e={},n=s(t,["prebuiltVoiceConfig"]);return n!=null&&r(e,["prebuiltVoiceConfig"],Mo(i,n)),e}function Do(i,t){const e={},n=s(t,["voiceConfig"]);n!=null&&r(e,["voiceConfig"],Po(i,n));const o=s(t,["languageCode"]);return o!=null&&r(e,["languageCode"],o),e}function No(i,t){const e={},n=s(t,["includeThoughts"]);n!=null&&r(e,["includeThoughts"],n);const o=s(t,["thinkingBudget"]);return o!=null&&r(e,["thinkingBudget"],o),e}function Lo(i,t,e){const n={},o=s(t,["systemInstruction"]);e!==void 0&&o!=null&&r(e,["systemInstruction"],H(i,N(i,o)));const a=s(t,["temperature"]);a!=null&&r(n,["temperature"],a);const l=s(t,["topP"]);l!=null&&r(n,["topP"],l);const c=s(t,["topK"]);c!=null&&r(n,["topK"],c);const u=s(t,["candidateCount"]);u!=null&&r(n,["candidateCount"],u);const d=s(t,["maxOutputTokens"]);d!=null&&r(n,["maxOutputTokens"],d);const p=s(t,["stopSequences"]);p!=null&&r(n,["stopSequences"],p);const f=s(t,["responseLogprobs"]);f!=null&&r(n,["responseLogprobs"],f);const h=s(t,["logprobs"]);h!=null&&r(n,["logprobs"],h);const m=s(t,["presencePenalty"]);m!=null&&r(n,["presencePenalty"],m);const y=s(t,["frequencyPenalty"]);y!=null&&r(n,["frequencyPenalty"],y);const b=s(t,["seed"]);b!=null&&r(n,["seed"],b);const E=s(t,["responseMimeType"]);E!=null&&r(n,["responseMimeType"],E);const g=s(t,["responseSchema"]);g!=null&&r(n,["responseSchema"],kt(i,g));const C=s(t,["routingConfig"]);C!=null&&r(n,["routingConfig"],C);const v=s(t,["modelSelectionConfig"]);v!=null&&r(n,["modelConfig"],So(i,v));const T=s(t,["safetySettings"]);if(e!==void 0&&T!=null){let F=T;Array.isArray(F)&&(F=F.map(ae=>Io(i,ae))),r(e,["safetySettings"],F)}const w=s(t,["tools"]);if(e!==void 0&&w!=null){let F=se(i,w);Array.isArray(F)&&(F=F.map(ae=>Dt(i,oe(i,ae)))),r(e,["tools"],F)}const I=s(t,["toolConfig"]);e!==void 0&&I!=null&&r(e,["toolConfig"],Ro(i,I));const x=s(t,["labels"]);e!==void 0&&x!=null&&r(e,["labels"],x);const A=s(t,["cachedContent"]);e!==void 0&&A!=null&&r(e,["cachedContent"],U(i,A));const P=s(t,["responseModalities"]);P!=null&&r(n,["responseModalities"],P);const _=s(t,["mediaResolution"]);_!=null&&r(n,["mediaResolution"],_);const q=s(t,["speechConfig"]);q!=null&&r(n,["speechConfig"],Do(i,_t(i,q)));const K=s(t,["audioTimestamp"]);K!=null&&r(n,["audioTimestamp"],K);const ye=s(t,["thinkingConfig"]);return ye!=null&&r(n,["thinkingConfig"],No(i,ye)),n}function dt(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],R(i,n));const o=s(t,["contents"]);if(o!=null){let l=V(i,o);Array.isArray(l)&&(l=l.map(c=>H(i,c))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["generationConfig"],Lo(i,a,e)),e}function qo(i,t,e){const n={},o=s(t,["taskType"]);e!==void 0&&o!=null&&r(e,["instances[]","task_type"],o);const a=s(t,["title"]);e!==void 0&&a!=null&&r(e,["instances[]","title"],a);const l=s(t,["outputDimensionality"]);e!==void 0&&l!=null&&r(e,["parameters","outputDimensionality"],l);const c=s(t,["mimeType"]);e!==void 0&&c!=null&&r(e,["instances[]","mimeType"],c);const u=s(t,["autoTruncate"]);return e!==void 0&&u!=null&&r(e,["parameters","autoTruncate"],u),n}function Fo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],R(i,n));const o=s(t,["contents"]);o!=null&&r(e,["instances[]","content"],At(i,o));const a=s(t,["config"]);return a!=null&&r(e,["config"],qo(i,a,e)),e}function Vo(i,t,e){const n={},o=s(t,["outputGcsUri"]);e!==void 0&&o!=null&&r(e,["parameters","storageUri"],o);const a=s(t,["negativePrompt"]);e!==void 0&&a!=null&&r(e,["parameters","negativePrompt"],a);const l=s(t,["numberOfImages"]);e!==void 0&&l!=null&&r(e,["parameters","sampleCount"],l);const c=s(t,["aspectRatio"]);e!==void 0&&c!=null&&r(e,["parameters","aspectRatio"],c);const u=s(t,["guidanceScale"]);e!==void 0&&u!=null&&r(e,["parameters","guidanceScale"],u);const d=s(t,["seed"]);e!==void 0&&d!=null&&r(e,["parameters","seed"],d);const p=s(t,["safetyFilterLevel"]);e!==void 0&&p!=null&&r(e,["parameters","safetySetting"],p);const f=s(t,["personGeneration"]);e!==void 0&&f!=null&&r(e,["parameters","personGeneration"],f);const h=s(t,["includeSafetyAttributes"]);e!==void 0&&h!=null&&r(e,["parameters","includeSafetyAttributes"],h);const m=s(t,["includeRaiReason"]);e!==void 0&&m!=null&&r(e,["parameters","includeRaiReason"],m);const y=s(t,["language"]);e!==void 0&&y!=null&&r(e,["parameters","language"],y);const b=s(t,["outputMimeType"]);e!==void 0&&b!=null&&r(e,["parameters","outputOptions","mimeType"],b);const E=s(t,["outputCompressionQuality"]);e!==void 0&&E!=null&&r(e,["parameters","outputOptions","compressionQuality"],E);const g=s(t,["addWatermark"]);e!==void 0&&g!=null&&r(e,["parameters","addWatermark"],g);const C=s(t,["enhancePrompt"]);return e!==void 0&&C!=null&&r(e,["parameters","enhancePrompt"],C),n}function Uo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],R(i,n));const o=s(t,["prompt"]);o!=null&&r(e,["instances[0]","prompt"],o);const a=s(t,["config"]);return a!=null&&r(e,["config"],Vo(i,a,e)),e}function Bo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],R(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function Go(i,t,e){const n={},o=s(t,["displayName"]);e!==void 0&&o!=null&&r(e,["displayName"],o);const a=s(t,["description"]);return e!==void 0&&a!=null&&r(e,["description"],a),n}function Ho(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],R(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],Go(i,o,e)),e}function $o(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],R(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function Wo(i,t,e){const n={},o=s(t,["systemInstruction"]);e!==void 0&&o!=null&&r(e,["systemInstruction"],H(i,N(i,o)));const a=s(t,["tools"]);if(e!==void 0&&a!=null){let c=a;Array.isArray(c)&&(c=c.map(u=>Dt(i,u))),r(e,["tools"],c)}const l=s(t,["generationConfig"]);return e!==void 0&&l!=null&&r(e,["generationConfig"],l),n}function zo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],R(i,n));const o=s(t,["contents"]);if(o!=null){let l=V(i,o);Array.isArray(l)&&(l=l.map(c=>H(i,c))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["config"],Wo(i,a,e)),e}function Oo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],R(i,n));const o=s(t,["contents"]);if(o!=null){let l=V(i,o);Array.isArray(l)&&(l=l.map(c=>H(i,c))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["config"],a),e}function Yo(i,t){const e={},n=s(t,["gcsUri"]);n!=null&&r(e,["gcsUri"],n);const o=s(t,["imageBytes"]);o!=null&&r(e,["bytesBase64Encoded"],B(i,o));const a=s(t,["mimeType"]);return a!=null&&r(e,["mimeType"],a),e}function Jo(i,t,e){const n={},o=s(t,["numberOfVideos"]);e!==void 0&&o!=null&&r(e,["parameters","sampleCount"],o);const a=s(t,["outputGcsUri"]);e!==void 0&&a!=null&&r(e,["parameters","storageUri"],a);const l=s(t,["fps"]);e!==void 0&&l!=null&&r(e,["parameters","fps"],l);const c=s(t,["durationSeconds"]);e!==void 0&&c!=null&&r(e,["parameters","durationSeconds"],c);const u=s(t,["seed"]);e!==void 0&&u!=null&&r(e,["parameters","seed"],u);const d=s(t,["aspectRatio"]);e!==void 0&&d!=null&&r(e,["parameters","aspectRatio"],d);const p=s(t,["resolution"]);e!==void 0&&p!=null&&r(e,["parameters","resolution"],p);const f=s(t,["personGeneration"]);e!==void 0&&f!=null&&r(e,["parameters","personGeneration"],f);const h=s(t,["pubsubTopic"]);e!==void 0&&h!=null&&r(e,["parameters","pubsubTopic"],h);const m=s(t,["negativePrompt"]);e!==void 0&&m!=null&&r(e,["parameters","negativePrompt"],m);const y=s(t,["enhancePrompt"]);return e!==void 0&&y!=null&&r(e,["parameters","enhancePrompt"],y),n}function Ko(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],R(i,n));const o=s(t,["prompt"]);o!=null&&r(e,["instances[0]","prompt"],o);const a=s(t,["image"]);a!=null&&r(e,["instances[0]","image"],Yo(i,a));const l=s(t,["config"]);return l!=null&&r(e,["config"],Jo(i,l,e)),e}function Qo(i,t){const e={},n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const o=s(t,["codeExecutionResult"]);o!=null&&r(e,["codeExecutionResult"],o);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const c=s(t,["functionCall"]);c!=null&&r(e,["functionCall"],c);const u=s(t,["functionResponse"]);u!=null&&r(e,["functionResponse"],u);const d=s(t,["inlineData"]);d!=null&&r(e,["inlineData"],d);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function Xo(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Qo(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function Zo(i,t){const e={},n=s(t,["citationSources"]);return n!=null&&r(e,["citations"],n),e}function jo(i,t){const e={},n=s(t,["content"]);n!=null&&r(e,["content"],Xo(i,n));const o=s(t,["citationMetadata"]);o!=null&&r(e,["citationMetadata"],Zo(i,o));const a=s(t,["tokenCount"]);a!=null&&r(e,["tokenCount"],a);const l=s(t,["finishReason"]);l!=null&&r(e,["finishReason"],l);const c=s(t,["avgLogprobs"]);c!=null&&r(e,["avgLogprobs"],c);const u=s(t,["groundingMetadata"]);u!=null&&r(e,["groundingMetadata"],u);const d=s(t,["index"]);d!=null&&r(e,["index"],d);const p=s(t,["logprobsResult"]);p!=null&&r(e,["logprobsResult"],p);const f=s(t,["safetyRatings"]);return f!=null&&r(e,["safetyRatings"],f),e}function ut(i,t){const e={},n=s(t,["candidates"]);if(n!=null){let c=n;Array.isArray(c)&&(c=c.map(u=>jo(i,u))),r(e,["candidates"],c)}const o=s(t,["modelVersion"]);o!=null&&r(e,["modelVersion"],o);const a=s(t,["promptFeedback"]);a!=null&&r(e,["promptFeedback"],a);const l=s(t,["usageMetadata"]);return l!=null&&r(e,["usageMetadata"],l),e}function es(i,t){const e={},n=s(t,["values"]);return n!=null&&r(e,["values"],n),e}function ts(){return{}}function ns(i,t){const e={},n=s(t,["embeddings"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>es(i,l))),r(e,["embeddings"],a)}return s(t,["metadata"])!=null&&r(e,["metadata"],ts()),e}function is(i,t){const e={},n=s(t,["bytesBase64Encoded"]);n!=null&&r(e,["imageBytes"],B(i,n));const o=s(t,["mimeType"]);return o!=null&&r(e,["mimeType"],o),e}function Nt(i,t){const e={},n=s(t,["safetyAttributes","categories"]);n!=null&&r(e,["categories"],n);const o=s(t,["safetyAttributes","scores"]);o!=null&&r(e,["scores"],o);const a=s(t,["contentType"]);return a!=null&&r(e,["contentType"],a),e}function os(i,t){const e={},n=s(t,["_self"]);n!=null&&r(e,["image"],is(i,n));const o=s(t,["raiFilteredReason"]);o!=null&&r(e,["raiFilteredReason"],o);const a=s(t,["_self"]);return a!=null&&r(e,["safetyAttributes"],Nt(i,a)),e}function ss(i,t){const e={},n=s(t,["predictions"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>os(i,l))),r(e,["generatedImages"],a)}const o=s(t,["positivePromptSafetyAttributes"]);return o!=null&&r(e,["positivePromptSafetyAttributes"],Nt(i,o)),e}function rs(i,t){const e={},n=s(t,["baseModel"]);n!=null&&r(e,["baseModel"],n);const o=s(t,["createTime"]);o!=null&&r(e,["createTime"],o);const a=s(t,["updateTime"]);return a!=null&&r(e,["updateTime"],a),e}function pt(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["displayName"]);o!=null&&r(e,["displayName"],o);const a=s(t,["description"]);a!=null&&r(e,["description"],a);const l=s(t,["version"]);l!=null&&r(e,["version"],l);const c=s(t,["_self"]);c!=null&&r(e,["tunedModelInfo"],rs(i,c));const u=s(t,["inputTokenLimit"]);u!=null&&r(e,["inputTokenLimit"],u);const d=s(t,["outputTokenLimit"]);d!=null&&r(e,["outputTokenLimit"],d);const p=s(t,["supportedGenerationMethods"]);return p!=null&&r(e,["supportedActions"],p),e}function as(){return{}}function ls(i,t){const e={},n=s(t,["totalTokens"]);n!=null&&r(e,["totalTokens"],n);const o=s(t,["cachedContentTokenCount"]);return o!=null&&r(e,["cachedContentTokenCount"],o),e}function cs(i,t){const e={},n=s(t,["video","uri"]);n!=null&&r(e,["uri"],n);const o=s(t,["video","encodedVideo"]);o!=null&&r(e,["videoBytes"],B(i,o));const a=s(t,["encoding"]);return a!=null&&r(e,["mimeType"],a),e}function ds(i,t){const e={},n=s(t,["_self"]);return n!=null&&r(e,["video"],cs(i,n)),e}function us(i,t){const e={},n=s(t,["generatedSamples"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(c=>ds(i,c))),r(e,["generatedVideos"],l)}const o=s(t,["raiMediaFilteredCount"]);o!=null&&r(e,["raiMediaFilteredCount"],o);const a=s(t,["raiMediaFilteredReasons"]);return a!=null&&r(e,["raiMediaFilteredReasons"],a),e}function ps(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["metadata"]);o!=null&&r(e,["metadata"],o);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);l!=null&&r(e,["error"],l);const c=s(t,["response","generateVideoResponse"]);return c!=null&&r(e,["response"],us(i,c)),e}function fs(i,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const o=s(t,["thought"]);o!=null&&r(e,["thought"],o);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const c=s(t,["fileData"]);c!=null&&r(e,["fileData"],c);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const d=s(t,["functionResponse"]);d!=null&&r(e,["functionResponse"],d);const p=s(t,["inlineData"]);p!=null&&r(e,["inlineData"],p);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function hs(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>fs(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function ms(i,t){const e={},n=s(t,["citations"]);return n!=null&&r(e,["citations"],n),e}function gs(i,t){const e={},n=s(t,["content"]);n!=null&&r(e,["content"],hs(i,n));const o=s(t,["citationMetadata"]);o!=null&&r(e,["citationMetadata"],ms(i,o));const a=s(t,["finishMessage"]);a!=null&&r(e,["finishMessage"],a);const l=s(t,["finishReason"]);l!=null&&r(e,["finishReason"],l);const c=s(t,["avgLogprobs"]);c!=null&&r(e,["avgLogprobs"],c);const u=s(t,["groundingMetadata"]);u!=null&&r(e,["groundingMetadata"],u);const d=s(t,["index"]);d!=null&&r(e,["index"],d);const p=s(t,["logprobsResult"]);p!=null&&r(e,["logprobsResult"],p);const f=s(t,["safetyRatings"]);return f!=null&&r(e,["safetyRatings"],f),e}function ft(i,t){const e={},n=s(t,["candidates"]);if(n!=null){let d=n;Array.isArray(d)&&(d=d.map(p=>gs(i,p))),r(e,["candidates"],d)}const o=s(t,["createTime"]);o!=null&&r(e,["createTime"],o);const a=s(t,["responseId"]);a!=null&&r(e,["responseId"],a);const l=s(t,["modelVersion"]);l!=null&&r(e,["modelVersion"],l);const c=s(t,["promptFeedback"]);c!=null&&r(e,["promptFeedback"],c);const u=s(t,["usageMetadata"]);return u!=null&&r(e,["usageMetadata"],u),e}function ys(i,t){const e={},n=s(t,["truncated"]);n!=null&&r(e,["truncated"],n);const o=s(t,["token_count"]);return o!=null&&r(e,["tokenCount"],o),e}function vs(i,t){const e={},n=s(t,["values"]);n!=null&&r(e,["values"],n);const o=s(t,["statistics"]);return o!=null&&r(e,["statistics"],ys(i,o)),e}function Cs(i,t){const e={},n=s(t,["billableCharacterCount"]);return n!=null&&r(e,["billableCharacterCount"],n),e}function Ts(i,t){const e={},n=s(t,["predictions[]","embeddings"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>vs(i,l))),r(e,["embeddings"],a)}const o=s(t,["metadata"]);return o!=null&&r(e,["metadata"],Cs(i,o)),e}function bs(i,t){const e={},n=s(t,["gcsUri"]);n!=null&&r(e,["gcsUri"],n);const o=s(t,["bytesBase64Encoded"]);o!=null&&r(e,["imageBytes"],B(i,o));const a=s(t,["mimeType"]);return a!=null&&r(e,["mimeType"],a),e}function Lt(i,t){const e={},n=s(t,["safetyAttributes","categories"]);n!=null&&r(e,["categories"],n);const o=s(t,["safetyAttributes","scores"]);o!=null&&r(e,["scores"],o);const a=s(t,["contentType"]);return a!=null&&r(e,["contentType"],a),e}function ws(i,t){const e={},n=s(t,["_self"]);n!=null&&r(e,["image"],bs(i,n));const o=s(t,["raiFilteredReason"]);o!=null&&r(e,["raiFilteredReason"],o);const a=s(t,["_self"]);a!=null&&r(e,["safetyAttributes"],Lt(i,a));const l=s(t,["prompt"]);return l!=null&&r(e,["enhancedPrompt"],l),e}function Es(i,t){const e={},n=s(t,["predictions"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>ws(i,l))),r(e,["generatedImages"],a)}const o=s(t,["positivePromptSafetyAttributes"]);return o!=null&&r(e,["positivePromptSafetyAttributes"],Lt(i,o)),e}function Ss(i,t){const e={},n=s(t,["endpoint"]);n!=null&&r(e,["name"],n);const o=s(t,["deployedModelId"]);return o!=null&&r(e,["deployedModelId"],o),e}function Is(i,t){const e={},n=s(t,["labels","google-vertex-llm-tuning-base-model-id"]);n!=null&&r(e,["baseModel"],n);const o=s(t,["createTime"]);o!=null&&r(e,["createTime"],o);const a=s(t,["updateTime"]);return a!=null&&r(e,["updateTime"],a),e}function ht(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["displayName"]);o!=null&&r(e,["displayName"],o);const a=s(t,["description"]);a!=null&&r(e,["description"],a);const l=s(t,["versionId"]);l!=null&&r(e,["version"],l);const c=s(t,["deployedModels"]);if(c!=null){let p=c;Array.isArray(p)&&(p=p.map(f=>Ss(i,f))),r(e,["endpoints"],p)}const u=s(t,["labels"]);u!=null&&r(e,["labels"],u);const d=s(t,["_self"]);return d!=null&&r(e,["tunedModelInfo"],Is(i,d)),e}function xs(){return{}}function As(i,t){const e={},n=s(t,["totalTokens"]);return n!=null&&r(e,["totalTokens"],n),e}function ks(i,t){const e={},n=s(t,["tokensInfo"]);return n!=null&&r(e,["tokensInfo"],n),e}function _s(i,t){const e={},n=s(t,["gcsUri"]);n!=null&&r(e,["uri"],n);const o=s(t,["bytesBase64Encoded"]);o!=null&&r(e,["videoBytes"],B(i,o));const a=s(t,["mimeType"]);return a!=null&&r(e,["mimeType"],a),e}function Rs(i,t){const e={},n=s(t,["_self"]);return n!=null&&r(e,["video"],_s(i,n)),e}function Ms(i,t){const e={},n=s(t,["videos"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(c=>Rs(i,c))),r(e,["generatedVideos"],l)}const o=s(t,["raiMediaFilteredCount"]);o!=null&&r(e,["raiMediaFilteredCount"],o);const a=s(t,["raiMediaFilteredReasons"]);return a!=null&&r(e,["raiMediaFilteredReasons"],a),e}function Ps(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["metadata"]);o!=null&&r(e,["metadata"],o);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);l!=null&&r(e,["error"],l);const c=s(t,["response"]);return c!=null&&r(e,["response"],Ms(i,c)),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ds="FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";async function Ns(i,t,e){let n,o;e.data instanceof Blob?o=JSON.parse(await e.data.text()):o=JSON.parse(e.data),i.isVertexAI()?n=Ki(i,o):n=Ji(i,o),t(n)}class Ls{constructor(t,e,n){this.apiClient=t,this.auth=e,this.webSocketFactory=n}async connect(t){var e,n,o,a;const l=this.apiClient.getWebsocketBaseUrl(),c=this.apiClient.getApiVersion();let u;const d=Us(this.apiClient.getDefaultHeaders());if(this.apiClient.isVertexAI())u=`${l}/ws/google.cloud.aiplatform.${c}.LlmBidiService/BidiGenerateContent`,await this.auth.addAuthHeaders(d);else{const T=this.apiClient.getApiKey();u=`${l}/ws/google.ai.generativelanguage.${c}.GenerativeService.BidiGenerateContent?key=${T}`}let p=()=>{};const f=new Promise(T=>{p=T}),h=t.callbacks,m=function(){var T;(T=h==null?void 0:h.onopen)===null||T===void 0||T.call(h),p({})},y=this.apiClient,b={onopen:m,onmessage:T=>{Ns(y,h.onmessage,T)},onerror:(e=h==null?void 0:h.onerror)!==null&&e!==void 0?e:function(T){},onclose:(n=h==null?void 0:h.onclose)!==null&&n!==void 0?n:function(T){}},E=this.webSocketFactory.create(u,Vs(d),b);E.connect(),await f;let g=R(this.apiClient,t.model);if(this.apiClient.isVertexAI()&&g.startsWith("publishers/")){const T=this.apiClient.getProject(),w=this.apiClient.getLocation();g=`projects/${T}/locations/${w}/`+g}let C={};this.apiClient.isVertexAI()&&((o=t.config)===null||o===void 0?void 0:o.responseModalities)===void 0&&(t.config===void 0?t.config={responseModalities:[ne.AUDIO]}:t.config.responseModalities=[ne.AUDIO]),!((a=t.config)===null||a===void 0)&&a.generationConfig&&console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");const v={model:g,config:t.config,callbacks:t.callbacks};return this.apiClient.isVertexAI()?C=bi(this.apiClient,v):C=Ti(this.apiClient,v),delete C.config,E.send(JSON.stringify(C)),new Fs(E,this.apiClient)}}const qs={turnComplete:!0};class Fs{constructor(t,e){this.conn=t,this.apiClient=e}tLiveClientContent(t,e){if(e.turns!==null&&e.turns!==void 0){let n=[];try{n=V(t,e.turns),t.isVertexAI()?n=n.map(o=>H(t,o)):n=n.map(o=>re(t,o))}catch{throw new Error(`Failed to parse client content "turns", type: '${typeof e.turns}'`)}return{clientContent:{turns:n,turnComplete:e.turnComplete}}}return{clientContent:{turnComplete:e.turnComplete}}}tLiveClienttToolResponse(t,e){let n=[];if(e.functionResponses==null)throw new Error("functionResponses is required.");if(Array.isArray(e.functionResponses)?n=e.functionResponses:n=[e.functionResponses],n.length===0)throw new Error("functionResponses is required.");for(const a of n){if(typeof a!="object"||a===null||!("name"in a)||!("response"in a))throw new Error(`Could not parse function response, type '${typeof a}'.`);if(!t.isVertexAI()&&!("id"in a))throw new Error(Ds)}return{toolResponse:{functionResponses:n}}}sendClientContent(t){t=Object.assign(Object.assign({},qs),t);const e=this.tLiveClientContent(this.apiClient,t);this.conn.send(JSON.stringify(e))}sendRealtimeInput(t){let e={};this.apiClient.isVertexAI()?e={realtimeInput:Ai(this.apiClient,t)}:e={realtimeInput:xi(this.apiClient,t)},this.conn.send(JSON.stringify(e))}sendToolResponse(t){if(t.functionResponses==null)throw new Error("Tool response parameters are required.");const e=this.tLiveClienttToolResponse(this.apiClient,t);this.conn.send(JSON.stringify(e))}close(){this.conn.close()}}function Vs(i){const t={};return i.forEach((e,n)=>{t[n]=e}),t}function Us(i){const t=new Headers;for(const[e,n]of Object.entries(i))t.append(e,n);return t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Bs extends J{constructor(t){super(),this.apiClient=t,this.generateContent=async e=>await this.generateContentInternal(e),this.generateContentStream=async e=>await this.generateContentStreamInternal(e),this.generateImages=async e=>await this.generateImagesInternal(e).then(n=>{var o;let a;const l=[];if(n!=null&&n.generatedImages)for(const u of n.generatedImages)u&&(u!=null&&u.safetyAttributes)&&((o=u==null?void 0:u.safetyAttributes)===null||o===void 0?void 0:o.contentType)==="Positive Prompt"?a=u==null?void 0:u.safetyAttributes:l.push(u);let c;return a?c={generatedImages:l,positivePromptSafetyAttributes:a}:c={generatedImages:l},c})}async generateContentInternal(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=dt(this.apiClient,t);return c=S("{model}:generateContent",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=ft(this.apiClient,p),h=new Q;return Object.assign(h,f),h})}else{const d=ct(this.apiClient,t);return c=S("{model}:generateContent",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>{const f=ut(this.apiClient,p),h=new Q;return Object.assign(h,f),h})}}async generateContentStreamInternal(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=dt(this.apiClient,t);c=S("{model}:streamGenerateContent?alt=sse",d._url),u=d._query,delete d.config,delete d._url,delete d._query;const p=this.apiClient;return l=p.requestStream({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}),l.then(function(f){return ie(this,arguments,function*(){var h,m,y,b;try{for(var E=!0,g=pe(f),C;C=yield D(g.next()),h=C.done,!h;E=!0){b=C.value,E=!1;const T=ft(p,yield D(b.json())),w=new Q;Object.assign(w,T),yield yield D(w)}}catch(v){m={error:v}}finally{try{!E&&!h&&(y=g.return)&&(yield D(y.call(g)))}finally{if(m)throw m.error}}})})}else{const d=ct(this.apiClient,t);c=S("{model}:streamGenerateContent?alt=sse",d._url),u=d._query,delete d.config,delete d._url,delete d._query;const p=this.apiClient;return l=p.requestStream({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}),l.then(function(f){return ie(this,arguments,function*(){var h,m,y,b;try{for(var E=!0,g=pe(f),C;C=yield D(g.next()),h=C.done,!h;E=!0){b=C.value,E=!1;const T=ut(p,yield D(b.json())),w=new Q;Object.assign(w,T),yield yield D(w)}}catch(v){m={error:v}}finally{try{!E&&!h&&(y=g.return)&&(yield D(y.call(g)))}finally{if(m)throw m.error}}})})}}async embedContent(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Fo(this.apiClient,t);return c=S("{model}:predict",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Ts(this.apiClient,p),h=new Ze;return Object.assign(h,f),h})}else{const d=uo(this.apiClient,t);return c=S("{model}:batchEmbedContents",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>{const f=ns(this.apiClient,p),h=new Ze;return Object.assign(h,f),h})}}async generateImagesInternal(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Uo(this.apiClient,t);return c=S("{model}:predict",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Es(this.apiClient,p),h=new je;return Object.assign(h,f),h})}else{const d=fo(this.apiClient,t);return c=S("{model}:predict",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>{const f=ss(this.apiClient,p),h=new je;return Object.assign(h,f),h})}}async get(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Bo(this.apiClient,t);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>ht(this.apiClient,p))}else{const d=ho(this.apiClient,t);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>pt(this.apiClient,p))}}async update(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Ho(this.apiClient,t);return c=S("{model}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"PATCH",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>ht(this.apiClient,p))}else{const d=go(this.apiClient,t);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"PATCH",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>pt(this.apiClient,p))}}async delete(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=$o(this.apiClient,t);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(()=>{const p=xs(),f=new et;return Object.assign(f,p),f})}else{const d=yo(this.apiClient,t);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(()=>{const p=as(),f=new et;return Object.assign(f,p),f})}}async countTokens(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=zo(this.apiClient,t);return c=S("{model}:countTokens",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=As(this.apiClient,p),h=new tt;return Object.assign(h,f),h})}else{const d=Co(this.apiClient,t);return c=S("{model}:countTokens",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>{const f=ls(this.apiClient,p),h=new tt;return Object.assign(h,f),h})}}async computeTokens(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI()){const c=Oo(this.apiClient,t);return a=S("{model}:computeTokens",c._url),l=c._query,delete c.config,delete c._url,delete c._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(u=>{const d=ks(this.apiClient,u),p=new An;return Object.assign(p,d),p})}else throw new Error("This method is only supported by the Vertex AI.")}async generateVideos(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Ko(this.apiClient,t);return c=S("{model}:predictLongRunning",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>Ps(this.apiClient,p))}else{const d=wo(this.apiClient,t);return c=S("{model}:predictLongRunning",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>ps(this.apiClient,p))}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Gs(i,t){const e={},n=s(t,["operationName"]);n!=null&&r(e,["_url","operationName"],n);const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function Hs(i,t){const e={},n=s(t,["operationName"]);n!=null&&r(e,["_url","operationName"],n);const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function $s(i,t){const e={},n=s(t,["operationName"]);n!=null&&r(e,["operationName"],n);const o=s(t,["resourceName"]);o!=null&&r(e,["_url","resourceName"],o);const a=s(t,["config"]);return a!=null&&r(e,["config"],a),e}function Ws(i,t){const e={},n=s(t,["video","uri"]);n!=null&&r(e,["uri"],n);const o=s(t,["video","encodedVideo"]);o!=null&&r(e,["videoBytes"],B(i,o));const a=s(t,["encoding"]);return a!=null&&r(e,["mimeType"],a),e}function zs(i,t){const e={},n=s(t,["_self"]);return n!=null&&r(e,["video"],Ws(i,n)),e}function Os(i,t){const e={},n=s(t,["generatedSamples"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(c=>zs(i,c))),r(e,["generatedVideos"],l)}const o=s(t,["raiMediaFilteredCount"]);o!=null&&r(e,["raiMediaFilteredCount"],o);const a=s(t,["raiMediaFilteredReasons"]);return a!=null&&r(e,["raiMediaFilteredReasons"],a),e}function Ys(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["metadata"]);o!=null&&r(e,["metadata"],o);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);l!=null&&r(e,["error"],l);const c=s(t,["response","generateVideoResponse"]);return c!=null&&r(e,["response"],Os(i,c)),e}function Js(i,t){const e={},n=s(t,["gcsUri"]);n!=null&&r(e,["uri"],n);const o=s(t,["bytesBase64Encoded"]);o!=null&&r(e,["videoBytes"],B(i,o));const a=s(t,["mimeType"]);return a!=null&&r(e,["mimeType"],a),e}function Ks(i,t){const e={},n=s(t,["_self"]);return n!=null&&r(e,["video"],Js(i,n)),e}function Qs(i,t){const e={},n=s(t,["videos"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(c=>Ks(i,c))),r(e,["generatedVideos"],l)}const o=s(t,["raiMediaFilteredCount"]);o!=null&&r(e,["raiMediaFilteredCount"],o);const a=s(t,["raiMediaFilteredReasons"]);return a!=null&&r(e,["raiMediaFilteredReasons"],a),e}function mt(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["metadata"]);o!=null&&r(e,["metadata"],o);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);l!=null&&r(e,["error"],l);const c=s(t,["response"]);return c!=null&&r(e,["response"],Qs(i,c)),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Xs extends J{constructor(t){super(),this.apiClient=t}async getVideosOperation(t){const e=t.operation,n=t.config;if(e.name===void 0||e.name==="")throw new Error("Operation name is required.");if(this.apiClient.isVertexAI()){const o=e.name.split("/operations/")[0];let a;return n&&"httpOptions"in n&&(a=n.httpOptions),this.fetchPredictVideosOperationInternal({operationName:e.name,resourceName:o,config:{httpOptions:a}})}else return this.getVideosOperationInternal({operationName:e.name,config:n})}async getVideosOperationInternal(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Hs(this.apiClient,t);return c=S("{operationName}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>mt(this.apiClient,p))}else{const d=Gs(this.apiClient,t);return c=S("{operationName}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>Ys(this.apiClient,p))}}async fetchPredictVideosOperationInternal(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI()){const c=$s(this.apiClient,t);return a=S("{resourceName}:fetchPredictOperation",c._url),l=c._query,delete c.config,delete c._url,delete c._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(u=>mt(this.apiClient,u))}else throw new Error("This method is only supported by the Vertex AI.")}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Zs="Content-Type",js="X-Server-Timeout",er="User-Agent",tr="x-goog-api-client",nr="0.12.0",ir=`google-genai-sdk/${nr}`,or="v1beta1",sr="v1beta",gt=/^data: (.*)(?:\n\n|\r\r|\r\n\r\n)/;class qt extends Error{constructor(t,e){e?super(t,{cause:e}):super(t,{cause:new Error().stack}),this.message=t,this.name="ClientError"}}class he extends Error{constructor(t,e){e?super(t,{cause:e}):super(t,{cause:new Error().stack}),this.message=t,this.name="ServerError"}}class rr{constructor(t){var e,n;this.clientOptions=Object.assign(Object.assign({},t),{project:t.project,location:t.location,apiKey:t.apiKey,vertexai:t.vertexai});const o={};this.clientOptions.vertexai?(o.apiVersion=(e=this.clientOptions.apiVersion)!==null&&e!==void 0?e:or,this.getProject()||this.getLocation()?(o.baseUrl=`https://${this.clientOptions.location}-aiplatform.googleapis.com/`,this.clientOptions.apiKey=void 0):(o.baseUrl="https://aiplatform.googleapis.com/",this.clientOptions.project=void 0,this.clientOptions.location=void 0)):(o.apiVersion=(n=this.clientOptions.apiVersion)!==null&&n!==void 0?n:sr,o.baseUrl="https://generativelanguage.googleapis.com/"),o.headers=this.getDefaultHeaders(),this.clientOptions.httpOptions=o,t.httpOptions&&(this.clientOptions.httpOptions=this.patchHttpOptions(o,t.httpOptions))}isVertexAI(){var t;return(t=this.clientOptions.vertexai)!==null&&t!==void 0?t:!1}getProject(){return this.clientOptions.project}getLocation(){return this.clientOptions.location}getApiVersion(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.apiVersion!==void 0)return this.clientOptions.httpOptions.apiVersion;throw new Error("API version is not set.")}getBaseUrl(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.baseUrl!==void 0)return this.clientOptions.httpOptions.baseUrl;throw new Error("Base URL is not set.")}getRequestUrl(){return this.getRequestUrlInternal(this.clientOptions.httpOptions)}getHeaders(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.headers!==void 0)return this.clientOptions.httpOptions.headers;throw new Error("Headers are not set.")}getRequestUrlInternal(t){if(!t||t.baseUrl===void 0||t.apiVersion===void 0)throw new Error("HTTP options are not correctly set.");const n=[t.baseUrl.endsWith("/")?t.baseUrl.slice(0,-1):t.baseUrl];return t.apiVersion&&t.apiVersion!==""&&n.push(t.apiVersion),n.join("/")}getBaseResourcePath(){return`projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`}getApiKey(){return this.clientOptions.apiKey}getWebsocketBaseUrl(){const t=this.getBaseUrl(),e=new URL(t);return e.protocol=e.protocol=="http:"?"ws":"wss",e.toString()}setBaseUrl(t){if(this.clientOptions.httpOptions)this.clientOptions.httpOptions.baseUrl=t;else throw new Error("HTTP options are not correctly set.")}constructUrl(t,e,n){const o=[this.getRequestUrlInternal(e)];return n&&o.push(this.getBaseResourcePath()),t!==""&&o.push(t),new URL(`${o.join("/")}`)}shouldPrependVertexProjectPath(t){return!(this.clientOptions.apiKey||!this.clientOptions.vertexai||t.path.startsWith("projects/")||t.httpMethod==="GET"&&t.path.startsWith("publishers/google/models"))}async request(t){let e=this.clientOptions.httpOptions;t.httpOptions&&(e=this.patchHttpOptions(this.clientOptions.httpOptions,t.httpOptions));const n=this.shouldPrependVertexProjectPath(t),o=this.constructUrl(t.path,e,n);if(t.queryParams)for(const[l,c]of Object.entries(t.queryParams))o.searchParams.append(l,String(c));let a={};if(t.httpMethod==="GET"){if(t.body&&t.body!=="{}")throw new Error("Request body should be empty for GET request, but got non empty request body")}else a.body=t.body;return a=await this.includeExtraHttpOptionsToRequestInit(a,e,t.abortSignal),this.unaryApiCall(o,a,t.httpMethod)}patchHttpOptions(t,e){const n=JSON.parse(JSON.stringify(t));for(const[o,a]of Object.entries(e))typeof a=="object"?n[o]=Object.assign(Object.assign({},n[o]),a):a!==void 0&&(n[o]=a);return n}async requestStream(t){let e=this.clientOptions.httpOptions;t.httpOptions&&(e=this.patchHttpOptions(this.clientOptions.httpOptions,t.httpOptions));const n=this.shouldPrependVertexProjectPath(t),o=this.constructUrl(t.path,e,n);(!o.searchParams.has("alt")||o.searchParams.get("alt")!=="sse")&&o.searchParams.set("alt","sse");let a={};return a.body=t.body,a=await this.includeExtraHttpOptionsToRequestInit(a,e,t.abortSignal),this.streamApiCall(o,a,t.httpMethod)}async includeExtraHttpOptionsToRequestInit(t,e,n){if(e&&e.timeout||n){const o=new AbortController,a=o.signal;e.timeout&&(e==null?void 0:e.timeout)>0&&setTimeout(()=>o.abort(),e.timeout),n&&n.addEventListener("abort",()=>{o.abort()}),t.signal=a}return t.headers=await this.getHeadersInternal(e),t}async unaryApiCall(t,e,n){return this.apiCall(t.toString(),Object.assign(Object.assign({},e),{method:n})).then(async o=>(await yt(o),new ue(o))).catch(o=>{throw o instanceof Error?o:new Error(JSON.stringify(o))})}async streamApiCall(t,e,n){return this.apiCall(t.toString(),Object.assign(Object.assign({},e),{method:n})).then(async o=>(await yt(o),this.processStreamResponse(o))).catch(o=>{throw o instanceof Error?o:new Error(JSON.stringify(o))})}processStreamResponse(t){var e;return ie(this,arguments,function*(){const o=(e=t==null?void 0:t.body)===null||e===void 0?void 0:e.getReader(),a=new TextDecoder("utf-8");if(!o)throw new Error("Response body is empty");try{let l="";for(;;){const{done:c,value:u}=yield D(o.read());if(c){if(l.trim().length>0)throw new Error("Incomplete JSON segment at the end");break}const d=a.decode(u);try{const f=JSON.parse(d);if("error"in f){const h=JSON.parse(JSON.stringify(f.error)),m=h.status,y=h.code,b=`got status: ${m}. ${JSON.stringify(f)}`;if(y>=400&&y<500)throw new qt(b);if(y>=500&&y<600)throw new he(b)}}catch(f){const h=f;if(h.name==="ClientError"||h.name==="ServerError")throw f}l+=d;let p=l.match(gt);for(;p;){const f=p[1];try{const h=new Response(f,{headers:t==null?void 0:t.headers,status:t==null?void 0:t.status,statusText:t==null?void 0:t.statusText});yield yield D(new ue(h)),l=l.slice(p[0].length),p=l.match(gt)}catch(h){throw new Error(`exception parsing stream chunk ${f}. ${h}`)}}}}finally{o.releaseLock()}})}async apiCall(t,e){return fetch(t,e).catch(n=>{throw new Error(`exception ${n} sending request`)})}getDefaultHeaders(){const t={},e=ir+" "+this.clientOptions.userAgentExtra;return t[er]=e,t[tr]=e,t[Zs]="application/json",t}async getHeadersInternal(t){const e=new Headers;if(t&&t.headers){for(const[n,o]of Object.entries(t.headers))e.append(n,o);t.timeout&&t.timeout>0&&e.append(js,String(Math.ceil(t.timeout/1e3)))}return await this.clientOptions.auth.addAuthHeaders(e),e}async uploadFile(t,e){var n;const o={};e!=null&&(o.mimeType=e.mimeType,o.name=e.name,o.displayName=e.displayName),o.name&&!o.name.startsWith("files/")&&(o.name=`files/${o.name}`);const a=this.clientOptions.uploader,l=await a.stat(t);o.sizeBytes=String(l.size);const c=(n=e==null?void 0:e.mimeType)!==null&&n!==void 0?n:l.type;if(c===void 0||c==="")throw new Error("Can not determine mimeType. Please provide mimeType in the config.");o.mimeType=c;const u=await this.fetchUploadUrl(o,e);return a.upload(t,u,this)}async fetchUploadUrl(t,e){var n;let o={};e!=null&&e.httpOptions?o=e.httpOptions:o={apiVersion:"",headers:{"Content-Type":"application/json","X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${t.sizeBytes}`,"X-Goog-Upload-Header-Content-Type":`${t.mimeType}`}};const a={file:t},l=await this.request({path:S("upload/v1beta/files",a._url),body:JSON.stringify(a),httpMethod:"POST",httpOptions:o});if(!l||!(l!=null&&l.headers))throw new Error("Server did not return an HttpResponse or the returned HttpResponse did not have headers.");const c=(n=l==null?void 0:l.headers)===null||n===void 0?void 0:n["x-goog-upload-url"];if(c===void 0)throw new Error("Failed to get upload url. Server did not return the x-google-upload-url in the headers");return c}}async function yt(i){var t;if(i===void 0)throw new he("response is undefined");if(!i.ok){const e=i.status,n=i.statusText;let o;!((t=i.headers.get("content-type"))===null||t===void 0)&&t.includes("application/json")?o=await i.json():o={error:{message:await i.text(),code:i.status,status:i.statusText}};const a=`got status: ${e} ${n}. ${JSON.stringify(o)}`;throw e>=400&&e<500?new qt(a):e>=500&&e<600?new he(a):new Error(a)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ar(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],n);const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function lr(i,t,e){const n={},o=s(t,["pageSize"]);e!==void 0&&o!=null&&r(e,["_query","pageSize"],o);const a=s(t,["pageToken"]);e!==void 0&&a!=null&&r(e,["_query","pageToken"],a);const l=s(t,["filter"]);return e!==void 0&&l!=null&&r(e,["_query","filter"],l),n}function cr(i,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],lr(i,n,e)),e}function dr(i,t){const e={},n=s(t,["textInput"]);n!=null&&r(e,["textInput"],n);const o=s(t,["output"]);return o!=null&&r(e,["output"],o),e}function ur(i,t){const e={};if(s(t,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");const n=s(t,["examples"]);if(n!=null){let o=n;Array.isArray(o)&&(o=o.map(a=>dr(i,a))),r(e,["examples","examples"],o)}return e}function pr(i,t,e){const n={};if(s(t,["validationDataset"])!==void 0)throw new Error("validationDataset parameter is not supported in Gemini API.");const o=s(t,["tunedModelDisplayName"]);if(e!==void 0&&o!=null&&r(e,["displayName"],o),s(t,["description"])!==void 0)throw new Error("description parameter is not supported in Gemini API.");const a=s(t,["epochCount"]);e!==void 0&&a!=null&&r(e,["tuningTask","hyperparameters","epochCount"],a);const l=s(t,["learningRateMultiplier"]);if(l!=null&&r(n,["tuningTask","hyperparameters","learningRateMultiplier"],l),s(t,["adapterSize"])!==void 0)throw new Error("adapterSize parameter is not supported in Gemini API.");const c=s(t,["batchSize"]);e!==void 0&&c!=null&&r(e,["tuningTask","hyperparameters","batchSize"],c);const u=s(t,["learningRate"]);return e!==void 0&&u!=null&&r(e,["tuningTask","hyperparameters","learningRate"],u),n}function fr(i,t){const e={},n=s(t,["baseModel"]);n!=null&&r(e,["baseModel"],n);const o=s(t,["trainingDataset"]);o!=null&&r(e,["tuningTask","trainingData"],ur(i,o));const a=s(t,["config"]);return a!=null&&r(e,["config"],pr(i,a,e)),e}function hr(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],n);const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function mr(i,t,e){const n={},o=s(t,["pageSize"]);e!==void 0&&o!=null&&r(e,["_query","pageSize"],o);const a=s(t,["pageToken"]);e!==void 0&&a!=null&&r(e,["_query","pageToken"],a);const l=s(t,["filter"]);return e!==void 0&&l!=null&&r(e,["_query","filter"],l),n}function gr(i,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],mr(i,n,e)),e}function yr(i,t,e){const n={},o=s(t,["gcsUri"]);if(e!==void 0&&o!=null&&r(e,["supervisedTuningSpec","trainingDatasetUri"],o),s(t,["examples"])!==void 0)throw new Error("examples parameter is not supported in Vertex AI.");return n}function vr(i,t){const e={},n=s(t,["gcsUri"]);return n!=null&&r(e,["validationDatasetUri"],n),e}function Cr(i,t,e){const n={},o=s(t,["validationDataset"]);e!==void 0&&o!=null&&r(e,["supervisedTuningSpec"],vr(i,o));const a=s(t,["tunedModelDisplayName"]);e!==void 0&&a!=null&&r(e,["tunedModelDisplayName"],a);const l=s(t,["description"]);e!==void 0&&l!=null&&r(e,["description"],l);const c=s(t,["epochCount"]);e!==void 0&&c!=null&&r(e,["supervisedTuningSpec","hyperParameters","epochCount"],c);const u=s(t,["learningRateMultiplier"]);e!==void 0&&u!=null&&r(e,["supervisedTuningSpec","hyperParameters","learningRateMultiplier"],u);const d=s(t,["adapterSize"]);if(e!==void 0&&d!=null&&r(e,["supervisedTuningSpec","hyperParameters","adapterSize"],d),s(t,["batchSize"])!==void 0)throw new Error("batchSize parameter is not supported in Vertex AI.");if(s(t,["learningRate"])!==void 0)throw new Error("learningRate parameter is not supported in Vertex AI.");return n}function Tr(i,t){const e={},n=s(t,["baseModel"]);n!=null&&r(e,["baseModel"],n);const o=s(t,["trainingDataset"]);o!=null&&r(e,["supervisedTuningSpec","trainingDatasetUri"],yr(i,o,e));const a=s(t,["config"]);return a!=null&&r(e,["config"],Cr(i,a,e)),e}function br(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["model"],n);const o=s(t,["name"]);return o!=null&&r(e,["endpoint"],o),e}function Ft(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["state"]);o!=null&&r(e,["state"],Rt(i,o));const a=s(t,["createTime"]);a!=null&&r(e,["createTime"],a);const l=s(t,["tuningTask","startTime"]);l!=null&&r(e,["startTime"],l);const c=s(t,["tuningTask","completeTime"]);c!=null&&r(e,["endTime"],c);const u=s(t,["updateTime"]);u!=null&&r(e,["updateTime"],u);const d=s(t,["description"]);d!=null&&r(e,["description"],d);const p=s(t,["baseModel"]);p!=null&&r(e,["baseModel"],p);const f=s(t,["_self"]);f!=null&&r(e,["tunedModel"],br(i,f));const h=s(t,["distillationSpec"]);h!=null&&r(e,["distillationSpec"],h);const m=s(t,["experiment"]);m!=null&&r(e,["experiment"],m);const y=s(t,["labels"]);y!=null&&r(e,["labels"],y);const b=s(t,["pipelineJob"]);b!=null&&r(e,["pipelineJob"],b);const E=s(t,["tunedModelDisplayName"]);return E!=null&&r(e,["tunedModelDisplayName"],E),e}function wr(i,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const o=s(t,["tunedModels"]);if(o!=null){let a=o;Array.isArray(a)&&(a=a.map(l=>Ft(i,l))),r(e,["tuningJobs"],a)}return e}function Er(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["metadata"]);o!=null&&r(e,["metadata"],o);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);return l!=null&&r(e,["error"],l),e}function Sr(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["model"],n);const o=s(t,["endpoint"]);return o!=null&&r(e,["endpoint"],o),e}function me(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["state"]);o!=null&&r(e,["state"],Rt(i,o));const a=s(t,["createTime"]);a!=null&&r(e,["createTime"],a);const l=s(t,["startTime"]);l!=null&&r(e,["startTime"],l);const c=s(t,["endTime"]);c!=null&&r(e,["endTime"],c);const u=s(t,["updateTime"]);u!=null&&r(e,["updateTime"],u);const d=s(t,["error"]);d!=null&&r(e,["error"],d);const p=s(t,["description"]);p!=null&&r(e,["description"],p);const f=s(t,["baseModel"]);f!=null&&r(e,["baseModel"],f);const h=s(t,["tunedModel"]);h!=null&&r(e,["tunedModel"],Sr(i,h));const m=s(t,["supervisedTuningSpec"]);m!=null&&r(e,["supervisedTuningSpec"],m);const y=s(t,["tuningDataStats"]);y!=null&&r(e,["tuningDataStats"],y);const b=s(t,["encryptionSpec"]);b!=null&&r(e,["encryptionSpec"],b);const E=s(t,["partnerModelTuningSpec"]);E!=null&&r(e,["partnerModelTuningSpec"],E);const g=s(t,["distillationSpec"]);g!=null&&r(e,["distillationSpec"],g);const C=s(t,["experiment"]);C!=null&&r(e,["experiment"],C);const v=s(t,["labels"]);v!=null&&r(e,["labels"],v);const T=s(t,["pipelineJob"]);T!=null&&r(e,["pipelineJob"],T);const w=s(t,["tunedModelDisplayName"]);return w!=null&&r(e,["tunedModelDisplayName"],w),e}function Ir(i,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const o=s(t,["tuningJobs"]);if(o!=null){let a=o;Array.isArray(a)&&(a=a.map(l=>me(i,l))),r(e,["tuningJobs"],a)}return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class xr extends J{constructor(t){super(),this.apiClient=t,this.get=async e=>await this.getInternal(e),this.list=async(e={})=>new ge(Y.PAGED_ITEM_TUNING_JOBS,n=>this.listInternal(n),await this.listInternal(e),e),this.tune=async e=>{if(this.apiClient.isVertexAI())return await this.tuneInternal(e);{const n=await this.tuneMldevInternal(e);let o="";return n.metadata!==void 0&&n.metadata.tunedModel!==void 0?o=n.metadata.tunedModel:n.name!==void 0&&n.name.includes("/operations/")&&(o=n.name.split("/operations/")[0]),{name:o,state:de.JOB_STATE_QUEUED}}}}async getInternal(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=hr(this.apiClient,t);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>me(this.apiClient,p))}else{const d=ar(this.apiClient,t);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>Ft(this.apiClient,p))}}async listInternal(t){var e,n,o,a;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=gr(this.apiClient,t);return c=S("tuningJobs",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Ir(this.apiClient,p),h=new nt;return Object.assign(h,f),h})}else{const d=cr(this.apiClient,t);return c=S("tunedModels",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>{const f=wr(this.apiClient,p),h=new nt;return Object.assign(h,f),h})}}async tuneInternal(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI()){const c=Tr(this.apiClient,t);return a=S("tuningJobs",c._url),l=c._query,delete c.config,delete c._url,delete c._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(u=>me(this.apiClient,u))}else throw new Error("This method is only supported by the Vertex AI.")}async tuneMldevInternal(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=fr(this.apiClient,t);return a=S("tunedModels",c._url),l=c._query,delete c.config,delete c._url,delete c._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(u=>Er(this.apiClient,u))}}}const Ar=1024*1024*8;async function kr(i,t,e){var n,o;let a=0,l=0,c=new ue(new Response),u="upload";for(a=i.size;l<a;){const p=Math.min(Ar,a-l),f=i.slice(l,l+p);if(l+p>=a&&(u+=", finalize"),c=await e.request({path:"",body:f,httpMethod:"POST",httpOptions:{apiVersion:"",baseUrl:t,headers:{"X-Goog-Upload-Command":u,"X-Goog-Upload-Offset":String(l),"Content-Length":String(p)}}}),l+=p,((n=c==null?void 0:c.headers)===null||n===void 0?void 0:n["x-goog-upload-status"])!=="active")break;if(a<=l)throw new Error("All content has been uploaded, but the upload status is not finalized.")}const d=await(c==null?void 0:c.json());if(((o=c==null?void 0:c.headers)===null||o===void 0?void 0:o["x-goog-upload-status"])!=="final")throw new Error("Failed to upload file: Upload status is not finalized.");return d.file}async function _r(i){return{size:i.size,type:i.type}}class Rr{async upload(t,e,n){if(typeof t=="string")throw new Error("File path is not supported in browser uploader.");return await kr(t,e,n)}async stat(t){if(typeof t=="string")throw new Error("File path is not supported in browser uploader.");return await _r(t)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Mr{create(t,e,n){return new Pr(t,e,n)}}class Pr{constructor(t,e,n){this.url=t,this.headers=e,this.callbacks=n}connect(){this.ws=new WebSocket(this.url),this.ws.onopen=this.callbacks.onopen,this.ws.onerror=this.callbacks.onerror,this.ws.onclose=this.callbacks.onclose,this.ws.onmessage=this.callbacks.onmessage}send(t){if(this.ws===void 0)throw new Error("WebSocket is not connected");this.ws.send(t)}close(){if(this.ws===void 0)throw new Error("WebSocket is not connected");this.ws.close()}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const vt="x-goog-api-key";class Dr{constructor(t){this.apiKey=t}async addAuthHeaders(t){t.get(vt)===null&&t.append(vt,this.apiKey)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Nr="gl-node/";class Lr{constructor(t){var e;if(t.apiKey==null)throw new Error("An API Key must be set when running in a browser");if(t.project||t.location)throw new Error("Vertex AI project based authentication is not supported on browser runtimes. Please do not provide a project or location.");this.vertexai=(e=t.vertexai)!==null&&e!==void 0?e:!1,this.apiKey=t.apiKey;const n=Ht(t,void 0,void 0);n&&(t.httpOptions?t.httpOptions.baseUrl=n:t.httpOptions={baseUrl:n}),this.apiVersion=t.apiVersion;const o=new Dr(this.apiKey);this.apiClient=new rr({auth:o,apiVersion:this.apiVersion,apiKey:this.apiKey,vertexai:this.vertexai,httpOptions:t.httpOptions,userAgentExtra:Nr+"web",uploader:new Rr}),this.models=new Bs(this.apiClient),this.live=new Ls(this.apiClient,o,new Mr),this.chats=new Ln(this.models,this.apiClient),this.caches=new Mn(this.apiClient),this.files=new Jn(this.apiClient),this.operations=new Xs(this.apiClient),this.tunings=new xr(this.apiClient)}}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/const Ct="AIzaSyALB2_8eh4kNA3hrpevwvDtgO6FnpkWU7s";let L=null;Ct.trim()&&(L=new Lr({apiKey:Ct}));const Tt={commitmentSigned:"roof-er.commitmentSigned"},W=document.getElementById("sidebar"),z=document.getElementById("main-content"),M={welcome:`
    <div class="content-card">
      <h1>Welcome to Roof-ER!</h1>
      ${G("/assets/training/videos/welcome-intro.mp4","welcome-video","📹 Welcome Introduction")}
      <p>My name is Oliver Brown. I founded this company in 2019, not because I have a passion for roofing, but because I saw an opportunity to change the reputation of roofing companies and contractors as a whole. This is an industry that is known for lack of communication, poor workmanship, and straight up deceit. With a little bit of modern thinking, integrity and hard work we've been able to build a strong brand and reputation in a relatively short amount of time.</p>
      <p>We have ambitions of becoming a national brand. To accomplish this we need to continue to add and develop hungry, competitive team members who are dedicated to the big picture but disciplined to execute on a day to day basis.</p>

      <h2>Steering Our Roofing Revolution</h2>
      <p class="section-intro">Meet the leaders who built Roof-ER on integrity, expertise, and a relentless commitment to excellence.</p>

      <div class="leadership-grid">
        <!-- Oliver Brown -->
        <div class="leader-card">
          <div class="leader-photo-container">
            <img src="/assets/team/oliver-theroofdocs.jpg" alt="Oliver Brown" class="leader-photo" />
          </div>
          <h3>Oliver Brown</h3>
          <p class="leader-title">CEO & Founder</p>
          <p class="leader-highlight">Built Roof-ER from the ground up with hands-on experience and an MBA from Mount St. Mary's University. Founded in 2019 to revolutionize the roofing industry with integrity and modern thinking.</p>
          <button class="bio-toggle-btn" data-bio="oliver-bio">My Bio</button>
          <div id="oliver-bio" class="leader-bio-full" style="display: none;">
            <p>Oliver Brown's journey in the roofing industry began quite literally on the ground, spending a summer loading shingles onto rooftops under the hot sun. That hands-on experience ignited a passion for the trade and laid the foundation for what would become Roof-ER: a company built on grit, growth, and doing things the right way.</p>
            <p>A two-time graduate of Mount St. Mary's University, Oliver earned his B.S. in Business Marketing in 2013 and an MBA in 2015. His education, combined with real-world roofing experience, gave him a unique perspective on how to build a company that blends professionalism with performance.</p>
            <p>In 2019, Oliver founded Roof-ER not out of a passion for roofs, but out of a desire to change the reputation of the roofing industry - an industry often plagued by poor communication, shoddy workmanship, and dishonest practices. Through integrity, modern systems, and relentless hard work, Roof-ER has rapidly built a strong brand and reputation.</p>
            <p>Oliver's vision is clear: to build Roof-ER into a national brand by developing hungry, competitive team members who are dedicated to the big picture but disciplined enough to execute daily. He leads by example, embodying the values of integrity, quality, and simplicity that define Roof-ER.</p>
          </div>
          <div class="video-placeholder">
            <p>🎥 Introduction video coming soon</p>
          </div>
        </div>

        <!-- Reese Samala -->
        <div class="leader-card">
          <div class="leader-photo-container">
            <img src="/assets/team/reese-theroofdocs.jpg" alt="Reese Samala" class="leader-photo" />
          </div>
          <h3>Reese Samala</h3>
          <p class="leader-title">Director of Sales</p>
          <p class="leader-highlight">U.S. Army Infantry veteran and OEF combat vet bringing military discipline and leadership to building Roof-ER's sales excellence. First-generation immigrant from the Philippines with a service-first mindset.</p>
          <button class="bio-toggle-btn" data-bio="reese-bio">My Bio</button>
          <div id="reese-bio" class="leader-bio-full" style="display: none;">
            <p>Reese Samala brings a unique blend of leadership, discipline, and global perspective to his role as Director of Sales at Roof-ER. A first-generation immigrant from the Philippines and a proud U.S. Army Infantryman and Operation Enduring Freedom (OEF) veteran, Reese is driven by a strong sense of service and mission, values that align perfectly with Roof-ER's commitment to excellence in exterior remodeling.</p>
            <p>Reese's military background instilled in him the importance of teamwork, accountability, and executing under pressure - skills that translate directly to leading high-performing sales teams. His experience in combat zones taught him to stay calm in challenging situations, think strategically, and always put the mission first.</p>
            <p>At Roof-ER, Reese applies these principles to building a sales culture rooted in integrity and results. He believes that sales is about service, not just closing deals. His approach focuses on truly understanding homeowner needs, providing honest assessments, and delivering solutions that restore peace of mind.</p>
            <p>As a first-generation American, Reese embodies the entrepreneurial spirit and work ethic that drives Roof-ER forward. He leads his team with the same dedication and honor that defined his military service, ensuring that every customer interaction reflects Roof-ER's core values.</p>
          </div>
          <div class="video-placeholder">
            <p>🎥 Introduction video coming soon</p>
          </div>
        </div>

        <!-- Ford Barsi -->
        <div class="leader-card">
          <div class="leader-photo-container">
            <img src="/assets/team/ford-theroofdocs.jpg" alt="Ford Barsi" class="leader-photo" />
          </div>
          <h3>Ford Barsi</h3>
          <p class="leader-title">General Manager</p>
          <p class="leader-highlight">Former NYC chef turned operations leader, bringing hospitality excellence and customer-first mindset from high-end restaurants to roofing. Originally from Tampa, Florida.</p>
          <button class="bio-toggle-btn" data-bio="ford-bio">My Bio</button>
          <div id="ford-bio" class="leader-bio-full" style="display: none;">
            <p>As General Manager of Roof-ER, Ford Barsi brings a rare blend of hospitality excellence, operational leadership, and a customer-first mindset that elevates every aspect of the business. Originally from Tampa, Florida, Ford began his career in the fast-paced world of high-end restaurants, starting as a chef in New York City.</p>
            <p>His background in hospitality instilled in him a deep appreciation for attention to detail, the value of hard work, and the power of memorable service. In fine dining, every detail matters, and Ford brings that same level of precision to managing Roof-ER's operations.</p>
            <p>Ford's transition from the kitchen to roofing management might seem unusual, but the skills are directly transferable: leading teams under pressure, maintaining high standards, ensuring customer satisfaction, and creating systems that deliver consistent excellence. Just as a great restaurant experience depends on flawless execution across multiple touchpoints, so does a successful roofing project.</p>
            <p>At Roof-ER, Ford oversees daily operations, ensuring that every project runs smoothly from initial inspection to final installation. He maintains the same standards he learned in world-class kitchens: no shortcuts, no excuses, and an unwavering commitment to quality. His leadership ensures that Roof-ER delivers not just a new roof, but an exceptional customer experience.</p>
          </div>
          <div class="video-placeholder">
            <p>🎥 Introduction video coming soon</p>
          </div>
        </div>
      </div>

      <h2>Our Mission & Values</h2>
      <div class="values-section">
        <h3>Mission</h3>
        <p>At Roof-ER, our mission is to hold a fiduciary responsibility to our customers - plain and simple. To restore peace of mind for homeowners through expert storm damage restoration and quality roofing services.</p>

        <h3>Core Values</h3>
        <ul>
          <li><strong>Integrity:</strong> Always do what's right for the homeowner, even when no one is watching</li>
          <li><strong>Quality:</strong> Never settle for "good enough" - deliver premium workmanship and clear communication</li>
          <li><strong>Simplicity:</strong> Make the process straightforward and stress-free for every customer</li>
        </ul>
      </div>
    </div>
  `,commitment:`
    <div class="content-card">
      <h1>Your Commitment</h1>
      ${G("/assets/training/videos/module2-commitment.mp4","commitment-video","📹 Your Commitment to Excellence")}

      <h2>The Roof-ER Promise</h2>
      <div class="promise-section">
        <p><strong>We promise to:</strong></p>
        <ul>
          <li>Treat every homeowner's property as if it were our own</li>
          <li>Provide honest assessments, even if it means no sale</li>
          <li>Fight for maximum coverage on every claim</li>
          <li>Complete every project with excellence and professionalism</li>
          <li>Stand behind our work for the lifetime of the roof</li>
          <li>Communicate clearly and promptly throughout the process</li>
        </ul>
      </div>

      <h2>Your Commitment as a Roof-ER Representative</h2>
      <div class="commitment-checklist">
        <h3>As a Roof-ER Sales Representative, I commit to:</h3>
        <ul>
          <li>✓ Complete all 16 training modules with focus and dedication</li>
          <li>✓ Pass the final certification exam with a score of 80% or higher</li>
          <li>✓ Uphold Roof-ER's standards in every customer interaction</li>
          <li>✓ Continuously improve my skills and product knowledge</li>
          <li>✓ Represent the company with professionalism and integrity</li>
          <li>✓ Support my teammates and contribute to our collective success</li>
          <li>✓ Always prioritize what's right for the homeowner over quick sales</li>
        </ul>
      </div>

      <p>As a member of the Roof-ER team, your commitment to our values and processes is paramount to our collective success. Here is what we expect:</p>
      <ul>
        <li>I will conduct myself in alignment with the Mission and Core Values.</li>
        <li>I will dedicate myself to Roof-ER's successful sales process.</li>
        <li>I will always show an exceptional level of integrity.</li>
        <li>I will listen to and grow from receiving constructive feedback.</li>
        <li>I will not be involved in gossip or "office drama."</li>
        <li>I will show an intense level of discipline in the work that I conduct.</li>
        <li>I will have pride in my work.</li>
        <li><strong>I will do what it takes to commit to this. I will achieve tremendous levels of success.</strong></li>
      </ul>

      <p><strong>Required:</strong> You must digitally sign these commitments below before accessing other modules.</p>
      <p>Reference: <a href="/resources/Mission,%20Values,%20&%20Commitment.docx" target="_blank">Mission, Values, & Commitment (DOCX)</a></p>
    </div>
  `,"initial-pitch":`
    <div class="content-card">
      <h1>The Initial Pitch</h1>
      <h3>5 Non-Negotiables</h3>
      <ol>
        <li>Who you are</li>
        <li>Who we are and what we do (Roof-ER)</li>
        <li>Make it relatable</li>
        <li>What you're there to do (an inspection)</li>
        <li>Go for the close (them agreeing to the inspection)</li>
      </ol>

      <h3>Generic Script</h3>
      <div class="script" data-text-source="true">
        <button class="speak-btn" aria-label="Listen to script">🔊</button>
        <p>"Hi, how are you? My Name is ______ with Roof-ER we're a local roofing company that specializes in helping homeowners get their roof and/or siding replaced, paid for by their insurance!"</p>
        <p>"We've had a lot of storms here in [Region] over the past few months that have done a lot of damage!</p>
        <p>"We're working with a lot of your neighbors in the area. We've been able to help them get fully approved through their insurance company to have their roof replaced."</p>
      </div>

      <h3>The Inspection Proposal</h3>
      <div class="script" data-text-source="true">
        <button class="speak-btn" aria-label="Listen to script">🔊</button>
        <p>"While I'm here, in the neighborhood, I am conducting a completely free inspection to see if you have similar, qualifiable damage. If you do, I'll take a bunch of photos and walk you through the rest of the process. If you don't, I wouldn't want to waste your time, I wouldn't want to waste mine! I will at least leave giving you peace of mind that you're in good shape."</p>
        <p><strong>(Pause here – Wait for them to respond/agree.)</strong></p>
      </div>

      <h2>The Initial Pitch Script - Detailed</h2>
      <div class="pitch-script">
        <p><strong>Opening (30 seconds):</strong></p>
        <p>"Hi! I'm [Name] with Roof-ER. We're working in your neighborhood helping homeowners file insurance claims for storm damage. I noticed [specific damage observation - dented gutter, lifted shingles, etc.]. Mind if I take a quick look from the ground? It'll only take 2 minutes and could save you thousands."</p>

        <p><strong>Permission Secured:</strong></p>
        <p>"Great! Let me grab my ladder. I'll do a thorough inspection - check shingles, flashing, vents, everything. Takes about 15 minutes. If I find damage, I'll show you photos and explain your options. Sound good?"</p>
      </div>

      <h2>Building Rapport Tips</h2>
      <ul>
        <li><strong>Mirror their energy level</strong> - Match their enthusiasm or calmness</li>
        <li><strong>Ask about their experience with storms</strong> - Get them talking about past events</li>
        <li><strong>Compliment their home/yard authentically</strong> - Be genuine, not salesy</li>
        <li><strong>Use their name 2-3 times in conversation</strong> - Creates personal connection</li>
        <li><strong>Share brief relevant stories</strong> - "I helped your neighbor two streets over last week..."</li>
        <li><strong>Be professional but personable</strong> - You're a trusted advisor, not a pushy salesperson</li>
      </ul>

      <h2>Key Phrases That Work</h2>
      <ul>
        <li>"I'm working in your neighborhood today..."</li>
        <li>"Your neighbors at [address] just got approved for a full roof replacement..."</li>
        <li>"This will only take 2 minutes from the ground..."</li>
        <li>"Worst case, I give you peace of mind..."</li>
        <li>"I noticed [specific visible damage]..."</li>
      </ul>
    </div>
  `,"inspection-process":`
    <div class="content-card">
        <h1>The Inspection Process</h1>
        ${G("/assets/training/videos/module7-inspection-process.mp4","inspection-process-video","📹 Complete Inspection Process Walkthrough")}

        <h2>The 10-Step Inspection Process</h2>
        <div class="inspection-steps">
          <ol>
            <li><strong>Safety First:</strong> Check ladder stability, wear harness if needed, assess roof walkability. Never compromise safety for speed.</li>
            <li><strong>360° Walk:</strong> Walk entire perimeter, check all slopes and facets. Document the whole structure before focusing on damage.</li>
            <li><strong>Shingle Inspection:</strong> Look for missing granules, cracks, lifting, bruising. Use chalk or test square to mark hail strikes.</li>
            <li><strong>Flashing Check:</strong> Inspect all flashing around chimneys, vents, valleys. Flashing failures are common leak sources.</li>
            <li><strong>Vent Inspection:</strong> Check boot seals, housing damage, proper installation. Damaged vents mean water intrusion.</li>
            <li><strong>Ridge/Hip Inspection:</strong> Look for lifted caps, damage to ridge venting. Critical for structural integrity.</li>
            <li><strong>Valley Inspection:</strong> Check for debris, damage, proper water flow. Valleys handle high water volume - must be intact.</li>
            <li><strong>Gutter Check:</strong> Look for hail dents, granule accumulation. Granules in gutters prove recent shingle damage.</li>
            <li><strong>Photo Documentation:</strong> Take 20-40 photos covering all findings. Photos are your evidence - be thorough.</li>
            <li><strong>Ground Cleanup:</strong> Pick up debris, leave property better than found. Professionalism builds trust.</li>
          </ol>
        </div>

        <h3>Ideal Photo Progression</h3>
        <p>A thorough inspection tells a story. Follow this order to capture all necessary evidence for the insurance claim. This process should take 15-20 minutes.</p>
        <ol>
            <li><strong>Mailbox/House Number/Overview of House:</strong> Set the scene.</li>
            <li><strong>Front Elevation Collateral:</strong> Damage to screens, gutters, downspouts, siding.</li>
            <li><strong>Right Elevation Collateral:</strong> Same as above.</li>
            <li><strong>Rear Elevation Collateral:</strong> Same as above.</li>
            <li><strong>Left Elevation Collateral:</strong> Same as above.</li>
            <li><strong>Roof Overview Collateral:</strong> Damage to roof metals and other items on the roof.</li>
            <li><strong>Circle Hail Hits & Slash Wind Damage:</strong> Close-up photos of each instance of damage.</li>
            <li><strong>Overview of Majority of Damage:</strong> Photos showing the chalked-up damage areas.</li>
            <li><strong>Granules in Gutters:</strong> Pictures of granules in gutters or at the bottom of downspouts.</li>
            <li><strong>Flashlight:</strong> Use a flashlight to illuminate damage if needed.</li>
        </ol>

        <h2>Photo Documentation Strategy</h2>
        <p><strong>Take photos of:</strong></p>
        <ul>
          <li><strong>Overall roof:</strong> 4 corners showing full house context</li>
          <li><strong>Each area of damage:</strong> Close-up + context shot (show location on roof)</li>
          <li><strong>Serial numbers on equipment:</strong> HVAC units, water heaters visible from roof</li>
          <li><strong>Test square with penny for size reference:</strong> Proves hail size to adjuster</li>
          <li><strong>Gutters showing granule loss:</strong> Evidence of recent shingle deterioration</li>
          <li><strong>Any matching damage:</strong> Fence, AC unit, siding - builds collateral story</li>
        </ul>

        <p><strong>Key takeaway:</strong> Getting enough clear photos to convince the homeowner is the most important part. Without their belief, you can't file a claim.</p>
    </div>
  `,"post-inspection-pitch":`
    <div class="content-card">
        <h1>Post-Inspection Pitch</h1>
        ${G("/assets/training/videos/module5-post-inspection.mp4","post-inspection-video","📹 Post-Inspection Pitch Strategy")}

        <h2>Building the Evidence Story</h2>
        <div class="evidence-story">
          <h3>Step 1: Set Expectations</h3>
          <p>"I found some damage up there. Let me show you the photos on my tablet and explain what this means for your insurance claim..."</p>

          <h3>Step 2: Walk Through Photos</h3>
          <p>"Here's your south-facing slope - see these dark spots? That's where the protective granules are gone. This shingle is 18 years old, and these hail strikes have exposed the asphalt underneath..."</p>

          <h3>Step 3: Explain Consequences</h3>
          <p>"Without these granules, UV rays deteriorate the shingle rapidly. You'll get leaks within 2-3 years. That's $10,000+ in interior damage - water damage, mold, ceiling replacement..."</p>

          <h3>Step 4: Present Solution</h3>
          <p>"The good news? Your insurance will cover this. We file the claim, they send an adjuster, we handle everything. Your only cost is the deductible, which is typically around $1,000-$2,000 for a $20,000+ roof replacement..."</p>
        </div>

        <h3>Build the Story</h3>
        <div class="script" data-text-source="true">
            <button class="speak-btn" aria-label="Listen to script">🔊</button>
            <p>"Hey ____, so I have a bunch of photos to show you. First I walked around the perimeter of the house to look for collateral damage... While this damage functionally isn't a big deal, it really helps build a story. Think of us like lawyers and this collateral damage is the evidence that builds the case which helps us get the roof approved."</p>
        </div>

        <h3>Explain the Critical Damage</h3>
        <div class="script" data-text-source="true">
            <button class="speak-btn" aria-label="Listen to script">🔊</button>
            <p>"Here are the photos of the damage to your shingles. Anything I have circled means it's hail damage. This is exactly what we look for... Even if this damage doesn't look like a big deal, what happens over time, these hail divots fill with water, freeze, expand, and break apart the shingle which will eventually lead to leaks. That is why your insurance company is responsible and your policy covers this type of damage."</p>
        </div>

        <h2>Critical Damage Points to Emphasize</h2>
        <ul>
          <li><strong>Matching Law:</strong> Insurance must replace entire roof if >25% damaged (varies by state). This protects homeowners from patchwork roofs that look mismatched.</li>
          <li><strong>Urgency:</strong> Statute of limitations (1-2 years in most states). File claims promptly after storm damage or lose coverage.</li>
          <li><strong>No Cost:</strong> Free inspection, we work with insurance, you only pay deductible. No out-of-pocket expense beyond deductible.</li>
          <li><strong>Warranty:</strong> New roof comes with 30-50 year warranty vs. current aging roof with no remaining warranty coverage.</li>
          <li><strong>Home Value:</strong> New roof adds $15-20k to property value. Increases curb appeal and marketability if selling.</li>
          <li><strong>Energy Efficiency:</strong> Modern shingles reflect more heat, reducing cooling costs by 10-15% in summer.</li>
        </ul>
    </div>
  `,"objection-handling":`
    <div class="content-card">
        <h1>Handling Initial Pitch Objections</h1>

        <h2>The L.E.A.R.N. Framework for Objections</h2>
        <div class="learn-framework">
          <div class="learn-step">
            <h3>L - Listen</h3>
            <p>Let them finish. Don't interrupt. Show you care about their concern by giving them space to fully express it.</p>
          </div>
          <div class="learn-step">
            <h3>E - Empathize</h3>
            <p>"I completely understand..." Validate their feeling without agreeing with the objection. Make them feel heard.</p>
          </div>
          <div class="learn-step">
            <h3>A - Ask</h3>
            <p>Clarifying questions to understand the root concern. "What specifically worries you about that?" Dig deeper to find the real issue.</p>
          </div>
          <div class="learn-step">
            <h3>R - Respond</h3>
            <p>Address the actual concern with facts, benefits, or social proof. Don't just recite a script - tailor your response to their specific worry.</p>
          </div>
          <div class="learn-step">
            <h3>N - Next Step</h3>
            <p>Move forward with confidence. "So let's schedule that inspection for tomorrow at 2pm?" Always close with a clear next action.</p>
          </div>
        </div>

        <h2>Common Initial Objections & Responses</h2>
        <div class="objections-list">
          <div class="objection">
            <h3>"I'm busy right now"</h3>
            <p><strong>Response:</strong> "I understand! This will only take 2 minutes from the ground. I can come back at [time] if that works better, or we can schedule a full inspection for [tomorrow]?"</p>
            <p><strong>Why it works:</strong> Acknowledges their time constraint, offers flexibility, provides specific alternatives.</p>
          </div>
          <div class="objection">
            <h3>"We already have a roofer"</h3>
            <p><strong>Response:</strong> "That's great! When was your last inspection? Storm damage can happen without you knowing. A second opinion never hurts - it's free and takes 15 minutes."</p>
            <p><strong>Why it works:</strong> Doesn't attack their existing relationship, positions as additional value, emphasizes no-cost benefit.</p>
          </div>
          <div class="objection">
            <h3>"I don't think I have damage"</h3>
            <p><strong>Response:</strong> "You might be right! But I've been on 10 roofs in this neighborhood today, and 8 had damage the owner didn't know about. Let me check - worst case, I give you peace of mind."</p>
            <p><strong>Why it works:</strong> Uses social proof, creates urgency with neighborhood activity, emphasizes peace of mind.</p>
          </div>
          <div class="objection">
            <h3>"Not interested"</h3>
            <p><strong>Response:</strong> "I get it, a lot of your neighbors said the same thing at first. Then I showed them photos of hail damage they couldn't see from the ground. Can I at least take a quick look? If there's nothing, you lose 2 minutes. If there is damage, you save thousands."</p>
            <p><strong>Why it works:</strong> Social proof, risk-reversal, emphasizes low time investment vs high potential gain.</p>
          </div>
          <div class="objection">
            <h3>"I need to talk to my spouse"</h3>
            <p><strong>Response:</strong> "That's great, the inspection is free and I can leave info for both of you. Or I can wait a few minutes if they'll be home soon. This way you have the facts when you talk."</p>
            <p><strong>Why it works:</strong> Respects decision-making process, offers to wait or leave materials, positions inspection as information-gathering.</p>
          </div>
        </div>

        <h3>Objection Matcher Game</h3>
        <div class="game-container">
            <p class="game-instructions">Drag the homeowner's objection to the correct sales strategy.</p>
            <div id="objection-game-board" class="game-board">
                <div class="game-column">
                    <h4>Objections</h4>
                    <div id="objections-list">
                        <div class="draggable-item" draggable="true" data-match="1">"I don't have enough time."</div>
                        <div class="draggable-item" draggable="true" data-match="2">"My roof is in good shape."</div>
                        <div class="draggable-item" draggable="true" data-match="3">"Not interested."</div>
                        <div class="draggable-item" draggable="true" data-match="4">"I need to talk to my spouse."</div>
                    </div>
                </div>
                <div class="game-column">
                    <h4>Responses</h4>
                    <div class="drop-zone" data-match="3"><p class="response-text">"I get it, a lot of your neighbors said the same thing at first..."</p></div>
                    <div class="drop-zone" data-match="4"><p class="response-text">"That's great, the inspection is free and I can leave info for both of you..."</p></div>
                    <div class="drop-zone" data-match="1"><p class="response-text">"This will only take about 10-15 minutes, I'll be quick and efficient."</p></div>
                    <div class="drop-zone" data-match="2"><p class="response-text">"I understand, we're experts and can spot things from the ground that others miss..."</p></div>
                </div>
            </div>
             <div id="objection-feedback" class="feedback-message" style="display: none;"></div>
        </div>
    </div>
  `,"shingle-types":`
    <div class="content-card">
      <h1>Module 4: Shingle Types & Materials</h1>
      <p class="module-intro">Understanding the difference between shingle types is fundamental for accurately assessing roof conditions and communicating effectively with both homeowners and insurance adjusters. This module will train you to identify shingle types on sight and understand their performance characteristics.</p>

      <h2>Visual Comparison: 3-Tab vs. Architectural Shingles</h2>
      <div class="shingle-comparison-enhanced">
        <div class="shingle-card shingle-3tab">
          <div class="shingle-header">
            <h3>3-Tab Shingles</h3>
            <span class="shingle-badge basic">Basic Option</span>
          </div>

          <div class="shingle-photo-container">
            <div class="photo-placeholder">
              <p>📋 3-Tab Shingle Reference</p>
              <small>Flat, uniform pattern with 3 distinct rectangular tabs</small>
              <div style="margin-top: 12px; padding: 12px; background: rgba(255,255,255,0.9); border-radius: 4px;">
                <strong>Key Visual Markers:</strong>
                <ul style="text-align: left; margin: 8px 0 0 0; padding-left: 20px; font-size: 0.85rem;">
                  <li>Single flat layer - no dimensional depth</li>
                  <li>Three evenly-spaced rectangular cutouts per shingle</li>
                  <li>Consistent thickness across entire surface</li>
                  <li>Repeating brick-like pattern every few rows</li>
                </ul>
              </div>
            </div>
            <div class="photo-caption">Notice the flat, uniform pattern with visible cutouts</div>
          </div>

          <div class="shingle-specs">
            <div class="spec-group">
              <h4>Key Identification Features</h4>
              <ul class="identification-list">
                <li><span class="check-icon">✓</span> <strong>Flat appearance</strong> - Single layer design with no dimensional depth</li>
                <li><span class="check-icon">✓</span> <strong>Three distinct tabs</strong> - Rectangular cutouts create brick-like pattern</li>
                <li><span class="check-icon">✓</span> <strong>Uniform thickness</strong> - Same thickness across entire shingle (~0.19")</li>
                <li><span class="check-icon">✓</span> <strong>Repeating pattern</strong> - Obvious pattern repetition every few courses</li>
              </ul>
            </div>

            <div class="spec-group">
              <h4>Technical Specifications</h4>
              <div class="specs-grid">
                <div class="spec-item">
                  <span class="spec-label">Dimensions</span>
                  <span class="spec-value">36" × 12" × 0.19"</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Weight</span>
                  <span class="spec-value">200-250 lbs/square</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Lifespan</span>
                  <span class="spec-value">15-25 years</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Wind Rating</span>
                  <span class="spec-value">60-70 mph</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Cost</span>
                  <span class="spec-value">$80-100/square</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Best For</span>
                  <span class="spec-value">Rentals, Budget Projects</span>
                </div>
              </div>
            </div>

            <div class="spec-group">
              <h4>Common Misconceptions</h4>
              <ul class="misconceptions-list">
                <li><span class="x-icon">✗</span> "3-tab means 3 layers" - Actually single layer with 3 visible tabs</li>
                <li><span class="x-icon">✗</span> "Same quality as architectural" - Lower wind resistance and shorter lifespan</li>
                <li><span class="x-icon">✗</span> "Easy to match for repairs" - Most 3-tab lines are discontinued</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="shingle-card shingle-architectural">
          <div class="shingle-header">
            <h3>Architectural Shingles</h3>
            <span class="shingle-badge premium">Premium Option</span>
          </div>

          <div class="shingle-photo-container">
            <img src="https://www.theroofdocs.com/wp-content/uploads/2025/03/Asphalt-Shingles-GAF-Timberline-HDZ-01-300x237.jpg"
                 alt="Architectural Shingles - GAF Timberline HDZ showing dimensional, layered appearance"
                 class="shingle-photo"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="photo-placeholder" style="display: none;">
              <p>🏗️ Architectural Shingle Reference</p>
              <small>Dimensional, multi-layer construction with varied depth</small>
              <div style="margin-top: 12px; padding: 12px; background: rgba(255,255,255,0.9); border-radius: 4px;">
                <strong>Key Visual Markers:</strong>
                <ul style="text-align: left; margin: 8px 0 0 0; padding-left: 20px; font-size: 0.85rem;">
                  <li>Multiple laminated layers creating depth</li>
                  <li>Varied tab shapes with random pattern</li>
                  <li>Visible shadow lines and texture</li>
                  <li>No obvious pattern repetition</li>
                </ul>
              </div>
            </div>
            <div class="photo-caption">GAF Timberline HDZ - Notice the dimensional, textured look with varied depth</div>
          </div>

          <div class="shingle-specs">
            <div class="spec-group">
              <h4>Key Identification Features</h4>
              <ul class="identification-list">
                <li><span class="check-icon">✓</span> <strong>Dimensional appearance</strong> - Multi-layer laminated construction</li>
                <li><span class="check-icon">✓</span> <strong>Varied tab shapes</strong> - Random pattern mimics natural materials</li>
                <li><span class="check-icon">✓</span> <strong>Textured surface</strong> - Visible depth and shadow lines</li>
                <li><span class="check-icon">✓</span> <strong>No repeating pattern</strong> - Designed to look like natural slate or wood</li>
              </ul>
            </div>

            <div class="spec-group">
              <h4>Technical Specifications</h4>
              <div class="specs-grid">
                <div class="spec-item">
                  <span class="spec-label">Construction</span>
                  <span class="spec-value">Multiple layers laminated</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Weight</span>
                  <span class="spec-value">300-400 lbs/square</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Lifespan</span>
                  <span class="spec-value">25-30+ years</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Wind Rating</span>
                  <span class="spec-value">110-130 mph</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Cost</span>
                  <span class="spec-value">$110-150/square</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Best For</span>
                  <span class="spec-value">Primary Homes, Curb Appeal</span>
                </div>
              </div>
            </div>

            <div class="spec-group">
              <h4>Why Homeowners Choose Architectural</h4>
              <ul class="identification-list">
                <li><span class="star-icon">★</span> Enhanced curb appeal increases home value by 1-5%</li>
                <li><span class="star-icon">★</span> Superior wind resistance (130 mph vs 70 mph)</li>
                <li><span class="star-icon">★</span> Longer warranty coverage (typically 30-50 years)</li>
                <li><span class="star-icon">★</span> Better ROI over lifetime despite higher initial cost</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h2>Interactive Training: Spot the Difference</h2>
      <div class="training-quiz-section">
        <p class="quiz-instructions">Test your identification skills. Can you spot the key differences between these shingle types?</p>

        <div class="visual-markers-grid">
          <div class="marker-card">
            <div class="marker-icon">👁️</div>
            <h4>Look from the side</h4>
            <p>3-tab shingles appear completely flat with uniform thickness. Architectural shingles have visible depth variation and shadow lines from multiple layers.</p>
          </div>

          <div class="marker-card">
            <div class="marker-icon">🔍</div>
            <h4>Check the pattern</h4>
            <p>3-tab has obvious repeating rectangular cutouts creating a grid. Architectural has random, varied tab shapes with no visible pattern repetition.</p>
          </div>

          <div class="marker-card">
            <div class="marker-icon">📏</div>
            <h4>Feel the weight</h4>
            <p>Architectural shingles are notably heavier (50% more weight per square) due to laminated layers. You can feel this when lifting a bundle.</p>
          </div>

          <div class="marker-card">
            <div class="marker-icon">🎨</div>
            <h4>Observe texture</h4>
            <p>3-tab has consistent granule pattern. Architectural uses varied granule colors and sizes to create dimensional appearance mimicking natural materials.</p>
          </div>
        </div>
      </div>

      <h2>Material Composition: What Shingles Are Made Of</h2>
      <div class="composition-section">
        <div class="composition-diagram">
          <div class="layer-item">
            <div class="layer-number">1</div>
            <div class="layer-content">
              <h4>Ceramic Granules (Top Surface)</h4>
              <p>Colored ceramic-coated granules provide UV protection, fire resistance, and aesthetic appeal. Granule loss indicates damage or age-related deterioration.</p>
            </div>
          </div>

          <div class="layer-item">
            <div class="layer-number">2</div>
            <div class="layer-content">
              <h4>Asphalt Coating</h4>
              <p>Weatherproofing asphalt layer bonds granules and provides waterproofing. Oxidized or modified asphalt improves flexibility and longevity.</p>
            </div>
          </div>

          <div class="layer-item">
            <div class="layer-number">3</div>
            <div class="layer-content">
              <h4>Fiberglass Mat Base</h4>
              <p>Fiberglass reinforcement provides structural integrity and fire resistance. Replaced older organic felt mats in modern shingles (post-1980s).</p>
            </div>
          </div>

          <div class="layer-item">
            <div class="layer-number">4</div>
            <div class="layer-content">
              <h4>Self-Sealing Adhesive Strip</h4>
              <p>Heat-activated adhesive bonds shingles after installation. Critical for wind resistance - activates with sun exposure within days of installation.</p>
            </div>
          </div>
        </div>
      </div>

      <h2>Major Manufacturers & Market Position</h2>
      <div class="manufacturers-grid">
        <div class="manufacturer-card manufacturer-gaf">
          <div class="manufacturer-logo-placeholder">GAF</div>
          <h4>GAF - Market Leader</h4>
          <div class="market-share">~30% Market Share</div>
          <p><strong>Signature Line:</strong> Timberline HDZ with LayerLock Technology</p>
          <ul>
            <li>North America's #1 roofing manufacturer</li>
            <li>StrikeZone nailing area (99% improvement in nail pull-through)</li>
            <li>Industry-leading warranties up to Lifetime Limited</li>
            <li>Most common brand in insurance claims</li>
          </ul>
          <div class="manufacturer-note">Most inspectors encounter GAF on 30-40% of roofs</div>
        </div>

        <div class="manufacturer-card manufacturer-oc">
          <div class="manufacturer-logo-placeholder">OC</div>
          <h4>Owens Corning</h4>
          <div class="market-share">~20% Market Share</div>
          <p><strong>Signature Line:</strong> Duration Series with SureNail Technology</p>
          <ul>
            <li>Known for pink fiberglass insulation (brand recognition)</li>
            <li>SureNail Technology - woven fabric nailing strip</li>
            <li>TruDefinition color granules for enhanced aesthetics</li>
            <li>Strong contractor network and training programs</li>
          </ul>
          <div class="manufacturer-note">Popular in new construction and high-end residential</div>
        </div>

        <div class="manufacturer-card manufacturer-ct">
          <div class="manufacturer-logo-placeholder">CT</div>
          <h4>CertainTeed</h4>
          <div class="market-share">~15% Market Share</div>
          <p><strong>Signature Line:</strong> Landmark Series</p>
          <ul>
            <li>Part of Saint-Gobain (European conglomerate)</li>
            <li>StreakFighter algae-resistant technology</li>
            <li>Wide color selection (50+ options)</li>
            <li>Premium positioning and pricing</li>
          </ul>
          <div class="manufacturer-note">Common in Northeastern and Mid-Atlantic regions</div>
        </div>

        <div class="manufacturer-card manufacturer-iko">
          <div class="manufacturer-logo-placeholder">IKO</div>
          <h4>IKO</h4>
          <div class="market-share">~10% Market Share</div>
          <p><strong>Signature Line:</strong> Cambridge & Dynasty</p>
          <ul>
            <li>Canadian-based manufacturer</li>
            <li>Budget-friendly pricing strategy</li>
            <li>Good value for rental properties</li>
            <li>Limited warranty compared to premium brands</li>
          </ul>
          <div class="manufacturer-note">Commonly seen on cost-conscious projects and rentals</div>
        </div>
      </div>

      <h2>Why This Knowledge Matters</h2>
      <div class="application-section">
        <div class="application-card">
          <h4>For Homeowner Communication</h4>
          <p>Understanding shingle construction helps you explain why architectural shingles cost more but deliver better value:</p>
          <ul>
            <li><strong>ROI Conversation:</strong> "The $3,000 upgrade pays for itself in 10-15 years through increased home value and avoided premature replacement"</li>
            <li><strong>Wind Resistance:</strong> "130 mph rating means your roof survives storms that would destroy 3-tab shingles"</li>
            <li><strong>Warranty Value:</strong> "30-year warranty vs. 20-year means peace of mind and transferability if you sell"</li>
          </ul>
        </div>

        <div class="application-card">
          <h4>For Insurance Claims Processing</h4>
          <p>Accurate identification affects claim outcomes:</p>
          <ul>
            <li><strong>Matching Laws:</strong> Most 3-tab lines are discontinued, often triggering full replacement rather than repair</li>
            <li><strong>Documentation:</strong> Record brand, model, color name for accurate adjuster estimates</li>
            <li><strong>Age Assessment:</strong> 3-tab deteriorates faster - same age doesn't mean same condition</li>
            <li><strong>Code Requirements:</strong> Many jurisdictions now require minimum architectural grade for replacements</li>
          </ul>
        </div>

        <div class="application-card">
          <h4>On-Site Inspection Tips</h4>
          <p>Quick identification techniques for the field:</p>
          <ul>
            <li><strong>View from ground:</strong> 3-tab looks flat like brick pattern; architectural has visible texture and depth</li>
            <li><strong>Check attic:</strong> Bundle wrappers often left behind show brand and model</li>
            <li><strong>Age estimation:</strong> 3-tab common pre-2005; architectural dominant post-2005</li>
            <li><strong>Neighborhood patterns:</strong> Developments built in same year typically use same shingle type</li>
          </ul>
        </div>
      </div>

      <div class="key-takeaways">
        <h3>Key Takeaways - Memorize These</h3>
        <div class="takeaway-grid">
          <div class="takeaway-item">
            <span class="takeaway-icon">🎯</span>
            <p><strong>3-Tab = Flat, Grid Pattern, Budget</strong></p>
          </div>
          <div class="takeaway-item">
            <span class="takeaway-icon">🎯</span>
            <p><strong>Architectural = Dimensional, Random, Premium</strong></p>
          </div>
          <div class="takeaway-item">
            <span class="takeaway-icon">🎯</span>
            <p><strong>Weight Difference = 50% heavier (architectural)</strong></p>
          </div>
          <div class="takeaway-item">
            <span class="takeaway-icon">🎯</span>
            <p><strong>Wind Rating = 130 mph vs 70 mph</strong></p>
          </div>
          <div class="takeaway-item">
            <span class="takeaway-icon">🎯</span>
            <p><strong>Lifespan = 25-30 yrs vs 15-25 yrs</strong></p>
          </div>
          <div class="takeaway-item">
            <span class="takeaway-icon">🎯</span>
            <p><strong>GAF = Market leader (30% share)</strong></p>
          </div>
        </div>
      </div>

      <div class="practice-prompt">
        <h3>Practice Exercise</h3>
        <p>Before moving to the next module, practice identifying shingle types:</p>
        <ol>
          <li>Drive through a neighborhood and identify 10 roofs as 3-tab or architectural</li>
          <li>Take photos and verify your identification with your trainer</li>
          <li>Note any patterns (age of homes, price points, neighborhood types)</li>
        </ol>
        <p class="practice-note"><strong>Pro Tip:</strong> After identifying 100 roofs, you'll develop instant recognition ability that impresses homeowners and builds credibility.</p>
      </div>
    </div>
  `,"roofing-damage-id":`
   <div class="content-card">
        <h1>Roofing & Damage Identification</h1>
        ${G("/assets/training/videos/module10-damage-id.mp4","damage-id-video","📹 Identifying Storm Damage")}

        <h2>Understanding Storm Damage Types</h2>

        <div class="damage-types">
          <div class="damage-type">
            <h3>Hail Damage</h3>
            <h4>What to Look For:</h4>
            <ul>
              <li>Circular bruising/divots on shingles</li>
              <li>Loss of granules exposing asphalt mat</li>
              <li>Shiny spots where granules are gone</li>
              <li>Damage to vents, flashing, gutters (matching damage)</li>
              <li>Dented AC units, downspouts</li>
            </ul>
            <h4>How to Document:</h4>
            <ul>
              <li>Test square: Use penny for size reference</li>
              <li>Take 5-7 photos per damaged area</li>
              <li>Show both close-up and context shots</li>
              <li>Photograph matching damage on ground items</li>
            </ul>
          </div>

          <div class="damage-type">
            <h3>Wind Damage</h3>
            <h4>What to Look For:</h4>
            <ul>
              <li>Missing shingles (blown off)</li>
              <li>Lifted/creased shingles</li>
              <li>Torn shingles (especially at edges)</li>
              <li>Exposed underlayment</li>
              <li>Damaged or missing ridge caps</li>
            </ul>
            <h4>How to Document:</h4>
            <ul>
              <li>Wide shots showing missing sections</li>
              <li>Close-ups of lifted tabs</li>
              <li>Document direction (shows wind pattern)</li>
              <li>Check all edges and corners first</li>
            </ul>
          </div>
        </div>

        <h2>The "Test Square" Method</h2>
        <div class="test-square">
          <p>Insurance companies require a <strong>test square</strong> - a 10x10 ft area with minimum damage counts:</p>
          <ul>
            <li><strong>Hail:</strong> Minimum 8-10 hits per 100 sq ft (varies by carrier)</li>
            <li><strong>Location:</strong> Choose south or west-facing slope (most sun exposure = most damage)</li>
            <li><strong>Documentation:</strong> Circle damage with chalk, photograph from multiple angles</li>
            <li><strong>Why it matters:</strong> This determines if they'll approve full replacement vs. repair</li>
          </ul>
        </div>

        <h3>Shingle Types</h3>
        <p>Identifying the type of shingle is crucial for assessing damage and communicating with adjusters.</p>
        <div class="shingle-comparison">
            <div class="shingle-type">
                <h4>3-Tab Shingles</h4>
                <img src="https://i.imgur.com/gYx2V2y.jpeg" alt="3-Tab Shingles">
                <p>Flat, single-layer appearance with distinct rectangular cutouts.</p>
            </div>
            <div class="shingle-type">
                <h4>Architectural Shingles</h4>
                <img src="https://i.imgur.com/bA5wY4z.jpeg" alt="Architectural Shingles">
                <p>Laminated, multi-layer design giving a dimensional, textured look.</p>
            </div>
        </div>
        <hr>
        <h3>Storm Damage vs. Non-Storm Damage</h3>
        <p>It's vital to differentiate between actual storm damage and other roof issues.</p>
        <h4>Storm Damage (Qualifying)</h4>
        <ul>
            <li><strong>Hail Damage:</strong> Circular "bruises" or divots where granules are knocked off, often with a soft or spongy feel.</li>
            <li><strong>Wind Damage:</strong> Lifted, creased, or missing shingles.</li>
        </ul>
        <h4>Non-Storm Damage (Non-Qualifying)</h4>
        <ul>
            <li><strong>Blistering:</strong> Looks like bubbles on the shingle surface, a manufacturing defect.</li>
            <li><strong>Cracking:</strong> Age-related, looks like splintering or straight lines.</li>
            <li><strong>Granule Loss:</strong> General, even loss of granules due to age, not concentrated in spots like hail hits.</li>
        </ul>

        <h2>Collateral Damage Assessment</h2>
        <p>Collateral damage strengthens your claim by proving the storm's impact across multiple surfaces:</p>
        <ul>
          <li><strong>Metal Items:</strong> Dented gutters, downspouts, vents, flashing, AC units</li>
          <li><strong>Soft Items:</strong> Window screens with pitting, vinyl siding damage</li>
          <li><strong>Ground Items:</strong> Damaged deck railings, mailboxes, outdoor furniture</li>
          <li><strong>Why it matters:</strong> Insurance can't argue "normal wear" if your brand-new AC unit has 20 dents</li>
        </ul>

        <h2>Documentation Strategy Sequence</h2>
        <p>Follow this exact order for professional, adjuster-ready documentation:</p>
        <ol>
          <li><strong>Property ID:</strong> House number, full front view</li>
          <li><strong>Overview Shots:</strong> All four elevations of the home</li>
          <li><strong>Elevation Collateral:</strong> Gutters, siding, windows from each side</li>
          <li><strong>Roof Overview:</strong> Wide shots of each slope</li>
          <li><strong>Damage Markup:</strong> Circle hail hits with chalk, slash wind damage</li>
          <li><strong>Close-ups:</strong> Individual damage photos with size reference (penny/quarter)</li>
          <li><strong>Granule Loss:</strong> Gutters and downspouts filled with granules</li>
        </ol>
    </div>
  `,"sales-cycle":`
    <div class="content-card">
        <h1>The Sales Cycle</h1>

        <h2>The Complete Roof-ER Sales Cycle</h2>
        <div class="sales-cycle">
          <div class="cycle-phase">
            <h3>Phase 1: Lead Generation (Days 1-2)</h3>
            <ul>
              <li>Storm tracking & mapping</li>
              <li>Door knocking targeted neighborhoods</li>
              <li>Initial pitch & permission</li>
              <li><strong>Goal:</strong> Book inspection</li>
            </ul>
          </div>

          <div class="cycle-phase">
            <h3>Phase 2: Inspection & Sale (Day 2-3)</h3>
            <ul>
              <li>Thorough roof inspection (15 min)</li>
              <li>Photo documentation (20-40 photos)</li>
              <li>Post-inspection pitch</li>
              <li>File insurance claim</li>
              <li><strong>Goal:</strong> Signed contract</li>
            </ul>
          </div>

          <div class="cycle-phase">
            <h3>Phase 3: Adjuster Meeting (Day 7-14)</h3>
            <ul>
              <li>Insurance assigns adjuster</li>
              <li>Meet adjuster on site</li>
              <li>Walk through all damage</li>
              <li>Negotiate scope if needed</li>
              <li><strong>Goal:</strong> Full approval</li>
            </ul>
          </div>

          <div class="cycle-phase">
            <h3>Phase 4: Materials & Scheduling (Day 15-21)</h3>
            <ul>
              <li>Order materials</li>
              <li>Schedule production crew</li>
              <li>Confirm homeowner availability</li>
              <li><strong>Goal:</strong> Install date set</li>
            </ul>
          </div>

          <div class="cycle-phase">
            <h3>Phase 5: Installation (Day 22-23)</h3>
            <ul>
              <li>Crew arrives 7-8am</li>
              <li>Full tear-off and install (1-2 days)</li>
              <li>Final inspection</li>
              <li>Collect payment</li>
              <li><strong>Goal:</strong> Happy customer</li>
            </ul>
          </div>

          <div class="cycle-phase">
            <h3>Phase 6: Follow-Up (Day 30+)</h3>
            <ul>
              <li>Post-install call</li>
              <li>Request Google review</li>
              <li>Ask for referrals</li>
              <li><strong>Goal:</strong> Repeat business</li>
            </ul>
          </div>
        </div>

        <h2>Average Timeline: 21-28 Days</h2>
        <p>From initial knock to completed roof, expect 3-4 weeks for a smooth job.</p>

        <h2>Key Milestones & Commissions</h2>
        <ul>
          <li><strong>Contract Signed:</strong> Initial commission ($500-1,000 depending on job size)</li>
          <li><strong>Adjuster Meeting:</strong> Track approval status</li>
          <li><strong>Project Meeting:</strong> Collect ACV/downpayment ($1,000 commission)</li>
          <li><strong>Install Complete:</strong> Final payment & residual commission</li>
        </ul>

        <h3>Sales Cycle Sorter Game</h3>
        <div class="game-container">
            <p class="game-instructions">Drag and drop the sales cycle stages into the correct order from start to finish.</p>
            <div id="sales-cycle-game" class="game-board">
                <div class="game-column">
                    <h4>Stages</h4>
                    <div id="items-pool">
                        <div class="draggable-item" draggable="true" data-order="3">Adjuster Meeting</div>
                        <div class="draggable-item" draggable="true" data-order="1">Generating New Business</div>
                        <div class="draggable-item" draggable="true" data-order="5">Install & Final Payment</div>
                        <div class="draggable-item" draggable="true" data-order="2">Inspection & Pitch</div>
                        <div class="draggable-item" draggable="true" data-order="4">Project Meeting & Downpayment</div>
                    </div>
                </div>
                <div class="game-column">
                    <h4>Correct Order</h4>
                    <div id="sorted-list" class="drop-zone-sort"></div>
                </div>
            </div>
            <div id="sales-cycle-feedback" class="feedback-message" style="display: none;"></div>
        </div>
    </div>
  `,"claim-closing":`
     <div class="content-card">
        <h1>Filing a Claim & Closing</h1>

        <h2>When to File the Claim</h2>
        <div class="filing-timeline">
          <div class="timeline-step">
            <h3>✓ Immediately (Same Day):</h3>
            <p>If homeowner is ready, file the claim before you leave. Strike while the iron is hot. You'll need:</p>
            <ul>
              <li>Policy number (on insurance card)</li>
              <li>Date of loss (storm date - check weather reports)</li>
              <li>Contact information</li>
              <li>Brief description: "Hail/wind damage to roof"</li>
            </ul>
          </div>

          <div class="timeline-step">
            <h3>⏰ Within 24 Hours:</h3>
            <p>If they need to "think about it," follow up next morning. Send them:</p>
            <ul>
              <li>Photo gallery link</li>
              <li>Written summary of damage</li>
              <li>Text: "Hi [Name]! Following up on your roof. Ready to file that claim? I can do it over the phone in 2 minutes."</li>
            </ul>
          </div>

          <div class="timeline-step">
            <h3>🚫 Never Wait More Than 48 Hours:</h3>
            <p>After 48 hours, they'll cool off, get other opinions, forget urgency. File ASAP or risk losing the deal.</p>
          </div>
        </div>

        <h2>The Filing Call Script</h2>
        <div class="filing-script">
          <p><strong>"I'm calling to file a claim for storm damage to the roof at [address]."</strong></p>

          <p><strong>Carrier will ask:</strong></p>
          <ol>
            <li>Policy number → [Read from card]</li>
            <li>Date of loss → "[Storm date] - we had [hail/wind] in the area"</li>
            <li>Description → "Inspector found damage to roof shingles from recent storm"</li>
            <li>Anyone injured? → "No"</li>
            <li>Is the property secured? → "Yes, no immediate leaks"</li>
            <li>Have repairs been made? → "No, waiting for adjuster"</li>
          </ol>

          <p><strong>You'll get:</strong></p>
          <ul>
            <li>Claim number (write it down!)</li>
            <li>Adjuster assignment (usually 3-5 business days)</li>
            <li>Next steps explanation</li>
          </ul>
        </div>

        <h3>Prepping the Homeowner</h3>
        <p>Before the call to the insurance company, you must prep the homeowner. Use a blank note on your iPad to go over these key points so they know what to say.</p>
        <ul>
            <li><strong>Reason for claim:</strong> "I'd like to file a claim for hail and wind damage." (Never only one type).</li>
            <li><strong>Damaged items:</strong> Roof, Downspouts, Gutters, Siding, etc.</li>
            <li><strong>Selected Contractor:</strong> "Yes, we have selected Roof-ER."</li>
            <li><strong>Have an estimate:</strong> "No."</li>
        </ul>

        <h2>After Filing: The Close</h2>
        <div class="closing-steps">
          <p><strong>"Great! Claim #[number] is filed. Here's what happens next:"</strong></p>

          <ol>
            <li><strong>Adjuster Contact:</strong> "They'll call you in 3-5 days to schedule inspection."</li>
            <li><strong>Our Role:</strong> "I'll meet the adjuster here, show them everything, make sure they see all damage."</li>
            <li><strong>Authorization:</strong> "I'll text you a contract now. E-sign it so I'm authorized to work with the adjuster."</li>
            <li><strong>Timeline:</strong> "Once approved, 3-4 weeks to completion. I'll update you every step."</li>
            <li><strong>Reassurance:</strong> "You did the right thing. This protects your biggest investment."</li>
          </ol>
        </div>

        <h3>The Contingency & Claim Authorization</h3>
        <p>After the claim is filed, you will present the agreements. This is the close.</p>
        <div class="script" data-text-source="true">
            <button class="speak-btn" aria-label="Listen to script">🔊</button>
            <p><strong>Contingency Agreement:</strong> "This basic agreement backs you as the homeowner by guaranteeing your only cost will be your deductible if we get you fully approved. If it is a partial approval or denial, we will fight for you. But if we are not able to get you fully approved, this contract is null and void and you do not owe us a penny."</p>
            <p><strong>Claim Authorization:</strong> "This next form is our Claim Authorization. Very simple, it allows us to communicate with your insurance company on your behalf. I'll be here for the inspection and will communicate with them, so you don't have to be the middle-man. Of course, I'll always keep you looped in."</p>
        </div>

        <h2>Common Filing Mistakes to Avoid</h2>
        <ul>
          <li><strong>❌ Filing without homeowner present:</strong> Always file WITH them on speakerphone</li>
          <li><strong>❌ Saying "full roof replacement":</strong> Say "damage to roof" - let adjuster determine scope</li>
          <li><strong>❌ Not getting claim number:</strong> Write it down immediately, text it to homeowner</li>
          <li><strong>❌ Forgetting to ask about inspection timeline:</strong> Ask when adjuster will contact them</li>
        </ul>
    </div>
  `,"role-play":`
    <div class="content-card">
        <h1>Agnes 21 Role-Play Training System</h1>
        <div id="roleplay-live-region" class="sr-only" aria-live="polite" aria-atomic="true"></div>

        <!-- Screen 1: Role Selection -->
        <div id="roleplay-setup" style="display: block;">
            <h2>Select Your Training Role</h2>
            <p>Choose a role to practice. Each role has multiple scenarios with AI-powered feedback.</p>
            <div class="role-selection-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">
                <button class="role-btn" data-role="homeowner" style="padding: 30px; border: 2px solid #8b4fbe; border-radius: 10px; background: linear-gradient(135deg, #8b4fbe 0%, #a370d1 100%); color: white; font-size: 18px; cursor: pointer; transition: all 0.3s;">
                    <div style="font-size: 48px; margin-bottom: 10px;">🏠</div>
                    <div style="font-weight: bold; margin-bottom: 10px;">Homeowner</div>
                    <div style="font-size: 14px; opacity: 0.9;">Practice handling common objections and concerns</div>
                </button>
                <button class="role-btn" data-role="rep" style="padding: 30px; border: 2px solid #8b4fbe; border-radius: 10px; background: linear-gradient(135deg, #8b4fbe 0%, #a370d1 100%); color: white; font-size: 18px; cursor: pointer; transition: all 0.3s;">
                    <div style="font-size: 48px; margin-bottom: 10px;">💼</div>
                    <div style="font-weight: bold; margin-bottom: 10px;">Sales Rep</div>
                    <div style="font-size: 14px; opacity: 0.9;">Refine your pitch and closing techniques</div>
                </button>
                <button class="role-btn" data-role="adjuster" style="padding: 30px; border: 2px solid #8b4fbe; border-radius: 10px; background: linear-gradient(135deg, #8b4fbe 0%, #a370d1 100%); color: white; font-size: 18px; cursor: pointer; transition: all 0.3s;">
                    <div style="font-size: 48px; margin-bottom: 10px;">📋</div>
                    <div style="font-weight: bold; margin-bottom: 10px;">Adjuster</div>
                    <div style="font-size: 14px; opacity: 0.9;">Master technical documentation and negotiation</div>
                </button>
            </div>
        </div>

        <!-- Screen 1.5: Personality Selection -->
        <div id="personality-selector" style="display: none;">
            <h2>Choose Your Agnes AI Coach</h2>
            <p>Select the AI personality that best matches your training goals. Each personality provides different levels of challenge and feedback styles.</p>

            <div class="personality-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 30px 0;">
                <button class="personality-card" data-personality="supportive" data-difficulty="1" style="padding: 25px; border: 3px solid #4caf50; border-radius: 12px; background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); cursor: pointer; text-align: left; transition: all 0.3s;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="font-size: 42px; margin-right: 15px;">😊</div>
                        <div>
                            <div style="font-weight: bold; font-size: 18px; color: #2e7d32;">Agnes the Supportive Coach</div>
                            <div style="font-size: 14px; color: #1b5e20; margin-top: 5px;">⭐ Easy - Beginner Friendly</div>
                        </div>
                    </div>
                    <p style="margin: 0; font-size: 14px; color: #555;">Encouraging, patient, and positive. Perfect for building confidence and learning fundamentals.</p>
                </button>

                <button class="personality-card" data-personality="realistic" data-difficulty="2" style="padding: 25px; border: 3px solid #2196f3; border-radius: 12px; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); cursor: pointer; text-align: left; transition: all 0.3s;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="font-size: 42px; margin-right: 15px;">🏠</div>
                        <div>
                            <div style="font-weight: bold; font-size: 18px; color: #1565c0;">Agnes the Real Homeowner</div>
                            <div style="font-size: 14px; color: #0d47a1; margin-top: 5px;">⭐⭐ Medium - Realistic Practice</div>
                        </div>
                    </div>
                    <p style="margin: 0; font-size: 14px; color: #555;">Acts like a typical homeowner with real concerns. Balanced feedback and moderate objections.</p>
                </button>

                <button class="personality-card" data-personality="skeptical" data-difficulty="3" style="padding: 25px; border: 3px solid #ff9800; border-radius: 12px; background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); cursor: pointer; text-align: left; transition: all 0.3s;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="font-size: 42px; margin-right: 15px;">🤔</div>
                        <div>
                            <div style="font-weight: bold; font-size: 18px; color: #e65100;">Agnes the Skeptical Buyer</div>
                            <div style="font-size: 14px; color: #bf360c; margin-top: 5px;">⭐⭐⭐ Hard - Advanced Practice</div>
                        </div>
                    </div>
                    <p style="margin: 0; font-size: 14px; color: #555;">Questioning, doubtful, and requires strong persuasion. Pushes you to refine your techniques.</p>
                </button>

                <button class="personality-card" data-personality="rushed" data-difficulty="4" style="padding: 25px; border: 3px solid #f44336; border-radius: 12px; background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); cursor: pointer; text-align: left; transition: all 0.3s;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="font-size: 42px; margin-right: 15px;">⏰</div>
                        <div>
                            <div style="font-weight: bold; font-size: 18px; color: #c62828;">Agnes the Rushed Decision-Maker</div>
                            <div style="font-size: 14px; color: #b71c1c; margin-top: 5px;">⭐⭐⭐⭐ Expert - High Pressure</div>
                        </div>
                    </div>
                    <p style="margin: 0; font-size: 14px; color: #555;">Impatient, time-sensitive, and easily distracted. Tests your ability to handle pressure and be concise.</p>
                </button>

                <button class="personality-card" data-personality="final-boss" data-difficulty="5" style="padding: 25px; border: 3px solid #9c27b0; border-radius: 12px; background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); cursor: pointer; text-align: left; transition: all 0.3s;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="font-size: 42px; margin-right: 15px;">👑</div>
                        <div>
                            <div style="font-weight: bold; font-size: 18px; color: #6a1b9a;">Agnes the Final Boss</div>
                            <div style="font-size: 14px; color: #4a148c; margin-top: 5px;">⭐⭐⭐⭐⭐ Master - Ultimate Challenge</div>
                        </div>
                    </div>
                    <p style="margin: 0; font-size: 14px; color: #555;">Combines all objection types with rapid-fire challenges. Only for certified experts ready to prove mastery.</p>
                </button>
            </div>

            <button id="back-to-roles" style="padding: 12px 24px; background: #f5f5f5; color: #666; border: 2px solid #ddd; border-radius: 5px; font-size: 14px; cursor: pointer; margin-top: 10px;">← Back to Role Selection</button>
        </div>

        <!-- Screen 2: Scenario Display -->
        <div id="scenario-display" style="display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div id="scenario-progress" style="font-weight: 500; color: #8b4fbe;"></div>
                <div id="turn-counter" style="font-weight: 600; color: #8b4fbe; background: #f8f4fc; padding: 8px 16px; border-radius: 20px; border: 2px solid #8b4fbe;">Turn 1 of 5</div>
            </div>

            <div class="roleplay-container-with-feedback">
                <div class="roleplay-main-content">
                    <div style="background: #f8f4fc; border-left: 4px solid #8b4fbe; padding: 20px; margin-bottom: 20px; border-radius: 5px;">
                        <h3 id="scenario-title" style="margin: 0 0 10px 0; color: #8b4fbe;">Scenario</h3>
                        <p id="scenario-context" style="margin: 0 0 15px 0; color: #555;"></p>
                    </div>

                    <!-- Conversation Thread Container -->
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: #8b4fbe; margin-bottom: 10px;">Conversation:</h4>
                        <div id="conversation-thread" style="max-height: 400px; overflow-y: auto; background: white; border: 2px solid #e0d4f0; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                            <!-- Conversation messages will be dynamically inserted here -->
                        </div>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label for="user-response" style="display: block; font-weight: 500; margin-bottom: 10px;">Your Response:</label>
                        <textarea id="user-response" rows="4" style="width: 100%; padding: 15px; border: 2px solid #e0d4f0; border-radius: 5px; font-size: 16px; font-family: inherit;" placeholder="Type your response here..."></textarea>
                    </div>

                    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                        <button id="submit-response" style="flex: 1; padding: 15px 30px; background: #8b4fbe; color: white; border: none; border-radius: 5px; font-size: 16px; font-weight: 500; cursor: pointer;">Submit Response</button>
                        <button id="voice-input-btn" style="padding: 15px 30px; background: #f8f4fc; color: #8b4fbe; border: 2px solid #8b4fbe; border-radius: 5px; font-size: 16px; cursor: pointer;">🎤 Voice Input</button>
                        <button id="hint-btn" style="padding: 15px 30px; background: #f8f4fc; color: #8b4fbe; border: 2px solid #8b4fbe; border-radius: 5px; font-size: 16px; cursor: pointer;">💡 Hint</button>
                    </div>

                    <div id="hint-display" style="display: none; background: #fff9e6; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 20px; border-radius: 5px;"></div>
                </div>

                <!-- Live Feedback Panel -->
                <div id="live-feedback-panel" class="live-feedback-panel">
                    <div class="panel-header">
                        <h3>Live Feedback</h3>
                        <button class="panel-toggle-btn" id="toggle-feedback-panel" aria-label="Toggle feedback panel">−</button>
                    </div>

                    <div class="panel-content">
                        <div class="live-score-display">
                            <div id="live-score-circle" class="live-score-circle score-low">0</div>
                            <div class="score-label">Current Score</div>
                        </div>

                        <div class="key-points-live">
                            <h4>📋 Key Points</h4>
                            <ul id="live-key-points" class="points-list">
                                <!-- Dynamically populated -->
                            </ul>
                        </div>

                        <div class="tone-indicator">
                            <h4>💬 Tone</h4>
                            <div class="tone-bar-container">
                                <div id="tone-bar" class="tone-bar neutral" style="width: 100%;">Neutral</div>
                            </div>
                        </div>

                        <div class="confidence-meter">
                            <h4>🎯 Confidence Level</h4>
                            <div class="confidence-bar-container">
                                <div id="confidence-bar" class="confidence-bar" style="width: 0%;" data-confidence="0"></div>
                            </div>
                        </div>

                        <div class="word-count-indicator">
                            <div>Word Count: <strong id="live-word-count">0</strong></div>
                            <div style="font-size: 0.75rem; margin-top: 5px; color: #999;">Recommended: 50-150 words</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Screen 3: Feedback Display -->
        <div id="feedback-area" style="display: none;">
            <h2 style="text-align: center; color: #8b4fbe; margin-bottom: 30px;">Performance Feedback</h2>

            <div style="text-align: center; margin-bottom: 30px;">
                <div id="score-circle" style="display: inline-block; width: 120px; height: 120px; border-radius: 50%; border: 8px solid #8b4fbe; display: flex; align-items: center; justify-content: center; font-size: 48px; font-weight: bold; color: #8b4fbe; margin-bottom: 10px;"></div>
                <p id="score-text" style="font-size: 18px; font-weight: 500;"></p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; border-left: 4px solid #4caf50;">
                    <h3 style="margin: 0 0 15px 0; color: #2e7d32;">Matched Key Points</h3>
                    <ul id="matched-points-list" style="list-style: none; padding: 0; margin: 0;"></ul>
                </div>
                <div style="background: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #ff9800;">
                    <h3 style="margin: 0 0 15px 0; color: #e65100;">Areas to Improve</h3>
                    <ul id="missed-points-list" style="list-style: none; padding: 0; margin: 0;"></ul>
                </div>
            </div>

            <div style="background: #f8f4fc; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px 0; color: #8b4fbe;">AI Coach Feedback</h3>
                <div style="margin-bottom: 20px;">
                    <h4 style="margin: 0 0 10px 0; color: #4caf50;">Strengths:</h4>
                    <ul id="strengths-list" style="margin: 0;"></ul>
                </div>
                <div>
                    <h4 style="margin: 0 0 10px 0; color: #ff9800;">Growth Opportunities:</h4>
                    <ul id="improvements-list" style="margin: 0;"></ul>
                </div>
            </div>

            <div style="display: flex; gap: 10px;">
                <button id="next-scenario-btn" style="flex: 1; padding: 15px 30px; background: #8b4fbe; color: white; border: none; border-radius: 5px; font-size: 16px; font-weight: 500; cursor: pointer;">Next Scenario →</button>
                <button id="retry-scenario-btn" style="padding: 15px 30px; background: #f8f4fc; color: #8b4fbe; border: 2px solid #8b4fbe; border-radius: 5px; font-size: 16px; cursor: pointer;">🔄 Retry</button>
            </div>
        </div>

        <!-- Screen 4: Session Summary -->
        <div id="session-summary" style="display: none;">
            <!-- Content will be dynamically generated -->
        </div>
    </div>
  `,quiz:`
    <div class="content-card" id="quiz-container">
      <h1>Final Quiz</h1>
      <p>Test your knowledge of the Roof-ER sales process. A new quiz will be generated each time you visit this section.</p>
      <button id="generateQuizButton">Start Quiz</button>
      <div id="quiz-area"></div>
    </div>
  `};M["general-knowledge"]=`
  <div class="content-card">
    <h1>General Roofing Knowledge & Terminology</h1>
    ${G("/assets/training/videos/module3-roofing101.mp4","roofing101-video","📹 Roofing 101: Essential Knowledge")}

    <h2>Essential Roofing Terminology</h2>
    <div class="terminology-grid">
      <div class="term-card">
        <h3>Ridge</h3>
        <p>The horizontal line at the peak where two roof planes meet. Critical for ventilation and caps. The ridge is the highest point on the roof where opposing slopes connect.</p>
      </div>
      <div class="term-card">
        <h3>Underlayment</h3>
        <p>Water-resistant barrier installed beneath shingles. Protects against ice dams and leaks. Typically felt paper or synthetic material that provides secondary water protection.</p>
      </div>
      <div class="term-card">
        <h3>Flashing</h3>
        <p>Metal strips around chimneys, vents, valleys to prevent water intrusion. Common damage point. Flashing directs water away from vulnerable areas where roof planes meet structures.</p>
      </div>
      <div class="term-card">
        <h3>Vents</h3>
        <p>Roof penetrations for exhaust (bath, kitchen) and intake/exhaust ventilation systems. Proper ventilation extends roof life and prevents moisture buildup in the attic.</p>
      </div>
      <div class="term-card">
        <h3>Valley</h3>
        <p>Where two roof planes meet at an angle. High water flow area - check for debris and damage. Valleys are particularly susceptible to leaks and require special installation techniques.</p>
      </div>
      <div class="term-card">
        <h3>Drip Edge</h3>
        <p>Metal edge along eaves and rakes. Directs water away from fascia and protects underlayment. Code-required in most jurisdictions to protect the roof deck edges.</p>
      </div>
      <div class="term-card">
        <h3>Ice & Water Shield</h3>
        <p>Self-adhering waterproof membrane installed in vulnerable areas like eaves, valleys, and around penetrations. Provides superior protection against ice dams and wind-driven rain.</p>
      </div>
      <div class="term-card">
        <h3>Fascia</h3>
        <p>Vertical board running along the roof edge. Provides mounting surface for gutters and protects roof deck from weather exposure.</p>
      </div>
    </div>

    <h3>Parts of a Roof</h3>
    <div class="roof-visuals">
      <figure>
        <img src="/resources/3droof2.avif" alt="Roof system layers">
        <figcaption>Example roof system layers and components.</figcaption>
      </figure>
    </div>
    <ul>
      <li>Ridge, Ridge Vent, Hip & Ridge Shingles</li>
      <li>Felt/Underlayment, Ice & Water Barrier</li>
      <li>Flashing, Drip Edge, Starter Shingles</li>
      <li>Intake/Exhaust Vents, Baffles, Insulation</li>
    </ul>

    <hr>
    <h2>Knockable Doors: Ethical Canvassing</h2>
    <div class="knockable-section">
      <h3>✅ DO Knock:</h3>
      <ul>
        <li><strong>Homes with visible storm damage</strong> - Missing shingles, dented gutters, damaged siding</li>
        <li><strong>Neighborhoods with recent storm activity</strong> - Use storm maps and local intel; prioritize recent hail/wind corridors</li>
        <li><strong>Properties with neighbors getting work done</strong> - Social proof makes homeowners more receptive</li>
        <li><strong>Homes with older roofs (15+ years)</strong> - Higher likelihood of qualifying damage</li>
        <li><strong>Look for collateral indicators</strong> - Dented downspouts, damaged screens, hail-marked gutters</li>
      </ul>

      <h3>❌ DON'T Knock:</h3>
      <ul>
        <li><strong>Homes with "No Soliciting" signs</strong> - Respect posted wishes</li>
        <li><strong>Properties with aggressive dogs unleashed</strong> - Safety first</li>
        <li><strong>Late evening or very early morning</strong> - Mind timing and etiquette (10am-7pm ideal)</li>
        <li><strong>Homes with brand new roofs (< 5 years)</strong> - Low probability of qualifying damage</li>
        <li><strong>During severe weather or family emergencies</strong> - Use professional judgment</li>
      </ul>
    </div>

    <div class="examples">
      <p>See sample photo reports for good vs. bad examples:</p>
      <ul>
        <li><a href="/resources/Sample%20Photo%20Report%201.pdf" target="_blank">Sample Photo Report 1</a></li>
        <li><a href="/resources/Sample%20Photo%20Report%204.pdf" target="_blank">Sample Photo Report 4</a></li>
        <li><a href="/resources/Sample%20Ashpahlt%20Report%20NEW.pdf" target="_blank">Sample Asphalt Report</a></li>
        <li><a href="/resources/Sample%20Cedar%20Report.pdf" target="_blank">Sample Cedar Report</a></li>
      </ul>
    </div>
    <hr>
    <div id="quiz2">
      <h3>Quick Quiz #2</h3>
      <p>Pass/Fail mini‑quiz on general roofing concepts.</p>
      <button id="startQuickQuiz2">Start Quiz</button>
      <div id="quiz2-area"></div>
    </div>
  </div>
`;M["shingle-types-materials"]=M["shingle-types"]||`
  <div class="content-card"><h1>Shingle Types & Materials</h1><p>Content coming soon.</p></div>
`;M["handling-initial-pitch-objections"]=M["objection-handling"]||`
  <div class="content-card"><h1>Handling Initial Pitch Objections</h1><p>Content coming soon.</p></div>
`;M["post-inspection-objections"]=`
  <div class="content-card">
    <h1>Post‑Inspection Objections</h1>

    <h2>9 Common Post-Inspection Objections</h2>
    <div class="objections-grid">
      <div class="objection-card">
        <h3>1. "I need to get other estimates"</h3>
        <p><strong>Response:</strong> "That's smart! Here's what I recommend: Get those estimates, but know that insurance pays the same regardless of contractor. The difference is in service, speed, and warranty. We file the claim for you today - that starts your timeline. Other estimates can take weeks."</p>
        <p><strong>Why it works:</strong> Validates their concern while emphasizing our value-add and urgency.</p>
        <button class="practice-agnes-btn" data-scenario="m9-capstone-1">🎭 Practice with Agnes</button>

        <!-- Inline Practice Container -->
        <div class="inline-practice-container" style="display: none;" data-scenario="m9-capstone-1">
          <div class="mini-conversation-thread"></div>
          <div class="mini-input-area">
            <textarea class="mini-response-input" rows="3" placeholder="Type your response here..."></textarea>
            <div class="mini-actions">
              <button class="submit-mini-response">Submit Response</button>
              <button class="close-practice">Close Practice</button>
            </div>
          </div>
          <div class="mini-feedback" style="display: none;">
            <h4>📊 Key Points Checklist:</h4>
            <ul class="key-points-checklist"></ul>
            <div class="mini-actions">
              <button class="try-again-btn">Try Again</button>
              <button class="close-practice">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="objection-card">
        <h3>2. "This seems expensive"</h3>
        <p><strong>Response:</strong> "I hear you! But remember - insurance covers this. Your only out-of-pocket is the deductible ($1,000-2,500 typically). A new $18,000 roof for $1,500? That's the best deal you'll ever get."</p>
        <p><strong>Why it works:</strong> Reframes the cost through the insurance lens.</p>
        <button class="practice-agnes-btn" data-scenario="m9-deductible-objection-close">🎭 Practice with Agnes</button>

        <!-- Inline Practice Container -->
        <div class="inline-practice-container" style="display: none;" data-scenario="m9-deductible-objection-close">
          <div class="mini-conversation-thread"></div>
          <div class="mini-input-area">
            <textarea class="mini-response-input" rows="3" placeholder="Type your response here..."></textarea>
            <div class="mini-actions">
              <button class="submit-mini-response">Submit Response</button>
              <button class="close-practice">Close Practice</button>
            </div>
          </div>
          <div class="mini-feedback" style="display: none;">
            <h4>📊 Key Points Checklist:</h4>
            <ul class="key-points-checklist"></ul>
            <div class="mini-actions">
              <button class="try-again-btn">Try Again</button>
              <button class="close-practice">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="objection-card">
        <h3>3. "I don't want to file a claim"</h3>
        <p><strong>Response:</strong> "I understand the concern about rates. But here's the reality: 1) This is what you pay insurance FOR. 2) Rates go up regardless - inflation, area risk. 3) Not filing means $20k out-of-pocket in 2 years when it leaks. Which would you rather pay?"</p>
        <p><strong>Why it works:</strong> Addresses fear directly with facts and reframes the alternative.</p>
        <button class="practice-agnes-btn" data-scenario="m9-claim-fear">🎭 Practice with Agnes</button>

        <!-- Inline Practice Container -->
        <div class="inline-practice-container" style="display: none;" data-scenario="m9-claim-fear">
          <div class="mini-conversation-thread"></div>
          <div class="mini-input-area">
            <textarea class="mini-response-input" rows="3" placeholder="Type your response here..."></textarea>
            <div class="mini-actions">
              <button class="submit-mini-response">Submit Response</button>
              <button class="close-practice">Close Practice</button>
            </div>
          </div>
          <div class="mini-feedback" style="display: none;">
            <h4>📊 Key Points Checklist:</h4>
            <ul class="key-points-checklist"></ul>
            <div class="mini-actions">
              <button class="try-again-btn">Try Again</button>
              <button class="close-practice">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="objection-card">
        <h3>4. "My roof is fine"</h3>
        <p><strong>Response:</strong> "It looks fine from the ground! That's what I thought too. But look at these photos - [show granule loss, exposed mat, bruising]. This is like a cavity in a tooth - small now, major problem soon. We fix it now while insurance pays."</p>
        <p><strong>Why it works:</strong> Visual evidence + medical analogy makes it tangible.</p>
        <button class="practice-agnes-btn" data-scenario="m9-adjuster-pushback">🎭 Practice with Agnes</button>

        <!-- Inline Practice Container -->
        <div class="inline-practice-container" style="display: none;" data-scenario="m9-adjuster-pushback">
          <div class="mini-conversation-thread"></div>
          <div class="mini-input-area">
            <textarea class="mini-response-input" rows="3" placeholder="Type your response here..."></textarea>
            <div class="mini-actions">
              <button class="submit-mini-response">Submit Response</button>
              <button class="close-practice">Close Practice</button>
            </div>
          </div>
          <div class="mini-feedback" style="display: none;">
            <h4>📊 Key Points Checklist:</h4>
            <ul class="key-points-checklist"></ul>
            <div class="mini-actions">
              <button class="try-again-btn">Try Again</button>
              <button class="close-practice">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="objection-card">
        <h3>5. "I need to talk to my spouse"</h3>
        <p><strong>Response:</strong> "Absolutely! When can you both be available? I'm happy to come back tonight at 7pm to walk through the photos together. Or we can do a 3-way call right now - takes 5 minutes."</p>
        <p><strong>Why it works:</strong> Removes the delay while respecting the need for joint decision.</p>
        <button class="practice-agnes-btn" data-scenario="m9-spouse-decision">🎭 Practice with Agnes</button>

        <!-- Inline Practice Container -->
        <div class="inline-practice-container" style="display: none;" data-scenario="m9-spouse-decision">
          <div class="mini-conversation-thread"></div>
          <div class="mini-input-area">
            <textarea class="mini-response-input" rows="3" placeholder="Type your response here..."></textarea>
            <div class="mini-actions">
              <button class="submit-mini-response">Submit Response</button>
              <button class="close-practice">Close Practice</button>
            </div>
          </div>
          <div class="mini-feedback" style="display: none;">
            <h4>📊 Key Points Checklist:</h4>
            <ul class="key-points-checklist"></ul>
            <div class="mini-actions">
              <button class="try-again-btn">Try Again</button>
              <button class="close-practice">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="objection-card">
        <h3>6. "I'll just handle this myself"</h3>
        <p><strong>Response:</strong> "You absolutely can! But here's what most homeowners don't know: Insurance companies hire adjusters whose job is to minimize payouts. We're your advocate - we know what to look for, what codes require, and how to negotiate. Most DIY claims get 30-40% less coverage."</p>
        <p><strong>Why it works:</strong> Educates on the hidden challenge and value of professional representation.</p>
        <button class="practice-agnes-btn" data-scenario="m9-scope-walkthrough">🎭 Practice with Agnes</button>

        <!-- Inline Practice Container -->
        <div class="inline-practice-container" style="display: none;" data-scenario="m9-scope-walkthrough">
          <div class="mini-conversation-thread"></div>
          <div class="mini-input-area">
            <textarea class="mini-response-input" rows="3" placeholder="Type your response here..."></textarea>
            <div class="mini-actions">
              <button class="submit-mini-response">Submit Response</button>
              <button class="close-practice">Close Practice</button>
            </div>
          </div>
          <div class="mini-feedback" style="display: none;">
            <h4>📊 Key Points Checklist:</h4>
            <ul class="key-points-checklist"></ul>
            <div class="mini-actions">
              <button class="try-again-btn">Try Again</button>
              <button class="close-practice">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="objection-card">
        <h3>7. "I've never filed a claim before"</h3>
        <p><strong>Response:</strong> "Perfect - I'll walk you through every step. It's actually very simple: 1) We call together (3 minutes), 2) Adjuster comes out (I'll be here), 3) Approved, 4) We schedule install. I've done this 500+ times - you're in good hands."</p>
        <p><strong>Why it works:</strong> Simplifies the unknown and builds confidence.</p>
        <button class="practice-agnes-btn" data-scenario="m9-first-time-claim">🎭 Practice with Agnes</button>

        <!-- Inline Practice Container -->
        <div class="inline-practice-container" style="display: none;" data-scenario="m9-first-time-claim">
          <div class="mini-conversation-thread"></div>
          <div class="mini-input-area">
            <textarea class="mini-response-input" rows="3" placeholder="Type your response here..."></textarea>
            <div class="mini-actions">
              <button class="submit-mini-response">Submit Response</button>
              <button class="close-practice">Close Practice</button>
            </div>
          </div>
          <div class="mini-feedback" style="display: none;">
            <h4>📊 Key Points Checklist:</h4>
            <ul class="key-points-checklist"></ul>
            <div class="mini-actions">
              <button class="try-again-btn">Try Again</button>
              <button class="close-practice">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="objection-card">
        <h3>8. "What if my claim gets denied?"</h3>
        <p><strong>Response:</strong> "Great question. That's why we have a contingency agreement - if we don't get you fully approved, you owe us NOTHING. The contract is null and void. Zero risk to you."</p>
        <p><strong>Why it works:</strong> Removes financial risk completely.</p>
        <button class="practice-agnes-btn" data-scenario="m9-denial-fear">🎭 Practice with Agnes</button>

        <!-- Inline Practice Container -->
        <div class="inline-practice-container" style="display: none;" data-scenario="m9-denial-fear">
          <div class="mini-conversation-thread"></div>
          <div class="mini-input-area">
            <textarea class="mini-response-input" rows="3" placeholder="Type your response here..."></textarea>
            <div class="mini-actions">
              <button class="submit-mini-response">Submit Response</button>
              <button class="close-practice">Close Practice</button>
            </div>
          </div>
          <div class="mini-feedback" style="display: none;">
            <h4>📊 Key Points Checklist:</h4>
            <ul class="key-points-checklist"></ul>
            <div class="mini-actions">
              <button class="try-again-btn">Try Again</button>
              <button class="close-practice">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="objection-card">
        <h3>9. "I'm going to wait and see if it gets worse"</h3>
        <p><strong>Response:</strong> "I understand the hesitation, but here's the problem: Insurance only covers storm damage within your policy's statute of limitations - usually 1-2 years. Wait too long, and you lose coverage entirely. Plus, every day UV light and weather degrade the damaged shingles more. File now while you're protected."</p>
        <p><strong>Why it works:</strong> Creates urgency with real consequences.</p>
        <button class="practice-agnes-btn" data-scenario="m9-wait-and-see">🎭 Practice with Agnes</button>

        <!-- Inline Practice Container -->
        <div class="inline-practice-container" style="display: none;" data-scenario="m9-wait-and-see">
          <div class="mini-conversation-thread"></div>
          <div class="mini-input-area">
            <textarea class="mini-response-input" rows="3" placeholder="Type your response here..."></textarea>
            <div class="mini-actions">
              <button class="submit-mini-response">Submit Response</button>
              <button class="close-practice">Close Practice</button>
            </div>
          </div>
          <div class="mini-feedback" style="display: none;">
            <h4>📊 Key Points Checklist:</h4>
            <ul class="key-points-checklist"></ul>
            <div class="mini-actions">
              <button class="try-again-btn">Try Again</button>
              <button class="close-practice">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2>Creating Urgency (Without Being Pushy)</h2>
    <ul>
      <li><strong>Weather Window:</strong> "We're 3 weeks out on scheduling. If we file today, we can get you on the schedule before winter."</li>
      <li><strong>Statute of Limitations:</strong> "Storm was [date]. You have [X] months to file. After that, insurance won't cover it."</li>
      <li><strong>Deterioration:</strong> "Every day without protection, UV damages the shingles more. In 6 months, this could be a leak."</li>
      <li><strong>Matching Availability:</strong> "We can only guarantee color match if we order within 30 days. After that, discontinued colors become a problem."</li>
    </ul>

    <h2>The Empathy Framework</h2>
    <p>For every objection, use this 4-step framework:</p>
    <ol>
      <li><strong>Acknowledge:</strong> "I completely understand..."</li>
      <li><strong>Educate:</strong> "Here's what most people don't know..."</li>
      <li><strong>Evidence:</strong> "Let me show you the photos/data..."</li>
      <li><strong>Ask:</strong> "Does that make sense? Should we move forward?"</li>
    </ol>
  </div>
`;M["damage-identification"]=M["roofing-damage-id"]||`
  <div class="content-card"><h1>Damage Identification</h1><p>Content coming soon.</p></div>
`;M["filing-claim-closing"]=M["claim-closing"]||`
  <div class="content-card"><h1>Filing the Claim & Closing</h1><p>Content coming soon.</p></div>
`;M["closing-objections"]=`
  <div class="content-card">
    <h1>Closing Objections</h1>

    <h2>12 Final Closing Objections & Responses</h2>
    <div class="closing-objections">
      <div class="closing-objection">
        <h3>"I want to wait for more bids"</h3>
        <p><strong>Response:</strong> "I respect that. But here's what happens: We file TODAY, start your timeline. Other contractors will bid the same - insurance sets the price. Difference is, we're the fastest in the area. Every week you wait is a week later you get your new roof. File now, get other bids while we wait for the adjuster?"</p>
      </div>

      <div class="closing-objection">
        <h3>"I need to think about it"</h3>
        <p><strong>Response:</strong> "Absolutely. What specifically do you need to think about? [Listen] ... Most people say that when they're unsure about [objection]. Let me address that: [handle objection]. Does that help?"</p>
      </div>

      <div class="closing-objection">
        <h3>"Call me next week"</h3>
        <p><strong>Response:</strong> "I can do that. But can I ask - what changes between now and next week? [Listen] ... Here's my concern: your statute of limitations is ticking, weather window is closing. Can we at least file the claim today? That reserves your rights. You can still decide on the contractor later."</p>
      </div>

      <div class="closing-objection">
        <h3>"I'm not sure about the deductible"</h3>
        <p><strong>Response:</strong> "I get it - deductibles can sting. But let's look at the math: Your deductible is probably $1,000-2,500. A new roof costs $15,000-25,000. You're paying 5-10% for a brand new roof. Where else can you get that return? Plus, not fixing it means leaks in 6 months - then you pay the full $20k yourself."</p>
      </div>

      <div class="closing-objection">
        <h3>"My spouse handles this stuff"</h3>
        <p><strong>Response:</strong> "Perfect! Are they home? I can wait. Or we can do a quick 3-way call - takes 5 minutes to walk through the photos. I'm here now, roof's already documented, let's get them on the same page so you can make the best decision together."</p>
      </div>

      <div class="closing-objection">
        <h3>"I don't trust contractors"</h3>
        <p><strong>Response:</strong> "I totally understand - this industry has a bad reputation. That's exactly why we do things differently. Contingency agreement means you only pay if we deliver. No money upfront, no risk to you. We're the only company in the area that offers this protection. Give me a shot to prove we're different."</p>
      </div>
    </div>

    <h2>The Assumptive Close</h2>
    <p>After handling objections, assume the sale:</p>
    <ul>
      <li>"Let me text you that contract now - what's your cell?"</li>
      <li>"I'll mark you down for [color]. Any preference on shingle style?"</li>
      <li>"Perfect! I'll get with my scheduling team and text you a date this week."</li>
      <li>"Great! Let me pull up the contract - I'll walk you through it real quick."</li>
    </ul>

    <p>Common pushbacks when moving from claim filing to the close, with concise responses and next‑step prompts.</p>
    <div class="script" data-text-source="true">
      <button class="speak-btn" aria-label="Listen to script">🔊</button>
      <p><strong>"I need to think about it."</strong><br>
      Absolutely—totally fair. Would it help if I summarize where we are and what happens next? It's a simple step: we'll handle the carrier communication and keep you updated. The only cost to you is the deductible if fully approved.</p>
    </div>
    <div class="script" data-text-source="true">
      <button class="speak-btn" aria-label="Listen to script">🔊</button>
      <p><strong>"I'll just call my insurance myself."</strong><br>
      That works too. The benefit of authorizing us is we do the legwork—photos, documentation, and follow‑ups—while keeping you in the loop, so you're not the middle‑person.</p>
    </div>
    <div class="script" data-text-source="true">
      <button class="speak-btn" aria-label="Listen to script">🔊</button>
      <p><strong>"I'm worried about costs."</strong><br>
      Understandable. If approved, your only out‑of‑pocket is the deductible. No surprises—everything is documented and reviewed with you before work begins.</p>
    </div>
    <h3>Flow to Close</h3>
    <ol>
      <li>Recap inspection results and insurance path</li>
      <li>Clarify deductible and timeline</li>
      <li>Present authorization/contingency forms</li>
      <li>Set expectations for adjuster meeting</li>
      <li>Schedule next touchpoint</li>
    </ol>
    <p>Review the prior section <em>Filing the Claim & Closing</em> for scripts and carrier variations.</p>
  </div>
`;M["discontinued-products"]=`
  <div class="content-card">
    <h1>Discontinued Products & Special Scenarios</h1>

    <h2>Why Discontinued Products Matter</h2>
    <div class="discontinued-explainer">
      <p><strong>Insurance "Matching Law":</strong> In many states, if your shingle is discontinued and they can't match it, insurance MUST replace the entire roof (not just damaged sections).</p>

      <h3>How to Use This:</h3>
      <ol>
        <li><strong>Check the shingle:</strong> Look for brand/model on packaging or check attic</li>
        <li><strong>Google "[brand] [model] discontinued"</strong></li>
        <li><strong>If discontinued:</strong> "Great news! Your shingle is discontinued. State law says insurance must replace the whole roof since they can't match. You're getting a full new roof!"</li>
      </ol>
    </div>

    <h2>Common Discontinued Shingles (2020-2024)</h2>
    <ul>
      <li><strong>GAF Timberline HD</strong> (replaced by HDZ in 2019)</li>
      <li><strong>Owens Corning Duration</strong> (older versions discontinued)</li>
      <li><strong>CertainTeed Landmark</strong> (certain colors discontinued)</li>
      <li><strong>IKO Cambridge</strong> (many colors discontinued)</li>
      <li><strong>GAF Royal Sovereign</strong> (3-tab, fully discontinued)</li>
      <li><strong>CertainTeed XT 25</strong> (3-tab, fully discontinued)</li>
    </ul>

    <h2>English vs. Metric Dimensions</h2>
    <div class="dimensions-explainer">
      <p>Older shingles used <strong>English dimensions</strong> (different exposure measurements). Newer shingles use <strong>Metric dimensions</strong>. They CANNOT be mixed because:</p>
      <ul>
        <li>Different exposure sizes don't align properly</li>
        <li>Sealant strips won't line up correctly</li>
        <li>Creates visible mismatch and sealing failures</li>
        <li><strong>Result:</strong> Must replace entire slope or roof to maintain integrity</li>
      </ul>
    </div>

    <h2>Using iTel Reports</h2>
    <p><strong>iTel</strong> is a third-party service that verifies product discontinuation. Use it to:</p>
    <ol>
      <li>Identify the exact shingle brand and model</li>
      <li>Research manufacturer databases</li>
      <li>Generate official discontinuation report</li>
      <li>Attach report to insurance estimate</li>
      <li>Prove to adjuster that matching is impossible</li>
    </ol>

    <h2>Matching Law Arguments</h2>
    <p>Key legal and policy language to reference:</p>
    <ul>
      <li><strong>"Like kind and quality":</strong> Policy language requiring matching materials</li>
      <li><strong>Maryland Bulletin 18-23:</strong> State guidance on matching requirements</li>
      <li><strong>Aesthetic mismatch:</strong> When no true match exists, full replacement required to avoid visible differences</li>
    </ul>

    <h2>Code Compliance Scenarios</h2>
    <div class="code-scenarios">
      <h3>Virginia R905.2.2 - Low Slope Restriction</h3>
      <p>Asphalt shingles are NOT allowed on slopes below 2:12 pitch. If existing roof violates code, full replacement with proper materials required.</p>

      <h3>Maryland IRC R703.2 - Water-Resistive Barrier</h3>
      <p>Code requires water-resistive barrier (WRB) behind all exterior siding. If missing, must be installed during repairs - often requires full siding replacement.</p>
    </div>

    <h2>Failed Repair Attempts</h2>
    <p>If adjuster initially approves only partial repairs, document why repairs won't work:</p>
    <ul>
      <li><strong>Brittle Test:</strong> Video of old shingles breaking/cracking when you try to lift them</li>
      <li><strong>Non-Bonding:</strong> Photos showing adhesive strips no longer functional</li>
      <li><strong>Color Fade:</strong> Side-by-side showing severe mismatch between old and new</li>
      <li><strong>Result:</strong> Send documentation proving repairs are impossible, request full replacement</li>
    </ul>

    <h2>Reference Resources</h2>
    <p>Handling discontinued shingles and product mismatches. Reference manufacturer resources and real‑world examples.</p>
    <ul>
      <li><a href="/resources/Training%20Manual.docx" target="_blank">Training Manual</a></li>
      <li><a href="/resources/Sales%20Operations%20and%20Tasks.docx" target="_blank">Sales Operations & Tasks</a></li>
    </ul>
  </div>
`;M["sales-cycle-job-flow"]=M["sales-cycle"]||`
  <div class="content-card"><h1>Sales Cycle & Job Flow</h1><p>Content coming soon.</p></div>
`;M["final-exam"]=`
  <div class="content-card" id="final-exam">
    <h1>Final Exam / Certification</h1>

    <h2>Certification Requirements</h2>
    <div class="cert-requirements">
      <h3>To Earn Your Roof-ER Certification:</h3>
      <ol>
        <li>✓ Complete all 16 training modules</li>
        <li>✓ Watch all 5 training videos to 90% completion</li>
        <li>✓ Complete at least 3 Agnes role-play scenarios</li>
        <li>✓ Pass this final exam with 80% or higher</li>
      </ol>

      <h3>Final Exam Format:</h3>
      <ul>
        <li><strong>Questions:</strong> 50 multiple-choice and scenario-based</li>
        <li><strong>Time Limit:</strong> 60 minutes (untimed practice mode available)</li>
        <li><strong>Topics Covered:</strong> All 16 modules</li>
        <li><strong>Passing Score:</strong> 80% (40/50 correct)</li>
        <li><strong>Retakes:</strong> Unlimited attempts</li>
      </ul>

      <h3>After Passing:</h3>
      <ul>
        <li>🏆 Digital certificate emailed to you</li>
        <li>📋 Added to Roof-ER certified sales team</li>
        <li>💼 Ready for field assignments</li>
        <li>📚 Ongoing training & support</li>
      </ul>
    </div>

    <div class="exam-tips">
      <h3>Exam Tips:</h3>
      <ul>
        <li>Review module summaries before starting</li>
        <li>Focus on scripts, objection handling, and technical terminology</li>
        <li>Take practice mode first to identify weak areas</li>
        <li>Use your notes - open book in practice mode</li>
      </ul>
    </div>

    <h2>Exam Topic Breakdown</h2>
    <ul>
      <li><strong>Door Knocking & Initial Pitch (10 questions):</strong> Opening scripts, objection handling, appointment setting</li>
      <li><strong>Inspection & Documentation (12 questions):</strong> Damage identification, photo techniques, test squares</li>
      <li><strong>Post-Inspection Pitch (8 questions):</strong> Evidence presentation, urgency creation, objection responses</li>
      <li><strong>Filing & Closing (10 questions):</strong> Claim filing process, contingency agreement, authorization forms</li>
      <li><strong>Special Scenarios (5 questions):</strong> Discontinued products, matching law, code compliance</li>
      <li><strong>Sales Cycle & Job Flow (5 questions):</strong> Timeline, milestones, team coordination</li>
    </ul>

    <p>50 questions total: 35 multiple choice, 10 fill‑in‑the‑blank, 5 short answer. Auto‑graded where applicable with retake option.</p>
    <button id="startFinalExam">Start Final Exam</button>
    <div id="exam-area"></div>
  </div>
`;M.welcome+=`
  <hr>
  <div class="org-chart">
    <h4>Company Structure</h4>
    <p>Roof-ER is organized with clear leadership and defined roles to serve homeowners with excellence.</p>
  </div>
  <div id="quiz1">
    <h3>Quick Quiz #1 (Company Overview)</h3>
    <button id="startQuickQuiz1">Start Quiz</button>
    <div id="quiz1-area"></div>
  </div>
`;M["role-play"]=(M["role-play"]||"").replace('<div id="chat-container">',`<div class="rp-controls">
      <label>AI Name: <input id="rp-name" type="text" value="Agnes" /></label>
      <label>AI Role:
        <select id="rp-role">
          <option value="homeowner">Homeowner</option>
          <option value="rep">Sales Rep</option>
        </select>
      </label>
      <label>Persona:
        <select id="rp-persona">
          <option value="skeptical">Skeptical</option>
          <option value="busy">Busy</option>
          <option value="cost">Cost‑Concerned</option>
          <option value="neutral">Neutral</option>
        </select>
      </label>
      <label>Scenario:
        <select id="rp-scenario">
          <option value="noDamage">Doesn’t think there’s damage</option>
          <option value="badTiming">Bad time at the door</option>
          <option value="insuranceDIY">Wants to call insurance themselves</option>
          <option value="hoaRules">HOA restrictions</option>
          <option value="budget">Worried about cost/deductible</option>
          <option value="schedule">Scheduling/availability conflict</option>
          <option value="claimClosed">Claim already closed / prior denial</option>
          <option value="materials">Discontinued materials concern</option>
          <option value="safety">Ladder/safety hesitation</option>
        </select>
      </label>
      <div class="rp-actions">
        <button id="rp-reset">New Scenario</button>
        <button id="rp-hint">Hint</button>
        <button id="rp-export">Export Transcript</button>
      </div>
    </div>
    <div id="chat-container">`);function G(i,t,e){const n=`video-watched-${t}`,o=`video-progress-${t}`,a=localStorage.getItem(n)==="true",l=parseFloat(localStorage.getItem(o)||"0");return`
    <div class="video-player-container" style="margin: 20px 0; background: #f5f5f5; border-radius: 8px; padding: 20px;">
      <h3 style="margin-top: 0;">${e}</h3>
      <div style="position: relative;">
        <video
          id="${t}"
          controls
          style="width: 100%; max-width: 800px; border-radius: 4px;"
          ${l>0?`data-start="${l}"`:""}
        >
          <source src="${i}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        ${a?'<div class="completion-badge" style="position: absolute; top: 10px; right: 10px; background: #4caf50; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px;">✓ Completed</div>':""}
      </div>
      <div class="video-progress" style="margin-top: 10px; font-size: 14px; color: #666;">
        Progress: <span id="${t}-progress">0</span>%
      </div>
    </div>
    <script>
      (function() {
        const video = document.getElementById('${t}');
        const startTime = video.getAttribute('data-start');
        if (startTime) video.currentTime = parseFloat(startTime);

        video.addEventListener('timeupdate', function() {
          const progress = (video.currentTime / video.duration) * 100;
          document.getElementById('${t}-progress').textContent = Math.round(progress);
          localStorage.setItem('${o}', video.currentTime.toString());

          if (progress >= 90) {
            localStorage.setItem('${n}', 'true');
          }
        });
      })();
    <\/script>
  `}const O=window.speechSynthesis;let $=null;function qr(i){const t=i.target.closest(".speak-btn");if(!t)return;const e=t.closest('[data-text-source="true"]');if(!e)return;const n=e.innerText.trim();if(O.speaking&&$&&(O.cancel(),$.text===n)){$=null;return}const o=new SpeechSynthesisUtterance(n);$=o,o.onerror=a=>console.error("SpeechSynthesis Error",a),O.speak(o)}function bt(){const i=document.getElementById("items-pool"),t=document.getElementById("sorted-list"),e=document.getElementById("sales-cycle-feedback");if(!i||!t||!e)return;let n=null;const o=["1","2","3","4","5"];i.addEventListener("dragstart",l=>{n=l.target,setTimeout(()=>{n&&(n.style.display="none")},0)}),i.addEventListener("dragend",()=>{setTimeout(()=>{n&&(n.style.display="block",n=null)},0)}),t.addEventListener("dragover",l=>l.preventDefault()),t.addEventListener("drop",l=>{l.preventDefault(),n&&(t.appendChild(n),a())});function a(){const l=t.querySelectorAll(".draggable-item");if(l.length!==o.length)return;const c=Array.from(l).map(u=>u.dataset.order);JSON.stringify(c)===JSON.stringify(o)?(e.textContent="Correct! That is the right order.",e.className="feedback-message correct"):(e.textContent="Not quite right. Try again!",e.className="feedback-message incorrect"),e.style.display="block"}}function wt(){const i=document.querySelectorAll("#objections-list .draggable-item"),t=document.querySelectorAll(".drop-zone"),e=document.getElementById("objection-feedback");let n=0;const o=i.length;let a=null;i.forEach(l=>{l.addEventListener("dragstart",c=>{a=c.target,setTimeout(()=>{a&&a.classList.add("dragging")},0)}),l.addEventListener("dragend",()=>{a&&a.classList.remove("dragging")})}),t.forEach(l=>{l.addEventListener("dragover",c=>{c.preventDefault(),l.classList.add("drag-over")}),l.addEventListener("dragleave",()=>{l.classList.remove("drag-over")}),l.addEventListener("drop",c=>{if(c.preventDefault(),l.classList.remove("drag-over"),!a||l.children.length>1)return;const u=l.dataset.match,d=a.dataset.match;if(u===d){const p=l.querySelector(".response-text");p&&(p.style.display="none"),l.appendChild(a),a.setAttribute("draggable","false"),l.classList.add("correctly-matched"),n++,n===o&&e&&(e.textContent="Great job! All objections matched correctly.",e.className="feedback-message correct",e.style.display="block")}})})}function Fr(){console.log("🎭 Initializing Module 9 inline practice system...");const i=document.querySelectorAll(".practice-agnes-btn");i.forEach(o=>{o.addEventListener("click",function(){const a=this.getAttribute("data-scenario"),l=document.querySelector(`.inline-practice-container[data-scenario="${a}"]`);l&&(l.style.display==="none"?(l.style.display="block",Et(a,l)):(l.style.display="none",le(l)))})}),document.querySelectorAll(".close-practice").forEach(o=>{o.addEventListener("click",function(){const a=this.closest(".inline-practice-container");a&&(a.style.display="none",le(a))})}),document.querySelectorAll(".submit-mini-response").forEach(o=>{o.addEventListener("click",function(){const a=this.closest(".inline-practice-container");a&&Vr(a)})}),document.querySelectorAll(".try-again-btn").forEach(o=>{o.addEventListener("click",function(){const a=this.closest(".inline-practice-container");if(a){const l=a.getAttribute("data-scenario");le(a),Et(l,a)}})}),console.log(`✅ Initialized ${i.length} inline practice sessions`)}function Et(i,t){const n=getAllAgnesScenarios().find(a=>a.id===i);if(!n){console.error("Scenario not found:",i);return}t.dataset.currentTurn="0",t.dataset.maxTurns="3";const o=t.querySelector(".mini-conversation-thread");o.innerHTML=`
    <div class="conversation-message agnes-message">
      <strong>Agnes:</strong> ${n.prompt}
    </div>
  `,t.querySelector(".mini-input-area").style.display="block",t.querySelector(".mini-feedback").style.display="none",t.querySelector(".mini-response-input").value=""}function Vr(i){const t=i.querySelector(".mini-response-input"),e=t.value.trim();if(!e){alert("Please enter a response before submitting.");return}const n=parseInt(i.dataset.currentTurn||"0"),o=parseInt(i.dataset.maxTurns||"3"),a=i.getAttribute("data-scenario"),l=i.querySelector(".mini-conversation-thread"),c=document.createElement("div");c.className="conversation-message user-message",c.innerHTML=`<strong>You:</strong> ${e}`,l.appendChild(c),t.value="",l.scrollTop=l.scrollHeight;const u=n+1;i.dataset.currentTurn=u.toString(),u>=o?setTimeout(()=>Br(i,a),500):setTimeout(()=>{const d=Ur(a,u),p=document.createElement("div");p.className="conversation-message agnes-message",p.innerHTML=`<strong>Agnes:</strong> ${d}`,l.appendChild(p),l.scrollTop=l.scrollHeight},800)}function Ur(i,t){const n={"m9-capstone-1":["That sounds reasonable, but I just got off the phone with three other contractors. What makes you different?","Okay, I understand the timeline part. But what about the price? Can you match if someone comes in lower?"],"m9-deductible-objection-close":["A new roof for $1,500 sounds great, but what if my rates go up more than that over time?","I hear you, but my neighbor said their insurance went up $800/year after filing a claim. Is that normal?"],"m9-claim-fear":["But won't filing a claim make my insurance company drop me or raise my rates significantly?","You say rates go up anyway, but how much more will they go up if I actually file this claim?"],"m9-adjuster-pushback":["I see the photos, but the damage doesn't look that bad to me. Are you sure insurance will even approve this?","Okay, but what if the insurance adjuster disagrees with your assessment? Then what?"],"m9-spouse-decision":["My spouse works late most nights. Can we schedule something for next weekend instead?","We both like to think things over for a few days. Can I call you back next week?"],"m9-scope-walkthrough":["That makes sense, but I'm pretty handy. Can't I just take photos and submit them myself?","What about the cost of hiring you? Won't that eat into my claim payout?"],"m9-first-time-claim":["That sounds simple enough, but what happens if the adjuster comes out and finds nothing wrong?","I'm worried about the process taking forever. How long does it typically take from start to finish?"],"m9-denial-fear":["Zero risk sounds good, but won't I have wasted time if the claim gets denied?","What percentage of your claims actually get approved? Is there a reason to think mine might not?"],"m9-wait-and-see":["I understand the statute of limitations, but how can I be sure this damage is from a recent storm?","What if I wait just a few more months to see if any leaks develop? Would that really hurt my case?"]}[i]||["I appreciate that information. Can you tell me more about how this process works?","That makes sense. What would be the next steps if I decide to move forward?"];return n[t-1]||n[n.length-1]}function Br(i,t){const n=getAllAgnesScenarios().find(d=>d.id===t);if(!n)return;i.querySelector(".mini-input-area").style.display="none";const o=i.querySelectorAll(".user-message"),a=Array.from(o).map(d=>d.textContent.replace("You:","").trim()).join(" "),l=scoreResponse(a,n.keyPoints),c=i.querySelector(".mini-feedback"),u=c.querySelector(".key-points-checklist");u.innerHTML=n.keyPoints.map(d=>{const p=l.matchedPoints.includes(d);return`
      <li class="${p?"matched":"missed"}">
        ${p?"✓":"✗"} ${d}
      </li>
    `}).join(""),c.style.display="block"}function le(i){i.dataset.currentTurn="0";const t=i.querySelector(".mini-conversation-thread");t.innerHTML="",i.querySelector(".mini-response-input").value="",i.querySelector(".mini-input-area").style.display="block",i.querySelector(".mini-feedback").style.display="none"}function Gr(){if(console.log("🎭 Initializing Agnes Role-Play System..."),typeof getAllAgnesScenarios!="function"){console.error("❌ Agnes scenarios not loaded. Check that agnes-scenarios.js is included before index.tsx"),alert("Error: Agnes scenario data not loaded. Please check browser console.");return}if(typeof scoreResponse!="function"){console.error("❌ scoreResponse function not found. Check agnes-scenarios.js"),alert("Error: Scoring function not available. Please check browser console.");return}const i={selectedRole:null,selectedPersonality:null,difficulty:"beginner",scenarios:[],currentScenarioIndex:0,currentScenario:null,responses:[],scores:[],hintsUsed:0,startTime:Date.now(),recognition:null,scenarioStartTime:null,conversationHistory:[],currentTurn:1,maxTurns:5};function t(g){["roleplay-setup","personality-selector","scenario-display","feedback-area","session-summary"].forEach(v=>{const T=document.getElementById(v);T&&(T.style.display=v===g?"block":"none")})}function e(){console.log("📋 Showing role selection"),t("roleplay-setup"),i.selectedRole=null,i.scenarios=[],i.currentScenarioIndex=0,i.responses=[],i.scores=[],i.hintsUsed=0,i.startTime=Date.now()}function n(g){g<0||g>=i.scenarios.length||(i.currentScenarioIndex=g,i.currentScenario=i.scenarios[g],i.scenarioStartTime=Date.now(),o(i.currentScenario))}function o(g){const C=document.getElementById("scenario-title"),v=document.getElementById("scenario-context"),T=document.getElementById("agnes-prompt"),w=document.getElementById("scenario-progress"),I=document.getElementById("user-response"),x=document.getElementById("submit-response");C&&(C.textContent=g.id||`Scenario ${i.currentScenarioIndex+1}`),v&&(v.textContent=`Role: ${g.role} | Difficulty: beginner`),T&&(T.textContent=g.prompt||""),w&&(w.textContent=`Scenario ${i.currentScenarioIndex+1} of ${i.scenarios.length}`),I&&(I.value="",I.disabled=!1),x&&(x.disabled=!1,x.textContent="Submit Response"),i.conversationHistory=[],i.currentTurn=1,g.prompt&&i.conversationHistory.push({sender:"agnes",message:g.prompt,timestamp:Date.now()}),a(),l()}function a(){const g=document.getElementById("conversation-thread");g&&(g.innerHTML=i.conversationHistory.map(C=>{const v=C.sender==="agnes";return`
        <div class="conversation-message ${v?"agnes-message":"user-message"}">
          <div class="message-sender">${v?"Agnes":"You"}</div>
          <div class="message-content">${C.message}</div>
        </div>
      `}).join(""),g.scrollTop=g.scrollHeight)}function l(){const g=document.getElementById("turn-counter");g&&(g.textContent=`Turn ${i.currentTurn} of ${i.maxTurns}`)}async function c(){var g,C;try{const v=document.getElementById("user-response"),T=document.getElementById("submit-response");if(!v||!T)return;const w=v.value.trim();if(!w){alert("Please enter a response before submitting.");return}v.disabled=!0,T.disabled=!0,T.textContent="Processing...";const I=i.currentScenario;if(i.conversationHistory.push({sender:"user",message:w,timestamp:Date.now()}),a(),v.value="",i.currentTurn>=i.maxTurns){const x=window.scoreResponse(w,I.expectedKeyPoints||[],((g=I.rubric)==null?void 0:g.keywords)||[],((C=I.rubric)==null?void 0:C.passThreshold)||70);let A=null;if(L)try{A=await u(w,I,x)}catch(P){console.warn("AI feedback unavailable:",P)}i.responses.push({scenarioIndex:i.currentScenarioIndex,userResponse:w,timestamp:new Date().toISOString(),conversationHistory:[...i.conversationHistory]}),i.scores.push({...x,scenarioIndex:i.currentScenarioIndex,aiFeedback:A}),p(x,A),v.disabled=!1,T.textContent="Submit Response"}else{const x=await d(w,I);i.conversationHistory.push({sender:"agnes",message:x,timestamp:Date.now()}),i.currentTurn++,a(),l(),v.disabled=!1,T.disabled=!1,T.textContent=i.currentTurn>=i.maxTurns?"Finish Conversation":"Continue Conversation"}}catch(v){console.error("Error submitting response:",v),alert("Error processing response. Please try again.");const T=document.getElementById("user-response"),w=document.getElementById("submit-response");T&&(T.disabled=!1),w&&(w.disabled=!1,w.textContent="Submit Response")}}async function u(g,C,v){var w;if(!L)return null;const T=`You are Agnes, an expert insurance training coach. Analyze this role-play response and provide constructive feedback.

Scenario: ${C.id}
User Response: "${g}"

Performance:
- Score: ${v.score}/100
- Matched: ${v.matchedPoints.join(", ")||"None"}
- Missed: ${v.missedPoints.join(", ")||"None"}

Provide feedback in JSON format:
{
  "strengths": ["Strength 1", "Strength 2"],
  "improvements": ["Improvement 1", "Improvement 2"]
}

Be specific, actionable, and encouraging.`;try{let A=(await(await L.chats.create({model:"gemini-2.0-flash-exp",config:{temperature:.7,maxOutputTokens:500}})).sendMessage(T)).text.trim();return A.includes("```json")&&(A=((w=A.match(/```json\n([\s\S]*?)\n```/))==null?void 0:w[1])||A),JSON.parse(A)}catch{return{strengths:[`You scored ${v.score}/100`,`Matched ${v.matchedPoints.length} key points`],improvements:[`Try to include: ${v.missedPoints.slice(0,2).join(", ")}`,"Practice using clear, professional language"]}}}async function d(g,C){if(!L){const v=["Interesting approach. Can you tell me more about why that would work?","I hear what you're saying, but I'm still concerned. What else can you offer?","That's helpful, but I need to understand the timeline better. When would this happen?","Okay, but what about the cost? I'm worried about my deductible.","I appreciate that, but I'd like to think about it. Can you leave me some information?"];return v[i.currentTurn-1]||v[v.length-1]}try{const v=i.conversationHistory.map(_=>`${_.sender==="user"?"Sales Rep":"Agnes"}: ${_.message}`).join(`
`),T={supportive:"Respond warmly and positively, showing genuine interest. Ask follow-up questions that help the rep demonstrate their skills.",realistic:"Respond with typical homeowner concerns. Be reasonable but skeptical. Require solid information before agreeing.",skeptical:"Challenge their response with tough objections. Be critical but fair. Make them work for the close.",rushed:"Act busy and impatient. Give short responses. Push back on time commitments. Be somewhat dismissive.","final-boss":"Combine multiple objections. Switch between concerns rapidly. Test their ability to handle complex, multilayered objections."},w=i.selectedPersonality||"realistic",I=T[w]||T.realistic,x=`You are Agnes, a homeowner in a sales roleplay scenario. The sales rep is practicing their pitch with you.

Scenario: ${C.id}
Personality: ${w}
Current Turn: ${i.currentTurn} of ${i.maxTurns}

Personality Instructions: ${I}

Conversation so far:
${v}

Latest Sales Rep Response: "${g}"

Generate Agnes's natural follow-up response (1-3 sentences). Your response should:
1. React naturally to what the sales rep just said
2. ${i.currentTurn<i.maxTurns-1?"Raise a new concern or ask a follow-up question":"Move toward either acceptance or final objection"}
3. Stay in character with the ${w} personality
4. Keep it conversational and realistic
5. DO NOT provide feedback - just respond as Agnes would

Response (plain text only, no JSON):`;return(await(await L.chats.create({model:"gemini-2.0-flash-exp",config:{temperature:.8,maxOutputTokens:200}})).sendMessage(x)).text.trim()}catch(v){return console.warn("Error generating Agnes followup:",v),"I see. Let me think about that for a moment. Is there anything else you can tell me?"}}function p(g,C){const v=document.getElementById("score-circle"),T=document.getElementById("score-text"),w=document.getElementById("matched-points-list"),I=document.getElementById("missed-points-list"),x=document.getElementById("strengths-list"),A=document.getElementById("improvements-list");v&&(v.textContent=String(g.score),v.style.borderColor=g.score>=85?"#4caf50":g.score>=70?"#ff9800":"#f44336",v.style.color=g.score>=85?"#4caf50":g.score>=70?"#ff9800":"#f44336"),T&&(T.textContent=g.score>=70?`Great! You passed with ${g.score}/100`:`Score: ${g.score}/100 (Need 70 to pass)`),w&&(w.innerHTML=g.matchedPoints.length>0?g.matchedPoints.map(P=>`<li style="margin-bottom: 8px;"><span style="color: #4caf50; margin-right: 8px;">✓</span>${P}</li>`).join(""):"<li>No key points matched</li>"),I&&(I.innerHTML=g.missedPoints.length>0?g.missedPoints.map(P=>`<li style="margin-bottom: 8px;"><span style="color: #ff9800; margin-right: 8px;">✗</span>${P}</li>`).join(""):"<li>All key points covered!</li>"),C&&x&&A&&(x.innerHTML=C.strengths.map(P=>`<li style="margin-bottom: 8px;">${P}</li>`).join(""),A.innerHTML=C.improvements.map(P=>`<li style="margin-bottom: 8px;">${P}</li>`).join("")),t("feedback-area")}function f(){const g=i.currentScenarioIndex+1;g>=i.scenarios.length?m():(n(g),t("scenario-display"))}function h(){i.responses.length>0&&i.responses.pop(),i.scores.length>0&&i.scores.pop(),o(i.currentScenario),t("scenario-display")}function m(){t("session-summary");const g=document.getElementById("session-summary");if(!g)return;const C=i.scores.map(x=>x.score),v=C.length>0?Math.round(C.reduce((x,A)=>x+A,0)/C.length):0,T=C.length>0?Math.max(...C):0,w=C.filter(x=>x>=70).length;g.innerHTML=`
      <h2 style="text-align: center; color: #8b4fbe; margin-bottom: 30px;">🎉 Session Complete!</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <div style="background: #f8f4fc; padding: 20px; border-radius: 8px; text-align: center;">
          <div style="font-size: 36px; font-weight: bold; color: #8b4fbe;">${i.scores.length}</div>
          <div style="color: #666;">Scenarios Completed</div>
        </div>
        <div style="background: #f8f4fc; padding: 20px; border-radius: 8px; text-align: center;">
          <div style="font-size: 36px; font-weight: bold; color: #8b4fbe;">${v}</div>
          <div style="color: #666;">Average Score</div>
        </div>
        <div style="background: #f8f4fc; padding: 20px; border-radius: 8px; text-align: center;">
          <div style="font-size: 36px; font-weight: bold; color: #8b4fbe;">${T}</div>
          <div style="color: #666;">Highest Score</div>
        </div>
        <div style="background: #f8f4fc; padding: 20px; border-radius: 8px; text-align: center;">
          <div style="font-size: 36px; font-weight: bold; color: #8b4fbe;">${w}/${i.scores.length}</div>
          <div style="color: #666;">Passed</div>
        </div>
      </div>
      <div style="text-align: center;">
        <button id="start-new-session-btn" style="padding: 15px 40px; background: #8b4fbe; color: white; border: none; border-radius: 5px; font-size: 16px; font-weight: 500; cursor: pointer;">Start New Session</button>
      </div>
    `;const I=document.getElementById("start-new-session-btn");I&&I.addEventListener("click",e)}function y(){const g=i.currentScenario;if(!(g!=null&&g.followUps)||g.followUps.length===0){alert("No hints available for this scenario.");return}const C=g.followUps[Math.floor(Math.random()*g.followUps.length)],v=document.getElementById("hint-display");v&&(v.innerHTML=`<strong>💡 Hint:</strong> ${C}`,v.style.display="block",i.hintsUsed++,setTimeout(()=>{v.style.display="none"},1e4))}function b(){document.querySelectorAll(".role-btn").forEach(C=>{C.addEventListener("click",async v=>{var I;const w=(I=v.target.closest("[data-role]"))==null?void 0:I.getAttribute("data-role");w&&(i.selectedRole=w,i.startTime=Date.now(),t("personality-selector"))})})}function E(){document.querySelectorAll(".personality-card").forEach(v=>{v.addEventListener("click",async T=>{var A,P;const w=T.target,I=(A=w.closest("[data-personality]"))==null?void 0:A.getAttribute("data-personality"),x=(P=w.closest("[data-difficulty]"))==null?void 0:P.getAttribute("data-difficulty");if(!(!I||!x)){i.selectedPersonality=I,i.difficulty=x,console.log(`✨ Selected personality: ${I} (difficulty: ${x})`);try{const _=window.getAgnesScenariosByRole(i.selectedRole);if(!_||_.length===0)throw new Error(`No scenarios found for role: ${i.selectedRole}`);i.scenarios=_,i.currentScenarioIndex=0,setTimeout(()=>{n(0),t("scenario-display");const q=document.getElementById("agnes-name");if(q){const K={supportive:"Agnes the Supportive Coach",realistic:"Agnes the Real Homeowner",skeptical:"Agnes the Skeptical Buyer",rushed:"Agnes the Rushed Decision-Maker","final-boss":"Agnes the Final Boss"};q.textContent=K[I]||"Agnes"}},300)}catch(_){console.error("Error loading scenarios:",_),alert(`Error: ${_.message}`)}}})});const C=document.getElementById("back-to-roles");C&&C.addEventListener("click",()=>{t("roleplay-setup"),i.selectedRole=null,i.selectedPersonality=null})}try{b(),E();const g=document.getElementById("submit-response");g&&g.addEventListener("click",c);const C=document.getElementById("next-scenario-btn");C&&C.addEventListener("click",f);const v=document.getElementById("retry-scenario-btn");v&&v.addEventListener("click",h);const T=document.getElementById("hint-btn");T&&T.addEventListener("click",y),e(),console.log("✅ Agnes Role-Play System initialized successfully")}catch(g){throw console.error("❌ Error initializing Agnes system:",g),g}}async function Hr(){const i=document.getElementById("quiz-area");if(i){i.innerHTML='<div id="loader">Generating your quiz...</div>';try{if(!L){i.innerHTML='<p style="color: red;">Quiz is unavailable: missing API key. Set GEMINI_API_KEY in .env.local and reload.</p>';return}const t=Object.values(M).join(" "),e=await L.models.generateContent({model:"gemini-2.5-flash",contents:`Based on this summary of the Roof-ER sales training, generate a 5-question multiple-choice quiz. Ensure the "answer" field exactly matches one of the strings in the "options" array. ${t}`,config:{responseMimeType:"application/json",responseSchema:{type:k.ARRAY,items:{type:k.OBJECT,properties:{question:{type:k.STRING},options:{type:k.ARRAY,items:{type:k.STRING}},answer:{type:k.STRING}},required:["question","options","answer"]}}}}),n=JSON.parse(e.text.trim());$r(n)}catch(t){console.error("Quiz generation failed:",t),i.innerHTML='<p style="color: red;">Sorry, there was an error generating the quiz. Please try again.</p>'}}}function $r(i){const t=document.getElementById("quiz-area");if(!t)return;t.innerHTML=i.map((o,a)=>`
    <div class="quiz-item" data-question-index="${a}">
      <p class="quiz-question">${a+1}. ${o.question}</p>
      <ul class="quiz-options">
        ${o.options.map(l=>`<li data-option="${l.replace(/"/g,"&quot;")}">${l}</li>`).join("")}
      </ul>
      <div id="quiz-feedback-${a}" class="quiz-feedback"></div>
    </div>
  `).join("")+'<button id="submitQuizButton">Submit Answers</button>',t.querySelectorAll(".quiz-options li").forEach(o=>{o.addEventListener("click",()=>{o.parentElement.querySelectorAll("li").forEach(l=>l.classList.remove("selected")),o.classList.add("selected")})});const n=document.getElementById("submitQuizButton");n==null||n.addEventListener("click",()=>{i.forEach((o,a)=>{const l=document.querySelector(`.quiz-item[data-question-index="${a}"] .quiz-options li.selected`),c=document.getElementById(`quiz-feedback-${a}`);l&&c&&(l.dataset.option===o.answer?(c.textContent="Correct!",c.className="quiz-feedback correct"):(c.textContent=`Incorrect. The correct answer is: ${o.answer}`,c.className="quiz-feedback incorrect"))}),n.disabled=!0})}function Vt(i){var t;if(z)switch(z.innerHTML=M[i]||"<div>Content not found.</div>",O.speaking&&(O.cancel(),$=null),i){case"quiz":(t=document.getElementById("generateQuizButton"))==null||t.addEventListener("click",Hr);break;case"sales-cycle":bt();break;case"objection-handling":wt();break;case"role-play":Gr();break;case"welcome":jr(),Or(),Jr();break;case"post-inspection-objections":Fr();break;case"general-knowledge":Kr();break;case"final-exam":Qr();break;case"handling-initial-pitch-objections":wt();break;case"sales-cycle-job-flow":bt();break;case"commitment":Yr();break}}function Wr(i){const t=i.target;if(t.tagName==="LI"&&t.dataset.module){const e=t.dataset.module;W==null||W.querySelectorAll("li").forEach(n=>n.classList.remove("active")),t.classList.add("active"),Vt(e)}}document.addEventListener("DOMContentLoaded",()=>{var i;W&&W.addEventListener("click",Wr),z==null||z.addEventListener("click",qr),Vt("welcome"),(i=document.querySelector('#sidebar li[data-module="welcome"]'))==null||i.classList.add("active")});const zr={oliver:{name:"Oliver Brown",title:"Owner & Founder",img:"/resources/images/oliver-theroofdocs.jpg",link:"https://www.theroofdocs.com/about/",summary:"Owner & Founder focused on integrity, quality, and simplicity with a transparent, customer‑first process."},reese:{name:"Reese Samala",title:"Director of Sales",img:"/resources/images/reese-theroofdocs.jpg",link:"https://www.theroofdocs.com/about/",summary:"Leads sales with a consultative, education‑forward approach that builds trust and results."},ford:{name:"Ford Barsi",title:"General Manager",img:"/resources/images/ford-theroofdocs.jpg",link:"https://www.theroofdocs.com/about/",summary:"Oversees operations and execution, aligning teams and process from inspection to completion."}};function Or(){var n;const i=document.getElementById("main-content");if(!i)return;let t=document.getElementById("bio-modal-overlay");t||(t=document.createElement("div"),t.id="bio-modal-overlay",t.className="modal-overlay",t.innerHTML=`
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="bioTitle">
        <div class="modal-header">
          <h3 id="bioTitle"></h3>
          <button class="modal-close" aria-label="Close">×</button>
        </div>
        <div class="modal-body">
          <img id="bioImg" alt="" />
          <div class="bio-text">
            <p id="bioSummary"></p>
            <p><a id="bioLink" href="#" target="_blank" rel="noopener">Read full bio</a></p>
          </div>
        </div>
      </div>`,document.body.appendChild(t));const e=()=>{t.classList.remove("show")};t.addEventListener("click",o=>{o.target===t&&e()}),(n=t.querySelector(".modal-close"))==null||n.addEventListener("click",e),document.addEventListener("keyup",o=>{o.key==="Escape"&&e()}),i.querySelectorAll(".bio-btn").forEach(o=>{o.addEventListener("click",()=>{const a=o.getAttribute("data-bio")||"",l=zr[a];if(!l)return;t.querySelector("#bioTitle").textContent=`${l.name} — ${l.title}`;const c=t.querySelector("#bioImg");c.src=l.img,c.alt=l.name,t.querySelector("#bioSummary").textContent=l.summary;const u=t.querySelector("#bioLink");u.href=l.link,t.classList.add("show")})})}function Yr(){const i=document.getElementById("main-content");if(!i||localStorage.getItem(Tt.commitmentSigned)==="true")return;const e=document.createElement("div");e.innerHTML=`
    <div class="commitment-gate">
      <h3>Digital Signature</h3>
      <p>You must acknowledge and sign before accessing the training.</p>
      <label>Full Name: <input id="sigName" type="text" placeholder="Your full name"/></label>
      <label><input id="sigAgree" type="checkbox"/> I agree to uphold Roof‑ER standards and ethics.</label>
      <button id="sigSubmit">Sign & Continue</button>
      <div id="sigMsg" class="sig-message"></div>
    </div>`,i.appendChild(e);const n=e.querySelector("#sigSubmit");n==null||n.addEventListener("click",()=>{var c,u,d;const o=(u=(c=e.querySelector("#sigName"))==null?void 0:c.value)==null?void 0:u.trim(),a=(d=e.querySelector("#sigAgree"))==null?void 0:d.checked,l=e.querySelector("#sigMsg");if(!o||!a){l&&(l.textContent="Please enter your name and agree to proceed.");return}localStorage.setItem(Tt.commitmentSigned,"true"),l&&(l.textContent="Signed. You may continue to other sections.")})}function Jr(){document.querySelectorAll(".bio-toggle-btn").forEach(t=>{t.addEventListener("click",function(){const e=this.getAttribute("data-bio"),n=document.getElementById(e);n&&(n.style.display==="none"||n.style.display===""?(n.style.display="block",this.textContent="Hide Bio"):(n.style.display="none",this.textContent="My Bio"))})})}function Kr(){const i=document.getElementById("startQuickQuiz2"),t=document.getElementById("quiz2-area");!i||!t||i.addEventListener("click",()=>{var e;t.innerHTML=`
      <div class="quiz-item">
        <p>1. Which component helps prevent water intrusion at eaves?</p>
        <label><input type="radio" name="q1" value="a"/> Ridge vent</label>
        <label><input type="radio" name="q1" value="b"/> Ice & Water Barrier</label>
        <label><input type="radio" name="q1" value="c"/> Hip shingles</label>
      </div>
      <div class="quiz-item">
        <p>2. Knock timing should be…</p>
        <label><input type="radio" name="q2" value="a"/> As late as possible</label>
        <label><input type="radio" name="q2" value="b"/> Respectful of local norms and daylight</label>
        <label><input type="radio" name="q2" value="c"/> Only during lunch</label>
      </div>
      <button id="quiz2Submit">Submit</button>
      <div id="quiz2Result"></div>
    `,(e=document.getElementById("quiz2Submit"))==null||e.addEventListener("click",()=>{var c,u;const n=(c=document.querySelector('input[name="q1"]:checked'))==null?void 0:c.value,o=(u=document.querySelector('input[name="q2"]:checked'))==null?void 0:u.value,a=n==="b"&&o==="b",l=document.getElementById("quiz2Result");l&&(l.textContent=a?"Pass":"Fail",l.className=a?"quiz-feedback correct":"quiz-feedback incorrect")})})}function Qr(){const i=document.getElementById("startFinalExam"),t=document.getElementById("exam-area");!i||!t||i.addEventListener("click",async()=>{if(!L){t.innerHTML='<p style="color:red">Final exam generation requires an API key. Set GEMINI_API_KEY in .env.local.</p>';return}t.innerHTML='<div id="loader">Preparing your 50‑question exam…</div>';try{const e=Object.values(M).join(" "),n=await L.models.generateContent({model:"gemini-2.5-flash",contents:"Create a final exam for Roof‑ER training with exactly: 35 multiple‑choice (options+answer), 10 fill‑in‑the‑blank (answer string), 5 short‑answer (keywords array for rubric). Return JSON matching the schema.",config:{responseMimeType:"application/json",responseSchema:{type:k.OBJECT,properties:{multipleChoice:{type:k.ARRAY,items:{type:k.OBJECT,properties:{question:{type:k.STRING},options:{type:k.ARRAY,items:{type:k.STRING}},answer:{type:k.STRING}},required:["question","options","answer"]}},fillBlank:{type:k.ARRAY,items:{type:k.OBJECT,properties:{question:{type:k.STRING},answer:{type:k.STRING}},required:["question","answer"]}},shortAnswer:{type:k.ARRAY,items:{type:k.OBJECT,properties:{prompt:{type:k.STRING},keywords:{type:k.ARRAY,items:{type:k.STRING}}},required:["prompt","keywords"]}}},required:["multipleChoice","fillBlank","shortAnswer"]}}}),o=JSON.parse(n.text.trim());Xr(t,o)}catch(e){console.error(e),t.innerHTML='<p style="color:red">Failed to generate exam. Please try again.</p>'}})}function Xr(i,t){i.innerHTML="";const e=[];Array.isArray(t.multipleChoice)&&e.push("multipleChoice"),Array.isArray(t.fillBlank)&&e.push("fillBlank"),Array.isArray(t.shortAnswer)&&e.push("shortAnswer"),e.forEach(o=>{const a=document.createElement("div");a.className="exam-section",a.innerHTML=`<h3>${o==="multipleChoice"?"Multiple Choice":o==="fillBlank"?"Fill in the Blank":"Short Answer"}</h3>`,t[o].forEach((c,u)=>{const d=document.createElement("div");d.className="exam-item",o==="multipleChoice"?d.innerHTML=`
          <p>${u+1}. ${c.question}</p>
          ${c.options.map((p,f)=>`<label><input type="radio" name="mcq-${u}" value="${p}"> ${p}</label>`).join("")}
        `:o==="fillBlank"?d.innerHTML=`<p>${u+1}. ${c.question}</p><input type="text" name="fib-${u}" />`:d.innerHTML=`<p>${u+1}. ${c.prompt}</p><textarea name="sa-${u}" rows="2"></textarea>`,a.appendChild(d)}),i.appendChild(a)});const n=document.createElement("button");n.textContent="Submit Exam",n.addEventListener("click",()=>Zr(i,t)),i.appendChild(n),i.appendChild(Object.assign(document.createElement("div"),{id:"examResult"}))}function Zr(i,t){let e=0,n=Array.isArray(t.multipleChoice)?t.multipleChoice.length:0;t.multipleChoice&&t.multipleChoice.forEach((y,b)=>{var g;const E=(g=i.querySelector(`input[name="mcq-${b}"]:checked`))==null?void 0:g.value;E&&E===y.answer&&e++});let o=0,a=Array.isArray(t.fillBlank)?t.fillBlank.length:0;t.fillBlank&&t.fillBlank.forEach((y,b)=>{var C,v;const E=(v=(C=i.querySelector(`input[name="fib-${b}"]`))==null?void 0:C.value)==null?void 0:v.trim().toLowerCase(),g=String(y.answer||"").trim().toLowerCase();E&&g&&E===g&&o++});let l=0,c=Array.isArray(t.shortAnswer)?t.shortAnswer.length:0;t.shortAnswer&&t.shortAnswer.forEach((y,b)=>{var v,T;const E=((T=(v=i.querySelector(`textarea[name="sa-${b}"]`))==null?void 0:v.value)==null?void 0:T.toLowerCase())||"",g=Array.isArray(y.keywords)?y.keywords.map(w=>String(w).toLowerCase()):[],C=g.filter(w=>E.includes(w)).length;l+=C/Math.max(g.length,1)});const u=n+a,d=e+o,p=u?Math.round(d/u*100):0,f=c?Math.round(l/c*100):0,h=Math.round(p*.8+f*.2),m=i.querySelector("#examResult");m&&(m.textContent=`MCQ: ${e}/${n}, FIB: ${o}/${a}, SA Score: ${f}%. Overall: ${h}%.`)}function jr(){const i=document.getElementById("startQuickQuiz1"),t=document.getElementById("quiz1-area");!i||!t||i.addEventListener("click",()=>{var e;t.innerHTML=`
      <div class="quiz-item">
        <p>1. Who is the Owner, Director of Sales, and General Manager of Roof-ER?</p>
        <label><input type="radio" name="qa1" value="a"/> Oliver Brown (Owner), Reese Samala (Director of Sales), Ford Barsi (General Manager)</label>
        <label><input type="radio" name="qa1" value="b"/> Ford Barsi (Owner), Oliver Brown (Director of Sales), Reese Samala (General Manager)</label>
        <label><input type="radio" name="qa1" value="c"/> Reese Samala (Owner), Ford Barsi (Director of Sales), Oliver Brown (General Manager)</label>
      </div>
      <div class="quiz-item">
        <p>2. What are Roof-ER's core values?</p>
        <label><input type="radio" name="qa2" value="a"/> Speed, Price, Volume</label>
        <label><input type="radio" name="qa2" value="b"/> Integrity, Quality, Simplicity</label>
        <label><input type="radio" name="qa2" value="c"/> Profit, Growth, Expansion</label>
      </div>
      <div class="quiz-item">
        <p>3. What year was Roof-ER founded?</p>
        <label><input type="radio" name="qa3" value="a"/> 2017</label>
        <label><input type="radio" name="qa3" value="b"/> 2018</label>
        <label><input type="radio" name="qa3" value="c"/> 2019</label>
      </div>
      <button id="quiz1Submit">Submit</button>
      <div id="quiz1Result"></div>
    `,(e=document.getElementById("quiz1Submit"))==null||e.addEventListener("click",()=>{var u,d,p;const n=(u=document.querySelector('input[name="qa1"]:checked'))==null?void 0:u.value,o=(d=document.querySelector('input[name="qa2"]:checked'))==null?void 0:d.value,a=(p=document.querySelector('input[name="qa3"]:checked'))==null?void 0:p.value,l=n==="a"&&o==="b"&&a==="c",c=document.getElementById("quiz1Result");if(c)if(l)c.textContent="✓ Perfect! You know the Roof-ER leadership team, core values, and founding year.",c.className="quiz-feedback correct";else{let f="✗ Not quite. ";n!=="a"&&(f+="Review the leadership team. "),o!=="b"&&(f+="Check our core values. "),a!=="c"&&(f+="Roof-ER was founded in 2019. "),c.textContent=f,c.className="quiz-feedback incorrect"}})})}
