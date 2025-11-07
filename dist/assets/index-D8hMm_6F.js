(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=e(o);fetch(o.href,a)}})();/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let qt,Vt;function Ut(){return{geminiUrl:qt,vertexUrl:Vt}}function Bt(i,t,e){var n,o,a;if(!(!((n=i.httpOptions)===null||n===void 0)&&n.baseUrl)){const l=Ut();return i.vertexai?(o=l.vertexUrl)!==null&&o!==void 0?o:t:(a=l.geminiUrl)!==null&&a!==void 0?a:e}return i.httpOptions.baseUrl}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class J{}function S(i,t){const e=/\{([^}]+)\}/g;return i.replace(e,(n,o)=>{if(Object.prototype.hasOwnProperty.call(t,o)){const a=t[o];return a!=null?String(a):""}else throw new Error(`Key '${o}' not found in valueMap.`)})}function r(i,t,e){for(let a=0;a<t.length-1;a++){const l=t[a];if(l.endsWith("[]")){const d=l.slice(0,-2);if(!(d in i))if(Array.isArray(e))i[d]=Array.from({length:e.length},()=>({}));else throw new Error(`Value must be a list given an array path ${l}`);if(Array.isArray(i[d])){const u=i[d];if(Array.isArray(e))for(let c=0;c<u.length;c++){const p=u[c];r(p,t.slice(a+1),e[c])}else for(const c of u)r(c,t.slice(a+1),e)}return}else if(l.endsWith("[0]")){const d=l.slice(0,-3);d in i||(i[d]=[{}]);const u=i[d];r(u[0],t.slice(a+1),e);return}(!i[l]||typeof i[l]!="object")&&(i[l]={}),i=i[l]}const n=t[t.length-1],o=i[n];if(o!==void 0){if(!e||typeof e=="object"&&Object.keys(e).length===0||e===o)return;if(typeof o=="object"&&typeof e=="object"&&o!==null&&e!==null)Object.assign(o,e);else throw new Error(`Cannot set value for an existing key. Key: ${n}`)}else i[n]=e}function s(i,t){try{if(t.length===1&&t[0]==="_self")return i;for(let e=0;e<t.length;e++){if(typeof i!="object"||i===null)return;const n=t[e];if(n.endsWith("[]")){const o=n.slice(0,-2);if(o in i){const a=i[o];return Array.isArray(a)?a.map(l=>s(l,t.slice(e+1))):void 0}else return}else i=i[n]}return i}catch(e){if(e instanceof TypeError)return;throw e}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function x(i,t){if(!t||typeof t!="string")throw new Error("model is required and must be a string");if(i.isVertexAI()){if(t.startsWith("publishers/")||t.startsWith("projects/")||t.startsWith("models/"))return t;if(t.indexOf("/")>=0){const e=t.split("/",2);return`publishers/${e[0]}/models/${e[1]}`}else return`publishers/google/models/${t}`}else return t.startsWith("models/")||t.startsWith("tunedModels/")?t:`models/${t}`}function Et(i,t){const e=x(i,t);return e?e.startsWith("publishers/")&&i.isVertexAI()?`projects/${i.getProject()}/locations/${i.getLocation()}/${e}`:e.startsWith("models/")&&i.isVertexAI()?`projects/${i.getProject()}/locations/${i.getLocation()}/publishers/google/${e}`:e:""}function St(i,t){return Array.isArray(t)?t.map(e=>ee(i,e)):[ee(i,t)]}function ee(i,t){if(typeof t=="object"&&t!==null)return t;throw new Error(`Could not parse input as Blob. Unsupported blob type: ${typeof t}`)}function Gt(i,t){const e=ee(i,t);if(e.mimeType&&e.mimeType.startsWith("image/"))return e;throw new Error(`Unsupported mime type: ${e.mimeType}`)}function Ht(i,t){const e=ee(i,t);if(e.mimeType&&e.mimeType.startsWith("audio/"))return e;throw new Error(`Unsupported mime type: ${e.mimeType}`)}function ye(i,t){if(t==null)throw new Error("PartUnion is required");if(typeof t=="object")return t;if(typeof t=="string")return{text:t};throw new Error(`Unsupported part type: ${typeof t}`)}function bt(i,t){if(t==null||Array.isArray(t)&&t.length===0)throw new Error("PartListUnion is required");return Array.isArray(t)?t.map(e=>ye(i,e)):[ye(i,t)]}function ae(i){return i!=null&&typeof i=="object"&&"parts"in i&&Array.isArray(i.parts)}function ve(i){return i!=null&&typeof i=="object"&&"functionCall"in i}function Ce(i){return i!=null&&typeof i=="object"&&"functionResponse"in i}function k(i,t){if(t==null)throw new Error("ContentUnion is required");return ae(t)?t:{role:"user",parts:bt(i,t)}}function It(i,t){if(!t)return[];if(i.isVertexAI()&&Array.isArray(t))return t.flatMap(e=>{const n=k(i,e);return n.parts&&n.parts.length>0&&n.parts[0].text!==void 0?[n.parts[0].text]:[]});if(i.isVertexAI()){const e=k(i,t);return e.parts&&e.parts.length>0&&e.parts[0].text!==void 0?[e.parts[0].text]:[]}return Array.isArray(t)?t.map(e=>k(i,e)):[k(i,t)]}function F(i,t){if(t==null||Array.isArray(t)&&t.length===0)throw new Error("contents are required");if(!Array.isArray(t)){if(ve(t)||Ce(t))throw new Error("To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them");return[k(i,t)]}const e=[],n=[],o=ae(t[0]);for(const a of t){const l=ae(a);if(l!=o)throw new Error("Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them");if(l)e.push(a);else{if(ve(a)||Ce(a))throw new Error("To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them");n.push(a)}}return o||e.push({role:"user",parts:bt(i,n)}),e}function xt(i,t){return t}function At(i,t){if(typeof t=="object")return t;if(typeof t=="string")return{voiceConfig:{prebuiltVoiceConfig:{voiceName:t}}};throw new Error(`Unsupported speechConfig type: ${typeof t}`)}function ie(i,t){return t}function oe(i,t){if(!Array.isArray(t))throw new Error("tool is required and must be an array of Tools");return t}function $t(i,t,e,n=1){const o=!t.startsWith(`${e}/`)&&t.split("/").length===n;return i.isVertexAI()?t.startsWith("projects/")?t:t.startsWith("locations/")?`projects/${i.getProject()}/${t}`:t.startsWith(`${e}/`)?`projects/${i.getProject()}/locations/${i.getLocation()}/${t}`:o?`projects/${i.getProject()}/locations/${i.getLocation()}/${e}/${t}`:t:o?`${e}/${t}`:t}function q(i,t){if(typeof t!="string")throw new Error("name must be a string");return $t(i,t,"cachedContents")}function _t(i,t){switch(t){case"STATE_UNSPECIFIED":return"JOB_STATE_UNSPECIFIED";case"CREATING":return"JOB_STATE_RUNNING";case"ACTIVE":return"JOB_STATE_SUCCEEDED";case"FAILED":return"JOB_STATE_FAILED";default:return t}}function V(i,t){if(typeof t!="string")throw new Error("fromImageBytes must be a string");return t}function Rt(i,t){if(typeof t!="string")throw new Error("fromName must be a string");return t.startsWith("files/")?t.split("files/")[1]:t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function zt(i,t){const e={};if(s(t,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const o=s(t,["codeExecutionResult"]);o!=null&&r(e,["codeExecutionResult"],o);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const d=s(t,["functionCall"]);d!=null&&r(e,["functionCall"],d);const u=s(t,["functionResponse"]);u!=null&&r(e,["functionResponse"],u);const c=s(t,["inlineData"]);c!=null&&r(e,["inlineData"],c);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function Te(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>zt(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function Wt(){return{}}function Ot(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["dynamicThreshold"]);return o!=null&&r(e,["dynamicThreshold"],o),e}function Yt(i,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],Ot(i,n)),e}function Jt(i,t){const e={};if(s(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");s(t,["googleSearch"])!=null&&r(e,["googleSearch"],Wt());const o=s(t,["googleSearchRetrieval"]);o!=null&&r(e,["googleSearchRetrieval"],Yt(i,o));const a=s(t,["codeExecution"]);a!=null&&r(e,["codeExecution"],a);const l=s(t,["functionDeclarations"]);return l!=null&&r(e,["functionDeclarations"],l),e}function Kt(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["allowedFunctionNames"]);return o!=null&&r(e,["allowedFunctionNames"],o),e}function Qt(i,t){const e={},n=s(t,["functionCallingConfig"]);return n!=null&&r(e,["functionCallingConfig"],Kt(i,n)),e}function Xt(i,t,e){const n={},o=s(t,["ttl"]);e!==void 0&&o!=null&&r(e,["ttl"],o);const a=s(t,["expireTime"]);e!==void 0&&a!=null&&r(e,["expireTime"],a);const l=s(t,["displayName"]);e!==void 0&&l!=null&&r(e,["displayName"],l);const d=s(t,["contents"]);if(e!==void 0&&d!=null){let f=F(i,d);Array.isArray(f)&&(f=f.map(g=>Te(i,g))),r(e,["contents"],f)}const u=s(t,["systemInstruction"]);e!==void 0&&u!=null&&r(e,["systemInstruction"],Te(i,k(i,u)));const c=s(t,["tools"]);if(e!==void 0&&c!=null){let f=c;Array.isArray(f)&&(f=f.map(g=>Jt(i,g))),r(e,["tools"],f)}const p=s(t,["toolConfig"]);return e!==void 0&&p!=null&&r(e,["toolConfig"],Qt(i,p)),n}function Zt(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["model"],Et(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],Xt(i,o,e)),e}function jt(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],q(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function en(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],q(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function tn(i,t,e){const n={},o=s(t,["ttl"]);e!==void 0&&o!=null&&r(e,["ttl"],o);const a=s(t,["expireTime"]);return e!==void 0&&a!=null&&r(e,["expireTime"],a),n}function nn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],q(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],tn(i,o,e)),e}function on(i,t,e){const n={},o=s(t,["pageSize"]);e!==void 0&&o!=null&&r(e,["_query","pageSize"],o);const a=s(t,["pageToken"]);return e!==void 0&&a!=null&&r(e,["_query","pageToken"],a),n}function sn(i,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],on(i,n,e)),e}function rn(i,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const o=s(t,["thought"]);o!=null&&r(e,["thought"],o);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const d=s(t,["fileData"]);d!=null&&r(e,["fileData"],d);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const c=s(t,["functionResponse"]);c!=null&&r(e,["functionResponse"],c);const p=s(t,["inlineData"]);p!=null&&r(e,["inlineData"],p);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function we(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>rn(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function an(){return{}}function ln(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["dynamicThreshold"]);return o!=null&&r(e,["dynamicThreshold"],o),e}function dn(i,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],ln(i,n)),e}function cn(i,t){const e={},n=s(t,["retrieval"]);n!=null&&r(e,["retrieval"],n),s(t,["googleSearch"])!=null&&r(e,["googleSearch"],an());const a=s(t,["googleSearchRetrieval"]);a!=null&&r(e,["googleSearchRetrieval"],dn(i,a));const l=s(t,["codeExecution"]);l!=null&&r(e,["codeExecution"],l);const d=s(t,["functionDeclarations"]);return d!=null&&r(e,["functionDeclarations"],d),e}function un(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["allowedFunctionNames"]);return o!=null&&r(e,["allowedFunctionNames"],o),e}function pn(i,t){const e={},n=s(t,["functionCallingConfig"]);return n!=null&&r(e,["functionCallingConfig"],un(i,n)),e}function fn(i,t,e){const n={},o=s(t,["ttl"]);e!==void 0&&o!=null&&r(e,["ttl"],o);const a=s(t,["expireTime"]);e!==void 0&&a!=null&&r(e,["expireTime"],a);const l=s(t,["displayName"]);e!==void 0&&l!=null&&r(e,["displayName"],l);const d=s(t,["contents"]);if(e!==void 0&&d!=null){let f=F(i,d);Array.isArray(f)&&(f=f.map(g=>we(i,g))),r(e,["contents"],f)}const u=s(t,["systemInstruction"]);e!==void 0&&u!=null&&r(e,["systemInstruction"],we(i,k(i,u)));const c=s(t,["tools"]);if(e!==void 0&&c!=null){let f=c;Array.isArray(f)&&(f=f.map(g=>cn(i,g))),r(e,["tools"],f)}const p=s(t,["toolConfig"]);return e!==void 0&&p!=null&&r(e,["toolConfig"],pn(i,p)),n}function hn(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["model"],Et(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],fn(i,o,e)),e}function gn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],q(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function mn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],q(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function yn(i,t,e){const n={},o=s(t,["ttl"]);e!==void 0&&o!=null&&r(e,["ttl"],o);const a=s(t,["expireTime"]);return e!==void 0&&a!=null&&r(e,["expireTime"],a),n}function vn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],q(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],yn(i,o,e)),e}function Cn(i,t,e){const n={},o=s(t,["pageSize"]);e!==void 0&&o!=null&&r(e,["_query","pageSize"],o);const a=s(t,["pageToken"]);return e!==void 0&&a!=null&&r(e,["_query","pageToken"],a),n}function Tn(i,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],Cn(i,n,e)),e}function Z(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["displayName"]);o!=null&&r(e,["displayName"],o);const a=s(t,["model"]);a!=null&&r(e,["model"],a);const l=s(t,["createTime"]);l!=null&&r(e,["createTime"],l);const d=s(t,["updateTime"]);d!=null&&r(e,["updateTime"],d);const u=s(t,["expireTime"]);u!=null&&r(e,["expireTime"],u);const c=s(t,["usageMetadata"]);return c!=null&&r(e,["usageMetadata"],c),e}function wn(){return{}}function En(i,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const o=s(t,["cachedContents"]);if(o!=null){let a=o;Array.isArray(a)&&(a=a.map(l=>Z(i,l))),r(e,["cachedContents"],a)}return e}function j(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["displayName"]);o!=null&&r(e,["displayName"],o);const a=s(t,["model"]);a!=null&&r(e,["model"],a);const l=s(t,["createTime"]);l!=null&&r(e,["createTime"],l);const d=s(t,["updateTime"]);d!=null&&r(e,["updateTime"],d);const u=s(t,["expireTime"]);u!=null&&r(e,["expireTime"],u);const c=s(t,["usageMetadata"]);return c!=null&&r(e,["usageMetadata"],c),e}function Sn(){return{}}function bn(i,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const o=s(t,["cachedContents"]);if(o!=null){let a=o;Array.isArray(a)&&(a=a.map(l=>j(i,l))),r(e,["cachedContents"],a)}return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var Y;(function(i){i.PAGED_ITEM_BATCH_JOBS="batchJobs",i.PAGED_ITEM_MODELS="models",i.PAGED_ITEM_TUNING_JOBS="tuningJobs",i.PAGED_ITEM_FILES="files",i.PAGED_ITEM_CACHED_CONTENTS="cachedContents"})(Y||(Y={}));class he{constructor(t,e,n,o){this.pageInternal=[],this.paramsInternal={},this.requestInternal=e,this.init(t,n,o)}init(t,e,n){var o,a;this.nameInternal=t,this.pageInternal=e[this.nameInternal]||[],this.idxInternal=0;let l={config:{}};n?typeof n=="object"?l=Object.assign({},n):l=n:l={config:{}},l.config&&(l.config.pageToken=e.nextPageToken),this.paramsInternal=l,this.pageInternalSize=(a=(o=l.config)===null||o===void 0?void 0:o.pageSize)!==null&&a!==void 0?a:this.pageInternal.length}initNextPage(t){this.init(this.nameInternal,t,this.paramsInternal)}get page(){return this.pageInternal}get name(){return this.nameInternal}get pageSize(){return this.pageInternalSize}get params(){return this.paramsInternal}get pageLength(){return this.pageInternal.length}getItem(t){return this.pageInternal[t]}[Symbol.asyncIterator](){return{next:async()=>{if(this.idxInternal>=this.pageLength)if(this.hasNextPage())await this.nextPage();else return{value:void 0,done:!0};const t=this.getItem(this.idxInternal);return this.idxInternal+=1,{value:t,done:!1}},return:async()=>({value:void 0,done:!0})}}async nextPage(){if(!this.hasNextPage())throw new Error("No more pages to fetch.");const t=await this.requestInternal(this.params);return this.initNextPage(t),this.page}hasNextPage(){var t;return((t=this.params.config)===null||t===void 0?void 0:t.pageToken)!==void 0}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var Ee;(function(i){i.OUTCOME_UNSPECIFIED="OUTCOME_UNSPECIFIED",i.OUTCOME_OK="OUTCOME_OK",i.OUTCOME_FAILED="OUTCOME_FAILED",i.OUTCOME_DEADLINE_EXCEEDED="OUTCOME_DEADLINE_EXCEEDED"})(Ee||(Ee={}));var Se;(function(i){i.LANGUAGE_UNSPECIFIED="LANGUAGE_UNSPECIFIED",i.PYTHON="PYTHON"})(Se||(Se={}));var be;(function(i){i.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",i.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",i.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",i.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",i.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",i.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(be||(be={}));var Ie;(function(i){i.HARM_BLOCK_METHOD_UNSPECIFIED="HARM_BLOCK_METHOD_UNSPECIFIED",i.SEVERITY="SEVERITY",i.PROBABILITY="PROBABILITY"})(Ie||(Ie={}));var xe;(function(i){i.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",i.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",i.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",i.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",i.BLOCK_NONE="BLOCK_NONE",i.OFF="OFF"})(xe||(xe={}));var Ae;(function(i){i.MODE_UNSPECIFIED="MODE_UNSPECIFIED",i.MODE_DYNAMIC="MODE_DYNAMIC"})(Ae||(Ae={}));var I;(function(i){i.TYPE_UNSPECIFIED="TYPE_UNSPECIFIED",i.STRING="STRING",i.NUMBER="NUMBER",i.INTEGER="INTEGER",i.BOOLEAN="BOOLEAN",i.ARRAY="ARRAY",i.OBJECT="OBJECT"})(I||(I={}));var _e;(function(i){i.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",i.STOP="STOP",i.MAX_TOKENS="MAX_TOKENS",i.SAFETY="SAFETY",i.RECITATION="RECITATION",i.LANGUAGE="LANGUAGE",i.OTHER="OTHER",i.BLOCKLIST="BLOCKLIST",i.PROHIBITED_CONTENT="PROHIBITED_CONTENT",i.SPII="SPII",i.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",i.IMAGE_SAFETY="IMAGE_SAFETY"})(_e||(_e={}));var Re;(function(i){i.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",i.NEGLIGIBLE="NEGLIGIBLE",i.LOW="LOW",i.MEDIUM="MEDIUM",i.HIGH="HIGH"})(Re||(Re={}));var ke;(function(i){i.HARM_SEVERITY_UNSPECIFIED="HARM_SEVERITY_UNSPECIFIED",i.HARM_SEVERITY_NEGLIGIBLE="HARM_SEVERITY_NEGLIGIBLE",i.HARM_SEVERITY_LOW="HARM_SEVERITY_LOW",i.HARM_SEVERITY_MEDIUM="HARM_SEVERITY_MEDIUM",i.HARM_SEVERITY_HIGH="HARM_SEVERITY_HIGH"})(ke||(ke={}));var Me;(function(i){i.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",i.SAFETY="SAFETY",i.OTHER="OTHER",i.BLOCKLIST="BLOCKLIST",i.PROHIBITED_CONTENT="PROHIBITED_CONTENT"})(Me||(Me={}));var Pe;(function(i){i.TRAFFIC_TYPE_UNSPECIFIED="TRAFFIC_TYPE_UNSPECIFIED",i.ON_DEMAND="ON_DEMAND",i.PROVISIONED_THROUGHPUT="PROVISIONED_THROUGHPUT"})(Pe||(Pe={}));var te;(function(i){i.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",i.TEXT="TEXT",i.IMAGE="IMAGE",i.AUDIO="AUDIO"})(te||(te={}));var De;(function(i){i.MEDIA_RESOLUTION_UNSPECIFIED="MEDIA_RESOLUTION_UNSPECIFIED",i.MEDIA_RESOLUTION_LOW="MEDIA_RESOLUTION_LOW",i.MEDIA_RESOLUTION_MEDIUM="MEDIA_RESOLUTION_MEDIUM",i.MEDIA_RESOLUTION_HIGH="MEDIA_RESOLUTION_HIGH"})(De||(De={}));var le;(function(i){i.JOB_STATE_UNSPECIFIED="JOB_STATE_UNSPECIFIED",i.JOB_STATE_QUEUED="JOB_STATE_QUEUED",i.JOB_STATE_PENDING="JOB_STATE_PENDING",i.JOB_STATE_RUNNING="JOB_STATE_RUNNING",i.JOB_STATE_SUCCEEDED="JOB_STATE_SUCCEEDED",i.JOB_STATE_FAILED="JOB_STATE_FAILED",i.JOB_STATE_CANCELLING="JOB_STATE_CANCELLING",i.JOB_STATE_CANCELLED="JOB_STATE_CANCELLED",i.JOB_STATE_PAUSED="JOB_STATE_PAUSED",i.JOB_STATE_EXPIRED="JOB_STATE_EXPIRED",i.JOB_STATE_UPDATING="JOB_STATE_UPDATING",i.JOB_STATE_PARTIALLY_SUCCEEDED="JOB_STATE_PARTIALLY_SUCCEEDED"})(le||(le={}));var Ne;(function(i){i.ADAPTER_SIZE_UNSPECIFIED="ADAPTER_SIZE_UNSPECIFIED",i.ADAPTER_SIZE_ONE="ADAPTER_SIZE_ONE",i.ADAPTER_SIZE_TWO="ADAPTER_SIZE_TWO",i.ADAPTER_SIZE_FOUR="ADAPTER_SIZE_FOUR",i.ADAPTER_SIZE_EIGHT="ADAPTER_SIZE_EIGHT",i.ADAPTER_SIZE_SIXTEEN="ADAPTER_SIZE_SIXTEEN",i.ADAPTER_SIZE_THIRTY_TWO="ADAPTER_SIZE_THIRTY_TWO"})(Ne||(Ne={}));var Le;(function(i){i.FEATURE_SELECTION_PREFERENCE_UNSPECIFIED="FEATURE_SELECTION_PREFERENCE_UNSPECIFIED",i.PRIORITIZE_QUALITY="PRIORITIZE_QUALITY",i.BALANCED="BALANCED",i.PRIORITIZE_COST="PRIORITIZE_COST"})(Le||(Le={}));var Fe;(function(i){i.MODE_UNSPECIFIED="MODE_UNSPECIFIED",i.MODE_DYNAMIC="MODE_DYNAMIC"})(Fe||(Fe={}));var qe;(function(i){i.MODE_UNSPECIFIED="MODE_UNSPECIFIED",i.AUTO="AUTO",i.ANY="ANY",i.NONE="NONE"})(qe||(qe={}));var Ve;(function(i){i.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",i.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",i.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",i.BLOCK_NONE="BLOCK_NONE"})(Ve||(Ve={}));var Ue;(function(i){i.DONT_ALLOW="DONT_ALLOW",i.ALLOW_ADULT="ALLOW_ADULT",i.ALLOW_ALL="ALLOW_ALL"})(Ue||(Ue={}));var Be;(function(i){i.auto="auto",i.en="en",i.ja="ja",i.ko="ko",i.hi="hi"})(Be||(Be={}));var Ge;(function(i){i.STATE_UNSPECIFIED="STATE_UNSPECIFIED",i.PROCESSING="PROCESSING",i.ACTIVE="ACTIVE",i.FAILED="FAILED"})(Ge||(Ge={}));var He;(function(i){i.SOURCE_UNSPECIFIED="SOURCE_UNSPECIFIED",i.UPLOADED="UPLOADED",i.GENERATED="GENERATED"})(He||(He={}));var $e;(function(i){i.MASK_MODE_DEFAULT="MASK_MODE_DEFAULT",i.MASK_MODE_USER_PROVIDED="MASK_MODE_USER_PROVIDED",i.MASK_MODE_BACKGROUND="MASK_MODE_BACKGROUND",i.MASK_MODE_FOREGROUND="MASK_MODE_FOREGROUND",i.MASK_MODE_SEMANTIC="MASK_MODE_SEMANTIC"})($e||($e={}));var ze;(function(i){i.CONTROL_TYPE_DEFAULT="CONTROL_TYPE_DEFAULT",i.CONTROL_TYPE_CANNY="CONTROL_TYPE_CANNY",i.CONTROL_TYPE_SCRIBBLE="CONTROL_TYPE_SCRIBBLE",i.CONTROL_TYPE_FACE_MESH="CONTROL_TYPE_FACE_MESH"})(ze||(ze={}));var We;(function(i){i.SUBJECT_TYPE_DEFAULT="SUBJECT_TYPE_DEFAULT",i.SUBJECT_TYPE_PERSON="SUBJECT_TYPE_PERSON",i.SUBJECT_TYPE_ANIMAL="SUBJECT_TYPE_ANIMAL",i.SUBJECT_TYPE_PRODUCT="SUBJECT_TYPE_PRODUCT"})(We||(We={}));var Oe;(function(i){i.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",i.TEXT="TEXT",i.IMAGE="IMAGE",i.VIDEO="VIDEO",i.AUDIO="AUDIO",i.DOCUMENT="DOCUMENT"})(Oe||(Oe={}));var Ye;(function(i){i.START_SENSITIVITY_UNSPECIFIED="START_SENSITIVITY_UNSPECIFIED",i.START_SENSITIVITY_HIGH="START_SENSITIVITY_HIGH",i.START_SENSITIVITY_LOW="START_SENSITIVITY_LOW"})(Ye||(Ye={}));var Je;(function(i){i.END_SENSITIVITY_UNSPECIFIED="END_SENSITIVITY_UNSPECIFIED",i.END_SENSITIVITY_HIGH="END_SENSITIVITY_HIGH",i.END_SENSITIVITY_LOW="END_SENSITIVITY_LOW"})(Je||(Je={}));var Ke;(function(i){i.ACTIVITY_HANDLING_UNSPECIFIED="ACTIVITY_HANDLING_UNSPECIFIED",i.START_OF_ACTIVITY_INTERRUPTS="START_OF_ACTIVITY_INTERRUPTS",i.NO_INTERRUPTION="NO_INTERRUPTION"})(Ke||(Ke={}));var Qe;(function(i){i.TURN_COVERAGE_UNSPECIFIED="TURN_COVERAGE_UNSPECIFIED",i.TURN_INCLUDES_ONLY_ACTIVITY="TURN_INCLUDES_ONLY_ACTIVITY",i.TURN_INCLUDES_ALL_INPUT="TURN_INCLUDES_ALL_INPUT"})(Qe||(Qe={}));class K{get text(){var t,e,n,o,a,l,d,u;if(((o=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||o===void 0?void 0:o.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning text from the first one.");let c="",p=!1;const f=[];for(const g of(u=(d=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||d===void 0?void 0:d.parts)!==null&&u!==void 0?u:[]){for(const[m,h]of Object.entries(g))m!=="text"&&m!=="thought"&&(h!==null||h!==void 0)&&f.push(m);if(typeof g.text=="string"){if(typeof g.thought=="boolean"&&g.thought)continue;p=!0,c+=g.text}}return f.length>0&&console.warn(`there are non-text parts ${f} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),p?c:void 0}get data(){var t,e,n,o,a,l,d,u;if(((o=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||o===void 0?void 0:o.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning data from the first one.");let c="";const p=[];for(const f of(u=(d=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||d===void 0?void 0:d.parts)!==null&&u!==void 0?u:[]){for(const[g,m]of Object.entries(f))g!=="inlineData"&&(m!==null||m!==void 0)&&p.push(g);f.inlineData&&typeof f.inlineData.data=="string"&&(c+=atob(f.inlineData.data))}return p.length>0&&console.warn(`there are non-data parts ${p} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`),c.length>0?btoa(c):void 0}get functionCalls(){var t,e,n,o,a,l,d,u;if(((o=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||o===void 0?void 0:o.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning function calls from the first one.");const c=(u=(d=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||d===void 0?void 0:d.parts)===null||u===void 0?void 0:u.filter(p=>p.functionCall).map(p=>p.functionCall).filter(p=>p!==void 0);if((c==null?void 0:c.length)!==0)return c}get executableCode(){var t,e,n,o,a,l,d,u,c;if(((o=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||o===void 0?void 0:o.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning executable code from the first one.");const p=(u=(d=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||d===void 0?void 0:d.parts)===null||u===void 0?void 0:u.filter(f=>f.executableCode).map(f=>f.executableCode).filter(f=>f!==void 0);if((p==null?void 0:p.length)!==0)return(c=p==null?void 0:p[0])===null||c===void 0?void 0:c.code}get codeExecutionResult(){var t,e,n,o,a,l,d,u,c;if(((o=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||o===void 0?void 0:o.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning code execution result from the first one.");const p=(u=(d=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||d===void 0?void 0:d.parts)===null||u===void 0?void 0:u.filter(f=>f.codeExecutionResult).map(f=>f.codeExecutionResult).filter(f=>f!==void 0);if((p==null?void 0:p.length)!==0)return(c=p==null?void 0:p[0])===null||c===void 0?void 0:c.output}}class Xe{}class Ze{}class je{}class et{}class In{}class tt{}class nt{}class it{}class xn{}class de{constructor(t){const e={};for(const n of t.headers.entries())e[n[0]]=n[1];this.headers=e,this.responseInternal=t}json(){return this.responseInternal.json()}}class An{}class _n{}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Rn extends J{constructor(t){super(),this.apiClient=t,this.list=async(e={})=>new he(Y.PAGED_ITEM_CACHED_CONTENTS,n=>this.listInternal(n),await this.listInternal(e),e)}async create(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=hn(this.apiClient,t);return d=S("cachedContents",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>j(this.apiClient,p))}else{const c=Zt(this.apiClient,t);return d=S("cachedContents",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>Z(this.apiClient,p))}}async get(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=gn(this.apiClient,t);return d=S("{name}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>j(this.apiClient,p))}else{const c=jt(this.apiClient,t);return d=S("{name}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>Z(this.apiClient,p))}}async delete(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=mn(this.apiClient,t);return d=S("{name}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"DELETE",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(()=>{const p=Sn(),f=new nt;return Object.assign(f,p),f})}else{const c=en(this.apiClient,t);return d=S("{name}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"DELETE",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(()=>{const p=wn(),f=new nt;return Object.assign(f,p),f})}}async update(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=vn(this.apiClient,t);return d=S("{name}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"PATCH",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>j(this.apiClient,p))}else{const c=nn(this.apiClient,t);return d=S("{name}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"PATCH",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>Z(this.apiClient,p))}}async listInternal(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=Tn(this.apiClient,t);return d=S("cachedContents",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=bn(this.apiClient,p),g=new it;return Object.assign(g,f),g})}else{const c=sn(this.apiClient,t);return d=S("cachedContents",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>{const f=En(this.apiClient,p),g=new it;return Object.assign(g,f),g})}}}function ot(i){var t=typeof Symbol=="function"&&Symbol.iterator,e=t&&i[t],n=0;if(e)return e.call(i);if(i&&typeof i.length=="number")return{next:function(){return i&&n>=i.length&&(i=void 0),{value:i&&i[n++],done:!i}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function R(i){return this instanceof R?(this.v=i,this):new R(i)}function ne(i,t,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=e.apply(i,t||[]),o,a=[];return o=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),d("next"),d("throw"),d("return",l),o[Symbol.asyncIterator]=function(){return this},o;function l(m){return function(h){return Promise.resolve(h).then(m,f)}}function d(m,h){n[m]&&(o[m]=function(y){return new Promise(function(v,C){a.push([m,y,v,C])>1||u(m,y)})},h&&(o[m]=h(o[m])))}function u(m,h){try{c(n[m](h))}catch(y){g(a[0][3],y)}}function c(m){m.value instanceof R?Promise.resolve(m.value.v).then(p,f):g(a[0][2],m)}function p(m){u("next",m)}function f(m){u("throw",m)}function g(m,h){m(h),a.shift(),a.length&&u(a[0][0],a[0][1])}}function ce(i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=i[Symbol.asyncIterator],e;return t?t.call(i):(i=typeof ot=="function"?ot(i):i[Symbol.iterator](),e={},n("next"),n("throw"),n("return"),e[Symbol.asyncIterator]=function(){return this},e);function n(a){e[a]=i[a]&&function(l){return new Promise(function(d,u){l=i[a](l),o(d,u,l.done,l.value)})}}function o(a,l,d,u){Promise.resolve(u).then(function(c){a({value:c,done:d})},l)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function kn(i){var t;if(i.candidates==null||i.candidates.length===0)return!1;const e=(t=i.candidates[0])===null||t===void 0?void 0:t.content;return e===void 0?!1:kt(e)}function kt(i){if(i.parts===void 0||i.parts.length===0)return!1;for(const t of i.parts)if(t===void 0||Object.keys(t).length===0||t.text!==void 0&&t.text==="")return!1;return!0}function Mn(i){if(i.length!==0){if(i[0].role!=="user")throw new Error("History must start with a user turn.");for(const t of i)if(t.role!=="user"&&t.role!=="model")throw new Error(`Role must be user or model, but got ${t.role}.`)}}function Pn(i){if(i===void 0||i.length===0)return[];const t=[],e=i.length;let n=0,o=i[0];for(;n<e;)if(i[n].role==="user")o=i[n],n++;else{const a=[];let l=!0;for(;n<e&&i[n].role==="model";)a.push(i[n]),l&&!kt(i[n])&&(l=!1),n++;l&&(t.push(o),t.push(...a))}return t}class Dn{constructor(t,e){this.modelsModule=t,this.apiClient=e}create(t){return new Nn(this.apiClient,this.modelsModule,t.model,t.config,t.history)}}class Nn{constructor(t,e,n,o={},a=[]){this.apiClient=t,this.modelsModule=e,this.model=n,this.config=o,this.history=a,this.sendPromise=Promise.resolve(),Mn(a)}async sendMessage(t){var e;await this.sendPromise;const n=k(this.apiClient,t.message),o=this.modelsModule.generateContent({model:this.model,contents:this.getHistory(!0).concat(n),config:(e=t.config)!==null&&e!==void 0?e:this.config});return this.sendPromise=(async()=>{var a,l;const u=(l=(a=(await o).candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content,c=u?[u]:[];this.recordHistory(n,c)})(),await this.sendPromise,o}async sendMessageStream(t){var e;await this.sendPromise;const n=k(this.apiClient,t.message),o=this.modelsModule.generateContentStream({model:this.model,contents:this.getHistory(!0).concat(n),config:(e=t.config)!==null&&e!==void 0?e:this.config});this.sendPromise=o.then(()=>{}).catch(()=>{});const a=await o;return this.processStreamResponse(a,n)}getHistory(t=!1){return t?Pn(this.history):this.history}processStreamResponse(t,e){var n,o;return ne(this,arguments,function*(){var l,d,u,c;const p=[];try{for(var f=!0,g=ce(t),m;m=yield R(g.next()),l=m.done,!l;f=!0){c=m.value,f=!1;const h=c;if(kn(h)){const y=(o=(n=h.candidates)===null||n===void 0?void 0:n[0])===null||o===void 0?void 0:o.content;y!==void 0&&p.push(y)}yield yield R(h)}}catch(h){d={error:h}}finally{try{!f&&!l&&(u=g.return)&&(yield R(u.call(g)))}finally{if(d)throw d.error}}this.recordHistory(e,p)})}recordHistory(t,e){let n=[];e.length>0&&e.every(o=>o.role==="model")?n=e:n.push({role:"model",parts:[]}),this.history.push(t),this.history.push(...n)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Ln(i,t,e){const n={},o=s(t,["pageSize"]);e!==void 0&&o!=null&&r(e,["_query","pageSize"],o);const a=s(t,["pageToken"]);return e!==void 0&&a!=null&&r(e,["_query","pageToken"],a),n}function Fn(i,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],Ln(i,n,e)),e}function qn(i,t){const e={},n=s(t,["details"]);n!=null&&r(e,["details"],n);const o=s(t,["message"]);o!=null&&r(e,["message"],o);const a=s(t,["code"]);return a!=null&&r(e,["code"],a),e}function Vn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["displayName"]);o!=null&&r(e,["displayName"],o);const a=s(t,["mimeType"]);a!=null&&r(e,["mimeType"],a);const l=s(t,["sizeBytes"]);l!=null&&r(e,["sizeBytes"],l);const d=s(t,["createTime"]);d!=null&&r(e,["createTime"],d);const u=s(t,["expirationTime"]);u!=null&&r(e,["expirationTime"],u);const c=s(t,["updateTime"]);c!=null&&r(e,["updateTime"],c);const p=s(t,["sha256Hash"]);p!=null&&r(e,["sha256Hash"],p);const f=s(t,["uri"]);f!=null&&r(e,["uri"],f);const g=s(t,["downloadUri"]);g!=null&&r(e,["downloadUri"],g);const m=s(t,["state"]);m!=null&&r(e,["state"],m);const h=s(t,["source"]);h!=null&&r(e,["source"],h);const y=s(t,["videoMetadata"]);y!=null&&r(e,["videoMetadata"],y);const v=s(t,["error"]);return v!=null&&r(e,["error"],qn(i,v)),e}function Un(i,t){const e={},n=s(t,["file"]);n!=null&&r(e,["file"],Vn(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function Bn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","file"],Rt(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function Gn(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","file"],Rt(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function Hn(i,t){const e={},n=s(t,["details"]);n!=null&&r(e,["details"],n);const o=s(t,["message"]);o!=null&&r(e,["message"],o);const a=s(t,["code"]);return a!=null&&r(e,["code"],a),e}function ue(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["displayName"]);o!=null&&r(e,["displayName"],o);const a=s(t,["mimeType"]);a!=null&&r(e,["mimeType"],a);const l=s(t,["sizeBytes"]);l!=null&&r(e,["sizeBytes"],l);const d=s(t,["createTime"]);d!=null&&r(e,["createTime"],d);const u=s(t,["expirationTime"]);u!=null&&r(e,["expirationTime"],u);const c=s(t,["updateTime"]);c!=null&&r(e,["updateTime"],c);const p=s(t,["sha256Hash"]);p!=null&&r(e,["sha256Hash"],p);const f=s(t,["uri"]);f!=null&&r(e,["uri"],f);const g=s(t,["downloadUri"]);g!=null&&r(e,["downloadUri"],g);const m=s(t,["state"]);m!=null&&r(e,["state"],m);const h=s(t,["source"]);h!=null&&r(e,["source"],h);const y=s(t,["videoMetadata"]);y!=null&&r(e,["videoMetadata"],y);const v=s(t,["error"]);return v!=null&&r(e,["error"],Hn(i,v)),e}function $n(i,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const o=s(t,["files"]);if(o!=null){let a=o;Array.isArray(a)&&(a=a.map(l=>ue(i,l))),r(e,["files"],a)}return e}function zn(){return{}}function Wn(){return{}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class On extends J{constructor(t){super(),this.apiClient=t,this.list=async(e={})=>new he(Y.PAGED_ITEM_FILES,n=>this.listInternal(n),await this.listInternal(e),e)}async upload(t){if(this.apiClient.isVertexAI())throw new Error("Vertex AI does not support uploading files. You can share files through a GCS bucket.");return this.apiClient.uploadFile(t.file,t.config).then(e=>ue(this.apiClient,e))}async listInternal(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const d=Fn(this.apiClient,t);return a=S("files",d._url),l=d._query,delete d.config,delete d._url,delete d._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(u=>{const c=$n(this.apiClient,u),p=new xn;return Object.assign(p,c),p})}}async createInternal(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const d=Un(this.apiClient,t);return a=S("upload/v1beta/files",d._url),l=d._query,delete d.config,delete d._url,delete d._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(()=>{const u=zn(),c=new An;return Object.assign(c,u),c})}}async get(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const d=Bn(this.apiClient,t);return a=S("files/{file}",d._url),l=d._query,delete d.config,delete d._url,delete d._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(u=>ue(this.apiClient,u))}}async delete(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const d=Gn(this.apiClient,t);return a=S("files/{file}",d._url),l=d._query,delete d.config,delete d._url,delete d._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(()=>{const u=Wn(),c=new _n;return Object.assign(c,u),c})}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Yn(i,t){const e={};if(s(t,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const o=s(t,["codeExecutionResult"]);o!=null&&r(e,["codeExecutionResult"],o);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const d=s(t,["functionCall"]);d!=null&&r(e,["functionCall"],d);const u=s(t,["functionResponse"]);u!=null&&r(e,["functionResponse"],u);const c=s(t,["inlineData"]);c!=null&&r(e,["inlineData"],c);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function Jn(i,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const o=s(t,["thought"]);o!=null&&r(e,["thought"],o);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const d=s(t,["fileData"]);d!=null&&r(e,["fileData"],d);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const c=s(t,["functionResponse"]);c!=null&&r(e,["functionResponse"],c);const p=s(t,["inlineData"]);p!=null&&r(e,["inlineData"],p);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function Kn(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Yn(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function Qn(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Jn(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function Xn(){return{}}function Zn(){return{}}function jn(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["dynamicThreshold"]);return o!=null&&r(e,["dynamicThreshold"],o),e}function ei(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["dynamicThreshold"]);return o!=null&&r(e,["dynamicThreshold"],o),e}function ti(i,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],jn(i,n)),e}function ni(i,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],ei(i,n)),e}function ii(i,t){const e={};if(s(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");s(t,["googleSearch"])!=null&&r(e,["googleSearch"],Xn());const o=s(t,["googleSearchRetrieval"]);o!=null&&r(e,["googleSearchRetrieval"],ti(i,o));const a=s(t,["codeExecution"]);a!=null&&r(e,["codeExecution"],a);const l=s(t,["functionDeclarations"]);return l!=null&&r(e,["functionDeclarations"],l),e}function oi(i,t){const e={},n=s(t,["retrieval"]);n!=null&&r(e,["retrieval"],n),s(t,["googleSearch"])!=null&&r(e,["googleSearch"],Zn());const a=s(t,["googleSearchRetrieval"]);a!=null&&r(e,["googleSearchRetrieval"],ni(i,a));const l=s(t,["codeExecution"]);l!=null&&r(e,["codeExecution"],l);const d=s(t,["functionDeclarations"]);return d!=null&&r(e,["functionDeclarations"],d),e}function si(i,t){const e={},n=s(t,["handle"]);if(n!=null&&r(e,["handle"],n),s(t,["transparent"])!==void 0)throw new Error("transparent parameter is not supported in Gemini API.");return e}function ri(i,t){const e={},n=s(t,["handle"]);n!=null&&r(e,["handle"],n);const o=s(t,["transparent"]);return o!=null&&r(e,["transparent"],o),e}function ai(){return{}}function st(){return{}}function li(i,t){const e={},n=s(t,["disabled"]);n!=null&&r(e,["disabled"],n);const o=s(t,["startOfSpeechSensitivity"]);o!=null&&r(e,["startOfSpeechSensitivity"],o);const a=s(t,["endOfSpeechSensitivity"]);a!=null&&r(e,["endOfSpeechSensitivity"],a);const l=s(t,["prefixPaddingMs"]);l!=null&&r(e,["prefixPaddingMs"],l);const d=s(t,["silenceDurationMs"]);return d!=null&&r(e,["silenceDurationMs"],d),e}function di(i,t){const e={},n=s(t,["disabled"]);n!=null&&r(e,["disabled"],n);const o=s(t,["startOfSpeechSensitivity"]);o!=null&&r(e,["startOfSpeechSensitivity"],o);const a=s(t,["endOfSpeechSensitivity"]);a!=null&&r(e,["endOfSpeechSensitivity"],a);const l=s(t,["prefixPaddingMs"]);l!=null&&r(e,["prefixPaddingMs"],l);const d=s(t,["silenceDurationMs"]);return d!=null&&r(e,["silenceDurationMs"],d),e}function ci(i,t){const e={},n=s(t,["automaticActivityDetection"]);n!=null&&r(e,["automaticActivityDetection"],li(i,n));const o=s(t,["activityHandling"]);o!=null&&r(e,["activityHandling"],o);const a=s(t,["turnCoverage"]);return a!=null&&r(e,["turnCoverage"],a),e}function ui(i,t){const e={},n=s(t,["automaticActivityDetection"]);n!=null&&r(e,["automaticActivityDetection"],di(i,n));const o=s(t,["activityHandling"]);o!=null&&r(e,["activityHandling"],o);const a=s(t,["turnCoverage"]);return a!=null&&r(e,["turnCoverage"],a),e}function pi(i,t){const e={},n=s(t,["targetTokens"]);return n!=null&&r(e,["targetTokens"],n),e}function fi(i,t){const e={},n=s(t,["targetTokens"]);return n!=null&&r(e,["targetTokens"],n),e}function hi(i,t){const e={},n=s(t,["triggerTokens"]);n!=null&&r(e,["triggerTokens"],n);const o=s(t,["slidingWindow"]);return o!=null&&r(e,["slidingWindow"],pi(i,o)),e}function gi(i,t){const e={},n=s(t,["triggerTokens"]);n!=null&&r(e,["triggerTokens"],n);const o=s(t,["slidingWindow"]);return o!=null&&r(e,["slidingWindow"],fi(i,o)),e}function mi(i,t,e){const n={},o=s(t,["generationConfig"]);e!==void 0&&o!=null&&r(e,["setup","generationConfig"],o);const a=s(t,["responseModalities"]);e!==void 0&&a!=null&&r(e,["setup","generationConfig","responseModalities"],a);const l=s(t,["temperature"]);e!==void 0&&l!=null&&r(e,["setup","generationConfig","temperature"],l);const d=s(t,["topP"]);e!==void 0&&d!=null&&r(e,["setup","generationConfig","topP"],d);const u=s(t,["topK"]);e!==void 0&&u!=null&&r(e,["setup","generationConfig","topK"],u);const c=s(t,["maxOutputTokens"]);e!==void 0&&c!=null&&r(e,["setup","generationConfig","maxOutputTokens"],c);const p=s(t,["mediaResolution"]);e!==void 0&&p!=null&&r(e,["setup","generationConfig","mediaResolution"],p);const f=s(t,["seed"]);e!==void 0&&f!=null&&r(e,["setup","generationConfig","seed"],f);const g=s(t,["speechConfig"]);e!==void 0&&g!=null&&r(e,["setup","generationConfig","speechConfig"],g);const m=s(t,["systemInstruction"]);e!==void 0&&m!=null&&r(e,["setup","systemInstruction"],Kn(i,k(i,m)));const h=s(t,["tools"]);if(e!==void 0&&h!=null){let E=oe(i,h);Array.isArray(E)&&(E=E.map(T=>ii(i,ie(i,T)))),r(e,["setup","tools"],E)}const y=s(t,["sessionResumption"]);if(e!==void 0&&y!=null&&r(e,["setup","sessionResumption"],si(i,y)),s(t,["inputAudioTranscription"])!==void 0)throw new Error("inputAudioTranscription parameter is not supported in Gemini API.");const v=s(t,["outputAudioTranscription"]);e!==void 0&&v!=null&&r(e,["setup","outputAudioTranscription"],ai());const C=s(t,["realtimeInputConfig"]);e!==void 0&&C!=null&&r(e,["setup","realtimeInputConfig"],ci(i,C));const w=s(t,["contextWindowCompression"]);return e!==void 0&&w!=null&&r(e,["setup","contextWindowCompression"],hi(i,w)),n}function yi(i,t,e){const n={},o=s(t,["generationConfig"]);e!==void 0&&o!=null&&r(e,["setup","generationConfig"],o);const a=s(t,["responseModalities"]);e!==void 0&&a!=null&&r(e,["setup","generationConfig","responseModalities"],a);const l=s(t,["temperature"]);e!==void 0&&l!=null&&r(e,["setup","generationConfig","temperature"],l);const d=s(t,["topP"]);e!==void 0&&d!=null&&r(e,["setup","generationConfig","topP"],d);const u=s(t,["topK"]);e!==void 0&&u!=null&&r(e,["setup","generationConfig","topK"],u);const c=s(t,["maxOutputTokens"]);e!==void 0&&c!=null&&r(e,["setup","generationConfig","maxOutputTokens"],c);const p=s(t,["mediaResolution"]);e!==void 0&&p!=null&&r(e,["setup","generationConfig","mediaResolution"],p);const f=s(t,["seed"]);e!==void 0&&f!=null&&r(e,["setup","generationConfig","seed"],f);const g=s(t,["speechConfig"]);e!==void 0&&g!=null&&r(e,["setup","generationConfig","speechConfig"],g);const m=s(t,["systemInstruction"]);e!==void 0&&m!=null&&r(e,["setup","systemInstruction"],Qn(i,k(i,m)));const h=s(t,["tools"]);if(e!==void 0&&h!=null){let T=oe(i,h);Array.isArray(T)&&(T=T.map(b=>oi(i,ie(i,b)))),r(e,["setup","tools"],T)}const y=s(t,["sessionResumption"]);e!==void 0&&y!=null&&r(e,["setup","sessionResumption"],ri(i,y));const v=s(t,["inputAudioTranscription"]);e!==void 0&&v!=null&&r(e,["setup","inputAudioTranscription"],st());const C=s(t,["outputAudioTranscription"]);e!==void 0&&C!=null&&r(e,["setup","outputAudioTranscription"],st());const w=s(t,["realtimeInputConfig"]);e!==void 0&&w!=null&&r(e,["setup","realtimeInputConfig"],ui(i,w));const E=s(t,["contextWindowCompression"]);return e!==void 0&&E!=null&&r(e,["setup","contextWindowCompression"],gi(i,E)),n}function vi(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["setup","model"],x(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],mi(i,o,e)),e}function Ci(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["setup","model"],x(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],yi(i,o,e)),e}function Ti(){return{}}function wi(){return{}}function Ei(){return{}}function Si(){return{}}function bi(i,t){const e={},n=s(t,["media"]);n!=null&&r(e,["mediaChunks"],St(i,n));const o=s(t,["audio"]);o!=null&&r(e,["audio"],Ht(i,o));const a=s(t,["audioStreamEnd"]);a!=null&&r(e,["audioStreamEnd"],a);const l=s(t,["video"]);l!=null&&r(e,["video"],Gt(i,l));const d=s(t,["text"]);return d!=null&&r(e,["text"],d),s(t,["activityStart"])!=null&&r(e,["activityStart"],Ti()),s(t,["activityEnd"])!=null&&r(e,["activityEnd"],Ei()),e}function Ii(i,t){const e={},n=s(t,["media"]);if(n!=null&&r(e,["mediaChunks"],St(i,n)),s(t,["audio"])!==void 0)throw new Error("audio parameter is not supported in Vertex AI.");const o=s(t,["audioStreamEnd"]);if(o!=null&&r(e,["audioStreamEnd"],o),s(t,["video"])!==void 0)throw new Error("video parameter is not supported in Vertex AI.");if(s(t,["text"])!==void 0)throw new Error("text parameter is not supported in Vertex AI.");return s(t,["activityStart"])!=null&&r(e,["activityStart"],wi()),s(t,["activityEnd"])!=null&&r(e,["activityEnd"],Si()),e}function xi(){return{}}function Ai(){return{}}function _i(i,t){const e={},n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const o=s(t,["codeExecutionResult"]);o!=null&&r(e,["codeExecutionResult"],o);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const d=s(t,["functionCall"]);d!=null&&r(e,["functionCall"],d);const u=s(t,["functionResponse"]);u!=null&&r(e,["functionResponse"],u);const c=s(t,["inlineData"]);c!=null&&r(e,["inlineData"],c);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function Ri(i,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const o=s(t,["thought"]);o!=null&&r(e,["thought"],o);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const d=s(t,["fileData"]);d!=null&&r(e,["fileData"],d);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const c=s(t,["functionResponse"]);c!=null&&r(e,["functionResponse"],c);const p=s(t,["inlineData"]);p!=null&&r(e,["inlineData"],p);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function ki(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>_i(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function Mi(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Ri(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function rt(i,t){const e={},n=s(t,["text"]);n!=null&&r(e,["text"],n);const o=s(t,["finished"]);return o!=null&&r(e,["finished"],o),e}function at(i,t){const e={},n=s(t,["text"]);n!=null&&r(e,["text"],n);const o=s(t,["finished"]);return o!=null&&r(e,["finished"],o),e}function Pi(i,t){const e={},n=s(t,["modelTurn"]);n!=null&&r(e,["modelTurn"],ki(i,n));const o=s(t,["turnComplete"]);o!=null&&r(e,["turnComplete"],o);const a=s(t,["interrupted"]);a!=null&&r(e,["interrupted"],a);const l=s(t,["groundingMetadata"]);l!=null&&r(e,["groundingMetadata"],l);const d=s(t,["generationComplete"]);d!=null&&r(e,["generationComplete"],d);const u=s(t,["inputTranscription"]);u!=null&&r(e,["inputTranscription"],rt(i,u));const c=s(t,["outputTranscription"]);return c!=null&&r(e,["outputTranscription"],rt(i,c)),e}function Di(i,t){const e={},n=s(t,["modelTurn"]);n!=null&&r(e,["modelTurn"],Mi(i,n));const o=s(t,["turnComplete"]);o!=null&&r(e,["turnComplete"],o);const a=s(t,["interrupted"]);a!=null&&r(e,["interrupted"],a);const l=s(t,["groundingMetadata"]);l!=null&&r(e,["groundingMetadata"],l);const d=s(t,["generationComplete"]);d!=null&&r(e,["generationComplete"],d);const u=s(t,["inputTranscription"]);u!=null&&r(e,["inputTranscription"],at(i,u));const c=s(t,["outputTranscription"]);return c!=null&&r(e,["outputTranscription"],at(i,c)),e}function Ni(i,t){const e={},n=s(t,["id"]);n!=null&&r(e,["id"],n);const o=s(t,["args"]);o!=null&&r(e,["args"],o);const a=s(t,["name"]);return a!=null&&r(e,["name"],a),e}function Li(i,t){const e={},n=s(t,["args"]);n!=null&&r(e,["args"],n);const o=s(t,["name"]);return o!=null&&r(e,["name"],o),e}function Fi(i,t){const e={},n=s(t,["functionCalls"]);if(n!=null){let o=n;Array.isArray(o)&&(o=o.map(a=>Ni(i,a))),r(e,["functionCalls"],o)}return e}function qi(i,t){const e={},n=s(t,["functionCalls"]);if(n!=null){let o=n;Array.isArray(o)&&(o=o.map(a=>Li(i,a))),r(e,["functionCalls"],o)}return e}function Vi(i,t){const e={},n=s(t,["ids"]);return n!=null&&r(e,["ids"],n),e}function Ui(i,t){const e={},n=s(t,["ids"]);return n!=null&&r(e,["ids"],n),e}function Q(i,t){const e={},n=s(t,["modality"]);n!=null&&r(e,["modality"],n);const o=s(t,["tokenCount"]);return o!=null&&r(e,["tokenCount"],o),e}function X(i,t){const e={},n=s(t,["modality"]);n!=null&&r(e,["modality"],n);const o=s(t,["tokenCount"]);return o!=null&&r(e,["tokenCount"],o),e}function Bi(i,t){const e={},n=s(t,["promptTokenCount"]);n!=null&&r(e,["promptTokenCount"],n);const o=s(t,["cachedContentTokenCount"]);o!=null&&r(e,["cachedContentTokenCount"],o);const a=s(t,["responseTokenCount"]);a!=null&&r(e,["responseTokenCount"],a);const l=s(t,["toolUsePromptTokenCount"]);l!=null&&r(e,["toolUsePromptTokenCount"],l);const d=s(t,["thoughtsTokenCount"]);d!=null&&r(e,["thoughtsTokenCount"],d);const u=s(t,["totalTokenCount"]);u!=null&&r(e,["totalTokenCount"],u);const c=s(t,["promptTokensDetails"]);if(c!=null){let m=c;Array.isArray(m)&&(m=m.map(h=>Q(i,h))),r(e,["promptTokensDetails"],m)}const p=s(t,["cacheTokensDetails"]);if(p!=null){let m=p;Array.isArray(m)&&(m=m.map(h=>Q(i,h))),r(e,["cacheTokensDetails"],m)}const f=s(t,["responseTokensDetails"]);if(f!=null){let m=f;Array.isArray(m)&&(m=m.map(h=>Q(i,h))),r(e,["responseTokensDetails"],m)}const g=s(t,["toolUsePromptTokensDetails"]);if(g!=null){let m=g;Array.isArray(m)&&(m=m.map(h=>Q(i,h))),r(e,["toolUsePromptTokensDetails"],m)}return e}function Gi(i,t){const e={},n=s(t,["promptTokenCount"]);n!=null&&r(e,["promptTokenCount"],n);const o=s(t,["cachedContentTokenCount"]);o!=null&&r(e,["cachedContentTokenCount"],o);const a=s(t,["candidatesTokenCount"]);a!=null&&r(e,["responseTokenCount"],a);const l=s(t,["toolUsePromptTokenCount"]);l!=null&&r(e,["toolUsePromptTokenCount"],l);const d=s(t,["thoughtsTokenCount"]);d!=null&&r(e,["thoughtsTokenCount"],d);const u=s(t,["totalTokenCount"]);u!=null&&r(e,["totalTokenCount"],u);const c=s(t,["promptTokensDetails"]);if(c!=null){let h=c;Array.isArray(h)&&(h=h.map(y=>X(i,y))),r(e,["promptTokensDetails"],h)}const p=s(t,["cacheTokensDetails"]);if(p!=null){let h=p;Array.isArray(h)&&(h=h.map(y=>X(i,y))),r(e,["cacheTokensDetails"],h)}const f=s(t,["candidatesTokensDetails"]);if(f!=null){let h=f;Array.isArray(h)&&(h=h.map(y=>X(i,y))),r(e,["responseTokensDetails"],h)}const g=s(t,["toolUsePromptTokensDetails"]);if(g!=null){let h=g;Array.isArray(h)&&(h=h.map(y=>X(i,y))),r(e,["toolUsePromptTokensDetails"],h)}const m=s(t,["trafficType"]);return m!=null&&r(e,["trafficType"],m),e}function Hi(i,t){const e={},n=s(t,["timeLeft"]);return n!=null&&r(e,["timeLeft"],n),e}function $i(i,t){const e={},n=s(t,["timeLeft"]);return n!=null&&r(e,["timeLeft"],n),e}function zi(i,t){const e={},n=s(t,["newHandle"]);n!=null&&r(e,["newHandle"],n);const o=s(t,["resumable"]);o!=null&&r(e,["resumable"],o);const a=s(t,["lastConsumedClientMessageIndex"]);return a!=null&&r(e,["lastConsumedClientMessageIndex"],a),e}function Wi(i,t){const e={},n=s(t,["newHandle"]);n!=null&&r(e,["newHandle"],n);const o=s(t,["resumable"]);o!=null&&r(e,["resumable"],o);const a=s(t,["lastConsumedClientMessageIndex"]);return a!=null&&r(e,["lastConsumedClientMessageIndex"],a),e}function Oi(i,t){const e={};s(t,["setupComplete"])!=null&&r(e,["setupComplete"],xi());const o=s(t,["serverContent"]);o!=null&&r(e,["serverContent"],Pi(i,o));const a=s(t,["toolCall"]);a!=null&&r(e,["toolCall"],Fi(i,a));const l=s(t,["toolCallCancellation"]);l!=null&&r(e,["toolCallCancellation"],Vi(i,l));const d=s(t,["usageMetadata"]);d!=null&&r(e,["usageMetadata"],Bi(i,d));const u=s(t,["goAway"]);u!=null&&r(e,["goAway"],Hi(i,u));const c=s(t,["sessionResumptionUpdate"]);return c!=null&&r(e,["sessionResumptionUpdate"],zi(i,c)),e}function Yi(i,t){const e={};s(t,["setupComplete"])!=null&&r(e,["setupComplete"],Ai());const o=s(t,["serverContent"]);o!=null&&r(e,["serverContent"],Di(i,o));const a=s(t,["toolCall"]);a!=null&&r(e,["toolCall"],qi(i,a));const l=s(t,["toolCallCancellation"]);l!=null&&r(e,["toolCallCancellation"],Ui(i,l));const d=s(t,["usageMetadata"]);d!=null&&r(e,["usageMetadata"],Gi(i,d));const u=s(t,["goAway"]);u!=null&&r(e,["goAway"],$i(i,u));const c=s(t,["sessionResumptionUpdate"]);return c!=null&&r(e,["sessionResumptionUpdate"],Wi(i,c)),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Ji(i,t){const e={};if(s(t,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const o=s(t,["codeExecutionResult"]);o!=null&&r(e,["codeExecutionResult"],o);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const d=s(t,["functionCall"]);d!=null&&r(e,["functionCall"],d);const u=s(t,["functionResponse"]);u!=null&&r(e,["functionResponse"],u);const c=s(t,["inlineData"]);c!=null&&r(e,["inlineData"],c);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function se(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Ji(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function Ki(i,t){const e={};if(s(t,["method"])!==void 0)throw new Error("method parameter is not supported in Gemini API.");const n=s(t,["category"]);n!=null&&r(e,["category"],n);const o=s(t,["threshold"]);return o!=null&&r(e,["threshold"],o),e}function Qi(){return{}}function Xi(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["dynamicThreshold"]);return o!=null&&r(e,["dynamicThreshold"],o),e}function Zi(i,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],Xi(i,n)),e}function ji(i,t){const e={};if(s(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");s(t,["googleSearch"])!=null&&r(e,["googleSearch"],Qi());const o=s(t,["googleSearchRetrieval"]);o!=null&&r(e,["googleSearchRetrieval"],Zi(i,o));const a=s(t,["codeExecution"]);a!=null&&r(e,["codeExecution"],a);const l=s(t,["functionDeclarations"]);return l!=null&&r(e,["functionDeclarations"],l),e}function eo(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["allowedFunctionNames"]);return o!=null&&r(e,["allowedFunctionNames"],o),e}function to(i,t){const e={},n=s(t,["functionCallingConfig"]);return n!=null&&r(e,["functionCallingConfig"],eo(i,n)),e}function no(i,t){const e={},n=s(t,["voiceName"]);return n!=null&&r(e,["voiceName"],n),e}function io(i,t){const e={},n=s(t,["prebuiltVoiceConfig"]);return n!=null&&r(e,["prebuiltVoiceConfig"],no(i,n)),e}function oo(i,t){const e={},n=s(t,["voiceConfig"]);n!=null&&r(e,["voiceConfig"],io(i,n));const o=s(t,["languageCode"]);return o!=null&&r(e,["languageCode"],o),e}function so(i,t){const e={},n=s(t,["includeThoughts"]);n!=null&&r(e,["includeThoughts"],n);const o=s(t,["thinkingBudget"]);return o!=null&&r(e,["thinkingBudget"],o),e}function ro(i,t,e){const n={},o=s(t,["systemInstruction"]);e!==void 0&&o!=null&&r(e,["systemInstruction"],se(i,k(i,o)));const a=s(t,["temperature"]);a!=null&&r(n,["temperature"],a);const l=s(t,["topP"]);l!=null&&r(n,["topP"],l);const d=s(t,["topK"]);d!=null&&r(n,["topK"],d);const u=s(t,["candidateCount"]);u!=null&&r(n,["candidateCount"],u);const c=s(t,["maxOutputTokens"]);c!=null&&r(n,["maxOutputTokens"],c);const p=s(t,["stopSequences"]);p!=null&&r(n,["stopSequences"],p);const f=s(t,["responseLogprobs"]);f!=null&&r(n,["responseLogprobs"],f);const g=s(t,["logprobs"]);g!=null&&r(n,["logprobs"],g);const m=s(t,["presencePenalty"]);m!=null&&r(n,["presencePenalty"],m);const h=s(t,["frequencyPenalty"]);h!=null&&r(n,["frequencyPenalty"],h);const y=s(t,["seed"]);y!=null&&r(n,["seed"],y);const v=s(t,["responseMimeType"]);v!=null&&r(n,["responseMimeType"],v);const C=s(t,["responseSchema"]);if(C!=null&&r(n,["responseSchema"],xt(i,C)),s(t,["routingConfig"])!==void 0)throw new Error("routingConfig parameter is not supported in Gemini API.");if(s(t,["modelSelectionConfig"])!==void 0)throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");const w=s(t,["safetySettings"]);if(e!==void 0&&w!=null){let P=w;Array.isArray(P)&&(P=P.map(B=>Ki(i,B))),r(e,["safetySettings"],P)}const E=s(t,["tools"]);if(e!==void 0&&E!=null){let P=oe(i,E);Array.isArray(P)&&(P=P.map(B=>ji(i,ie(i,B)))),r(e,["tools"],P)}const T=s(t,["toolConfig"]);if(e!==void 0&&T!=null&&r(e,["toolConfig"],to(i,T)),s(t,["labels"])!==void 0)throw new Error("labels parameter is not supported in Gemini API.");const b=s(t,["cachedContent"]);e!==void 0&&b!=null&&r(e,["cachedContent"],q(i,b));const _=s(t,["responseModalities"]);_!=null&&r(n,["responseModalities"],_);const M=s(t,["mediaResolution"]);M!=null&&r(n,["mediaResolution"],M);const N=s(t,["speechConfig"]);if(N!=null&&r(n,["speechConfig"],oo(i,At(i,N))),s(t,["audioTimestamp"])!==void 0)throw new Error("audioTimestamp parameter is not supported in Gemini API.");const U=s(t,["thinkingConfig"]);return U!=null&&r(n,["thinkingConfig"],so(i,U)),n}function lt(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],x(i,n));const o=s(t,["contents"]);if(o!=null){let l=F(i,o);Array.isArray(l)&&(l=l.map(d=>se(i,d))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["generationConfig"],ro(i,a,e)),e}function ao(i,t,e){const n={},o=s(t,["taskType"]);e!==void 0&&o!=null&&r(e,["requests[]","taskType"],o);const a=s(t,["title"]);e!==void 0&&a!=null&&r(e,["requests[]","title"],a);const l=s(t,["outputDimensionality"]);if(e!==void 0&&l!=null&&r(e,["requests[]","outputDimensionality"],l),s(t,["mimeType"])!==void 0)throw new Error("mimeType parameter is not supported in Gemini API.");if(s(t,["autoTruncate"])!==void 0)throw new Error("autoTruncate parameter is not supported in Gemini API.");return n}function lo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],x(i,n));const o=s(t,["contents"]);o!=null&&r(e,["requests[]","content"],It(i,o));const a=s(t,["config"]);a!=null&&r(e,["config"],ao(i,a,e));const l=s(t,["model"]);return l!==void 0&&r(e,["requests[]","model"],x(i,l)),e}function co(i,t,e){const n={};if(s(t,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(s(t,["negativePrompt"])!==void 0)throw new Error("negativePrompt parameter is not supported in Gemini API.");const o=s(t,["numberOfImages"]);e!==void 0&&o!=null&&r(e,["parameters","sampleCount"],o);const a=s(t,["aspectRatio"]);e!==void 0&&a!=null&&r(e,["parameters","aspectRatio"],a);const l=s(t,["guidanceScale"]);if(e!==void 0&&l!=null&&r(e,["parameters","guidanceScale"],l),s(t,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const d=s(t,["safetyFilterLevel"]);e!==void 0&&d!=null&&r(e,["parameters","safetySetting"],d);const u=s(t,["personGeneration"]);e!==void 0&&u!=null&&r(e,["parameters","personGeneration"],u);const c=s(t,["includeSafetyAttributes"]);e!==void 0&&c!=null&&r(e,["parameters","includeSafetyAttributes"],c);const p=s(t,["includeRaiReason"]);e!==void 0&&p!=null&&r(e,["parameters","includeRaiReason"],p);const f=s(t,["language"]);e!==void 0&&f!=null&&r(e,["parameters","language"],f);const g=s(t,["outputMimeType"]);e!==void 0&&g!=null&&r(e,["parameters","outputOptions","mimeType"],g);const m=s(t,["outputCompressionQuality"]);if(e!==void 0&&m!=null&&r(e,["parameters","outputOptions","compressionQuality"],m),s(t,["addWatermark"])!==void 0)throw new Error("addWatermark parameter is not supported in Gemini API.");if(s(t,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return n}function uo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],x(i,n));const o=s(t,["prompt"]);o!=null&&r(e,["instances[0]","prompt"],o);const a=s(t,["config"]);return a!=null&&r(e,["config"],co(i,a,e)),e}function po(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],x(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function fo(i,t,e){const n={},o=s(t,["displayName"]);e!==void 0&&o!=null&&r(e,["displayName"],o);const a=s(t,["description"]);return e!==void 0&&a!=null&&r(e,["description"],a),n}function ho(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],x(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],fo(i,o,e)),e}function go(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],x(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function mo(i,t){const e={};if(s(t,["systemInstruction"])!==void 0)throw new Error("systemInstruction parameter is not supported in Gemini API.");if(s(t,["tools"])!==void 0)throw new Error("tools parameter is not supported in Gemini API.");if(s(t,["generationConfig"])!==void 0)throw new Error("generationConfig parameter is not supported in Gemini API.");return e}function yo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],x(i,n));const o=s(t,["contents"]);if(o!=null){let l=F(i,o);Array.isArray(l)&&(l=l.map(d=>se(i,d))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["config"],mo(i,a)),e}function vo(i,t){const e={};if(s(t,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");const n=s(t,["imageBytes"]);n!=null&&r(e,["bytesBase64Encoded"],V(i,n));const o=s(t,["mimeType"]);return o!=null&&r(e,["mimeType"],o),e}function Co(i,t,e){const n={},o=s(t,["numberOfVideos"]);if(e!==void 0&&o!=null&&r(e,["parameters","sampleCount"],o),s(t,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(s(t,["fps"])!==void 0)throw new Error("fps parameter is not supported in Gemini API.");const a=s(t,["durationSeconds"]);if(e!==void 0&&a!=null&&r(e,["parameters","durationSeconds"],a),s(t,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const l=s(t,["aspectRatio"]);if(e!==void 0&&l!=null&&r(e,["parameters","aspectRatio"],l),s(t,["resolution"])!==void 0)throw new Error("resolution parameter is not supported in Gemini API.");const d=s(t,["personGeneration"]);if(e!==void 0&&d!=null&&r(e,["parameters","personGeneration"],d),s(t,["pubsubTopic"])!==void 0)throw new Error("pubsubTopic parameter is not supported in Gemini API.");const u=s(t,["negativePrompt"]);if(e!==void 0&&u!=null&&r(e,["parameters","negativePrompt"],u),s(t,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return n}function To(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],x(i,n));const o=s(t,["prompt"]);o!=null&&r(e,["instances[0]","prompt"],o);const a=s(t,["image"]);a!=null&&r(e,["instances[0]","image"],vo(i,a));const l=s(t,["config"]);return l!=null&&r(e,["config"],Co(i,l,e)),e}function wo(i,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const o=s(t,["thought"]);o!=null&&r(e,["thought"],o);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const d=s(t,["fileData"]);d!=null&&r(e,["fileData"],d);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const c=s(t,["functionResponse"]);c!=null&&r(e,["functionResponse"],c);const p=s(t,["inlineData"]);p!=null&&r(e,["inlineData"],p);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function H(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>wo(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function Eo(i,t){const e={},n=s(t,["featureSelectionPreference"]);return n!=null&&r(e,["featureSelectionPreference"],n),e}function So(i,t){const e={},n=s(t,["method"]);n!=null&&r(e,["method"],n);const o=s(t,["category"]);o!=null&&r(e,["category"],o);const a=s(t,["threshold"]);return a!=null&&r(e,["threshold"],a),e}function bo(){return{}}function Io(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["dynamicThreshold"]);return o!=null&&r(e,["dynamicThreshold"],o),e}function xo(i,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],Io(i,n)),e}function Mt(i,t){const e={},n=s(t,["retrieval"]);n!=null&&r(e,["retrieval"],n),s(t,["googleSearch"])!=null&&r(e,["googleSearch"],bo());const a=s(t,["googleSearchRetrieval"]);a!=null&&r(e,["googleSearchRetrieval"],xo(i,a));const l=s(t,["codeExecution"]);l!=null&&r(e,["codeExecution"],l);const d=s(t,["functionDeclarations"]);return d!=null&&r(e,["functionDeclarations"],d),e}function Ao(i,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const o=s(t,["allowedFunctionNames"]);return o!=null&&r(e,["allowedFunctionNames"],o),e}function _o(i,t){const e={},n=s(t,["functionCallingConfig"]);return n!=null&&r(e,["functionCallingConfig"],Ao(i,n)),e}function Ro(i,t){const e={},n=s(t,["voiceName"]);return n!=null&&r(e,["voiceName"],n),e}function ko(i,t){const e={},n=s(t,["prebuiltVoiceConfig"]);return n!=null&&r(e,["prebuiltVoiceConfig"],Ro(i,n)),e}function Mo(i,t){const e={},n=s(t,["voiceConfig"]);n!=null&&r(e,["voiceConfig"],ko(i,n));const o=s(t,["languageCode"]);return o!=null&&r(e,["languageCode"],o),e}function Po(i,t){const e={},n=s(t,["includeThoughts"]);n!=null&&r(e,["includeThoughts"],n);const o=s(t,["thinkingBudget"]);return o!=null&&r(e,["thinkingBudget"],o),e}function Do(i,t,e){const n={},o=s(t,["systemInstruction"]);e!==void 0&&o!=null&&r(e,["systemInstruction"],H(i,k(i,o)));const a=s(t,["temperature"]);a!=null&&r(n,["temperature"],a);const l=s(t,["topP"]);l!=null&&r(n,["topP"],l);const d=s(t,["topK"]);d!=null&&r(n,["topK"],d);const u=s(t,["candidateCount"]);u!=null&&r(n,["candidateCount"],u);const c=s(t,["maxOutputTokens"]);c!=null&&r(n,["maxOutputTokens"],c);const p=s(t,["stopSequences"]);p!=null&&r(n,["stopSequences"],p);const f=s(t,["responseLogprobs"]);f!=null&&r(n,["responseLogprobs"],f);const g=s(t,["logprobs"]);g!=null&&r(n,["logprobs"],g);const m=s(t,["presencePenalty"]);m!=null&&r(n,["presencePenalty"],m);const h=s(t,["frequencyPenalty"]);h!=null&&r(n,["frequencyPenalty"],h);const y=s(t,["seed"]);y!=null&&r(n,["seed"],y);const v=s(t,["responseMimeType"]);v!=null&&r(n,["responseMimeType"],v);const C=s(t,["responseSchema"]);C!=null&&r(n,["responseSchema"],xt(i,C));const w=s(t,["routingConfig"]);w!=null&&r(n,["routingConfig"],w);const E=s(t,["modelSelectionConfig"]);E!=null&&r(n,["modelConfig"],Eo(i,E));const T=s(t,["safetySettings"]);if(e!==void 0&&T!=null){let D=T;Array.isArray(D)&&(D=D.map(re=>So(i,re))),r(e,["safetySettings"],D)}const b=s(t,["tools"]);if(e!==void 0&&b!=null){let D=oe(i,b);Array.isArray(D)&&(D=D.map(re=>Mt(i,ie(i,re)))),r(e,["tools"],D)}const _=s(t,["toolConfig"]);e!==void 0&&_!=null&&r(e,["toolConfig"],_o(i,_));const M=s(t,["labels"]);e!==void 0&&M!=null&&r(e,["labels"],M);const N=s(t,["cachedContent"]);e!==void 0&&N!=null&&r(e,["cachedContent"],q(i,N));const U=s(t,["responseModalities"]);U!=null&&r(n,["responseModalities"],U);const P=s(t,["mediaResolution"]);P!=null&&r(n,["mediaResolution"],P);const B=s(t,["speechConfig"]);B!=null&&r(n,["speechConfig"],Mo(i,At(i,B)));const ge=s(t,["audioTimestamp"]);ge!=null&&r(n,["audioTimestamp"],ge);const me=s(t,["thinkingConfig"]);return me!=null&&r(n,["thinkingConfig"],Po(i,me)),n}function dt(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],x(i,n));const o=s(t,["contents"]);if(o!=null){let l=F(i,o);Array.isArray(l)&&(l=l.map(d=>H(i,d))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["generationConfig"],Do(i,a,e)),e}function No(i,t,e){const n={},o=s(t,["taskType"]);e!==void 0&&o!=null&&r(e,["instances[]","task_type"],o);const a=s(t,["title"]);e!==void 0&&a!=null&&r(e,["instances[]","title"],a);const l=s(t,["outputDimensionality"]);e!==void 0&&l!=null&&r(e,["parameters","outputDimensionality"],l);const d=s(t,["mimeType"]);e!==void 0&&d!=null&&r(e,["instances[]","mimeType"],d);const u=s(t,["autoTruncate"]);return e!==void 0&&u!=null&&r(e,["parameters","autoTruncate"],u),n}function Lo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],x(i,n));const o=s(t,["contents"]);o!=null&&r(e,["instances[]","content"],It(i,o));const a=s(t,["config"]);return a!=null&&r(e,["config"],No(i,a,e)),e}function Fo(i,t,e){const n={},o=s(t,["outputGcsUri"]);e!==void 0&&o!=null&&r(e,["parameters","storageUri"],o);const a=s(t,["negativePrompt"]);e!==void 0&&a!=null&&r(e,["parameters","negativePrompt"],a);const l=s(t,["numberOfImages"]);e!==void 0&&l!=null&&r(e,["parameters","sampleCount"],l);const d=s(t,["aspectRatio"]);e!==void 0&&d!=null&&r(e,["parameters","aspectRatio"],d);const u=s(t,["guidanceScale"]);e!==void 0&&u!=null&&r(e,["parameters","guidanceScale"],u);const c=s(t,["seed"]);e!==void 0&&c!=null&&r(e,["parameters","seed"],c);const p=s(t,["safetyFilterLevel"]);e!==void 0&&p!=null&&r(e,["parameters","safetySetting"],p);const f=s(t,["personGeneration"]);e!==void 0&&f!=null&&r(e,["parameters","personGeneration"],f);const g=s(t,["includeSafetyAttributes"]);e!==void 0&&g!=null&&r(e,["parameters","includeSafetyAttributes"],g);const m=s(t,["includeRaiReason"]);e!==void 0&&m!=null&&r(e,["parameters","includeRaiReason"],m);const h=s(t,["language"]);e!==void 0&&h!=null&&r(e,["parameters","language"],h);const y=s(t,["outputMimeType"]);e!==void 0&&y!=null&&r(e,["parameters","outputOptions","mimeType"],y);const v=s(t,["outputCompressionQuality"]);e!==void 0&&v!=null&&r(e,["parameters","outputOptions","compressionQuality"],v);const C=s(t,["addWatermark"]);e!==void 0&&C!=null&&r(e,["parameters","addWatermark"],C);const w=s(t,["enhancePrompt"]);return e!==void 0&&w!=null&&r(e,["parameters","enhancePrompt"],w),n}function qo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],x(i,n));const o=s(t,["prompt"]);o!=null&&r(e,["instances[0]","prompt"],o);const a=s(t,["config"]);return a!=null&&r(e,["config"],Fo(i,a,e)),e}function Vo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],x(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function Uo(i,t,e){const n={},o=s(t,["displayName"]);e!==void 0&&o!=null&&r(e,["displayName"],o);const a=s(t,["description"]);return e!==void 0&&a!=null&&r(e,["description"],a),n}function Bo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],x(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],Uo(i,o,e)),e}function Go(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],x(i,n));const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function Ho(i,t,e){const n={},o=s(t,["systemInstruction"]);e!==void 0&&o!=null&&r(e,["systemInstruction"],H(i,k(i,o)));const a=s(t,["tools"]);if(e!==void 0&&a!=null){let d=a;Array.isArray(d)&&(d=d.map(u=>Mt(i,u))),r(e,["tools"],d)}const l=s(t,["generationConfig"]);return e!==void 0&&l!=null&&r(e,["generationConfig"],l),n}function $o(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],x(i,n));const o=s(t,["contents"]);if(o!=null){let l=F(i,o);Array.isArray(l)&&(l=l.map(d=>H(i,d))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["config"],Ho(i,a,e)),e}function zo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],x(i,n));const o=s(t,["contents"]);if(o!=null){let l=F(i,o);Array.isArray(l)&&(l=l.map(d=>H(i,d))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["config"],a),e}function Wo(i,t){const e={},n=s(t,["gcsUri"]);n!=null&&r(e,["gcsUri"],n);const o=s(t,["imageBytes"]);o!=null&&r(e,["bytesBase64Encoded"],V(i,o));const a=s(t,["mimeType"]);return a!=null&&r(e,["mimeType"],a),e}function Oo(i,t,e){const n={},o=s(t,["numberOfVideos"]);e!==void 0&&o!=null&&r(e,["parameters","sampleCount"],o);const a=s(t,["outputGcsUri"]);e!==void 0&&a!=null&&r(e,["parameters","storageUri"],a);const l=s(t,["fps"]);e!==void 0&&l!=null&&r(e,["parameters","fps"],l);const d=s(t,["durationSeconds"]);e!==void 0&&d!=null&&r(e,["parameters","durationSeconds"],d);const u=s(t,["seed"]);e!==void 0&&u!=null&&r(e,["parameters","seed"],u);const c=s(t,["aspectRatio"]);e!==void 0&&c!=null&&r(e,["parameters","aspectRatio"],c);const p=s(t,["resolution"]);e!==void 0&&p!=null&&r(e,["parameters","resolution"],p);const f=s(t,["personGeneration"]);e!==void 0&&f!=null&&r(e,["parameters","personGeneration"],f);const g=s(t,["pubsubTopic"]);e!==void 0&&g!=null&&r(e,["parameters","pubsubTopic"],g);const m=s(t,["negativePrompt"]);e!==void 0&&m!=null&&r(e,["parameters","negativePrompt"],m);const h=s(t,["enhancePrompt"]);return e!==void 0&&h!=null&&r(e,["parameters","enhancePrompt"],h),n}function Yo(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],x(i,n));const o=s(t,["prompt"]);o!=null&&r(e,["instances[0]","prompt"],o);const a=s(t,["image"]);a!=null&&r(e,["instances[0]","image"],Wo(i,a));const l=s(t,["config"]);return l!=null&&r(e,["config"],Oo(i,l,e)),e}function Jo(i,t){const e={},n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const o=s(t,["codeExecutionResult"]);o!=null&&r(e,["codeExecutionResult"],o);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const d=s(t,["functionCall"]);d!=null&&r(e,["functionCall"],d);const u=s(t,["functionResponse"]);u!=null&&r(e,["functionResponse"],u);const c=s(t,["inlineData"]);c!=null&&r(e,["inlineData"],c);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function Ko(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Jo(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function Qo(i,t){const e={},n=s(t,["citationSources"]);return n!=null&&r(e,["citations"],n),e}function Xo(i,t){const e={},n=s(t,["content"]);n!=null&&r(e,["content"],Ko(i,n));const o=s(t,["citationMetadata"]);o!=null&&r(e,["citationMetadata"],Qo(i,o));const a=s(t,["tokenCount"]);a!=null&&r(e,["tokenCount"],a);const l=s(t,["finishReason"]);l!=null&&r(e,["finishReason"],l);const d=s(t,["avgLogprobs"]);d!=null&&r(e,["avgLogprobs"],d);const u=s(t,["groundingMetadata"]);u!=null&&r(e,["groundingMetadata"],u);const c=s(t,["index"]);c!=null&&r(e,["index"],c);const p=s(t,["logprobsResult"]);p!=null&&r(e,["logprobsResult"],p);const f=s(t,["safetyRatings"]);return f!=null&&r(e,["safetyRatings"],f),e}function ct(i,t){const e={},n=s(t,["candidates"]);if(n!=null){let d=n;Array.isArray(d)&&(d=d.map(u=>Xo(i,u))),r(e,["candidates"],d)}const o=s(t,["modelVersion"]);o!=null&&r(e,["modelVersion"],o);const a=s(t,["promptFeedback"]);a!=null&&r(e,["promptFeedback"],a);const l=s(t,["usageMetadata"]);return l!=null&&r(e,["usageMetadata"],l),e}function Zo(i,t){const e={},n=s(t,["values"]);return n!=null&&r(e,["values"],n),e}function jo(){return{}}function es(i,t){const e={},n=s(t,["embeddings"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Zo(i,l))),r(e,["embeddings"],a)}return s(t,["metadata"])!=null&&r(e,["metadata"],jo()),e}function ts(i,t){const e={},n=s(t,["bytesBase64Encoded"]);n!=null&&r(e,["imageBytes"],V(i,n));const o=s(t,["mimeType"]);return o!=null&&r(e,["mimeType"],o),e}function Pt(i,t){const e={},n=s(t,["safetyAttributes","categories"]);n!=null&&r(e,["categories"],n);const o=s(t,["safetyAttributes","scores"]);o!=null&&r(e,["scores"],o);const a=s(t,["contentType"]);return a!=null&&r(e,["contentType"],a),e}function ns(i,t){const e={},n=s(t,["_self"]);n!=null&&r(e,["image"],ts(i,n));const o=s(t,["raiFilteredReason"]);o!=null&&r(e,["raiFilteredReason"],o);const a=s(t,["_self"]);return a!=null&&r(e,["safetyAttributes"],Pt(i,a)),e}function is(i,t){const e={},n=s(t,["predictions"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>ns(i,l))),r(e,["generatedImages"],a)}const o=s(t,["positivePromptSafetyAttributes"]);return o!=null&&r(e,["positivePromptSafetyAttributes"],Pt(i,o)),e}function os(i,t){const e={},n=s(t,["baseModel"]);n!=null&&r(e,["baseModel"],n);const o=s(t,["createTime"]);o!=null&&r(e,["createTime"],o);const a=s(t,["updateTime"]);return a!=null&&r(e,["updateTime"],a),e}function ut(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["displayName"]);o!=null&&r(e,["displayName"],o);const a=s(t,["description"]);a!=null&&r(e,["description"],a);const l=s(t,["version"]);l!=null&&r(e,["version"],l);const d=s(t,["_self"]);d!=null&&r(e,["tunedModelInfo"],os(i,d));const u=s(t,["inputTokenLimit"]);u!=null&&r(e,["inputTokenLimit"],u);const c=s(t,["outputTokenLimit"]);c!=null&&r(e,["outputTokenLimit"],c);const p=s(t,["supportedGenerationMethods"]);return p!=null&&r(e,["supportedActions"],p),e}function ss(){return{}}function rs(i,t){const e={},n=s(t,["totalTokens"]);n!=null&&r(e,["totalTokens"],n);const o=s(t,["cachedContentTokenCount"]);return o!=null&&r(e,["cachedContentTokenCount"],o),e}function as(i,t){const e={},n=s(t,["video","uri"]);n!=null&&r(e,["uri"],n);const o=s(t,["video","encodedVideo"]);o!=null&&r(e,["videoBytes"],V(i,o));const a=s(t,["encoding"]);return a!=null&&r(e,["mimeType"],a),e}function ls(i,t){const e={},n=s(t,["_self"]);return n!=null&&r(e,["video"],as(i,n)),e}function ds(i,t){const e={},n=s(t,["generatedSamples"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(d=>ls(i,d))),r(e,["generatedVideos"],l)}const o=s(t,["raiMediaFilteredCount"]);o!=null&&r(e,["raiMediaFilteredCount"],o);const a=s(t,["raiMediaFilteredReasons"]);return a!=null&&r(e,["raiMediaFilteredReasons"],a),e}function cs(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["metadata"]);o!=null&&r(e,["metadata"],o);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);l!=null&&r(e,["error"],l);const d=s(t,["response","generateVideoResponse"]);return d!=null&&r(e,["response"],ds(i,d)),e}function us(i,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const o=s(t,["thought"]);o!=null&&r(e,["thought"],o);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const d=s(t,["fileData"]);d!=null&&r(e,["fileData"],d);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const c=s(t,["functionResponse"]);c!=null&&r(e,["functionResponse"],c);const p=s(t,["inlineData"]);p!=null&&r(e,["inlineData"],p);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function ps(i,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>us(i,l))),r(e,["parts"],a)}const o=s(t,["role"]);return o!=null&&r(e,["role"],o),e}function fs(i,t){const e={},n=s(t,["citations"]);return n!=null&&r(e,["citations"],n),e}function hs(i,t){const e={},n=s(t,["content"]);n!=null&&r(e,["content"],ps(i,n));const o=s(t,["citationMetadata"]);o!=null&&r(e,["citationMetadata"],fs(i,o));const a=s(t,["finishMessage"]);a!=null&&r(e,["finishMessage"],a);const l=s(t,["finishReason"]);l!=null&&r(e,["finishReason"],l);const d=s(t,["avgLogprobs"]);d!=null&&r(e,["avgLogprobs"],d);const u=s(t,["groundingMetadata"]);u!=null&&r(e,["groundingMetadata"],u);const c=s(t,["index"]);c!=null&&r(e,["index"],c);const p=s(t,["logprobsResult"]);p!=null&&r(e,["logprobsResult"],p);const f=s(t,["safetyRatings"]);return f!=null&&r(e,["safetyRatings"],f),e}function pt(i,t){const e={},n=s(t,["candidates"]);if(n!=null){let c=n;Array.isArray(c)&&(c=c.map(p=>hs(i,p))),r(e,["candidates"],c)}const o=s(t,["createTime"]);o!=null&&r(e,["createTime"],o);const a=s(t,["responseId"]);a!=null&&r(e,["responseId"],a);const l=s(t,["modelVersion"]);l!=null&&r(e,["modelVersion"],l);const d=s(t,["promptFeedback"]);d!=null&&r(e,["promptFeedback"],d);const u=s(t,["usageMetadata"]);return u!=null&&r(e,["usageMetadata"],u),e}function gs(i,t){const e={},n=s(t,["truncated"]);n!=null&&r(e,["truncated"],n);const o=s(t,["token_count"]);return o!=null&&r(e,["tokenCount"],o),e}function ms(i,t){const e={},n=s(t,["values"]);n!=null&&r(e,["values"],n);const o=s(t,["statistics"]);return o!=null&&r(e,["statistics"],gs(i,o)),e}function ys(i,t){const e={},n=s(t,["billableCharacterCount"]);return n!=null&&r(e,["billableCharacterCount"],n),e}function vs(i,t){const e={},n=s(t,["predictions[]","embeddings"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>ms(i,l))),r(e,["embeddings"],a)}const o=s(t,["metadata"]);return o!=null&&r(e,["metadata"],ys(i,o)),e}function Cs(i,t){const e={},n=s(t,["gcsUri"]);n!=null&&r(e,["gcsUri"],n);const o=s(t,["bytesBase64Encoded"]);o!=null&&r(e,["imageBytes"],V(i,o));const a=s(t,["mimeType"]);return a!=null&&r(e,["mimeType"],a),e}function Dt(i,t){const e={},n=s(t,["safetyAttributes","categories"]);n!=null&&r(e,["categories"],n);const o=s(t,["safetyAttributes","scores"]);o!=null&&r(e,["scores"],o);const a=s(t,["contentType"]);return a!=null&&r(e,["contentType"],a),e}function Ts(i,t){const e={},n=s(t,["_self"]);n!=null&&r(e,["image"],Cs(i,n));const o=s(t,["raiFilteredReason"]);o!=null&&r(e,["raiFilteredReason"],o);const a=s(t,["_self"]);a!=null&&r(e,["safetyAttributes"],Dt(i,a));const l=s(t,["prompt"]);return l!=null&&r(e,["enhancedPrompt"],l),e}function ws(i,t){const e={},n=s(t,["predictions"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Ts(i,l))),r(e,["generatedImages"],a)}const o=s(t,["positivePromptSafetyAttributes"]);return o!=null&&r(e,["positivePromptSafetyAttributes"],Dt(i,o)),e}function Es(i,t){const e={},n=s(t,["endpoint"]);n!=null&&r(e,["name"],n);const o=s(t,["deployedModelId"]);return o!=null&&r(e,["deployedModelId"],o),e}function Ss(i,t){const e={},n=s(t,["labels","google-vertex-llm-tuning-base-model-id"]);n!=null&&r(e,["baseModel"],n);const o=s(t,["createTime"]);o!=null&&r(e,["createTime"],o);const a=s(t,["updateTime"]);return a!=null&&r(e,["updateTime"],a),e}function ft(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["displayName"]);o!=null&&r(e,["displayName"],o);const a=s(t,["description"]);a!=null&&r(e,["description"],a);const l=s(t,["versionId"]);l!=null&&r(e,["version"],l);const d=s(t,["deployedModels"]);if(d!=null){let p=d;Array.isArray(p)&&(p=p.map(f=>Es(i,f))),r(e,["endpoints"],p)}const u=s(t,["labels"]);u!=null&&r(e,["labels"],u);const c=s(t,["_self"]);return c!=null&&r(e,["tunedModelInfo"],Ss(i,c)),e}function bs(){return{}}function Is(i,t){const e={},n=s(t,["totalTokens"]);return n!=null&&r(e,["totalTokens"],n),e}function xs(i,t){const e={},n=s(t,["tokensInfo"]);return n!=null&&r(e,["tokensInfo"],n),e}function As(i,t){const e={},n=s(t,["gcsUri"]);n!=null&&r(e,["uri"],n);const o=s(t,["bytesBase64Encoded"]);o!=null&&r(e,["videoBytes"],V(i,o));const a=s(t,["mimeType"]);return a!=null&&r(e,["mimeType"],a),e}function _s(i,t){const e={},n=s(t,["_self"]);return n!=null&&r(e,["video"],As(i,n)),e}function Rs(i,t){const e={},n=s(t,["videos"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(d=>_s(i,d))),r(e,["generatedVideos"],l)}const o=s(t,["raiMediaFilteredCount"]);o!=null&&r(e,["raiMediaFilteredCount"],o);const a=s(t,["raiMediaFilteredReasons"]);return a!=null&&r(e,["raiMediaFilteredReasons"],a),e}function ks(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["metadata"]);o!=null&&r(e,["metadata"],o);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);l!=null&&r(e,["error"],l);const d=s(t,["response"]);return d!=null&&r(e,["response"],Rs(i,d)),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ms="FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";async function Ps(i,t,e){let n,o;e.data instanceof Blob?o=JSON.parse(await e.data.text()):o=JSON.parse(e.data),i.isVertexAI()?n=Yi(i,o):n=Oi(i,o),t(n)}class Ds{constructor(t,e,n){this.apiClient=t,this.auth=e,this.webSocketFactory=n}async connect(t){var e,n,o,a;const l=this.apiClient.getWebsocketBaseUrl(),d=this.apiClient.getApiVersion();let u;const c=qs(this.apiClient.getDefaultHeaders());if(this.apiClient.isVertexAI())u=`${l}/ws/google.cloud.aiplatform.${d}.LlmBidiService/BidiGenerateContent`,await this.auth.addAuthHeaders(c);else{const T=this.apiClient.getApiKey();u=`${l}/ws/google.ai.generativelanguage.${d}.GenerativeService.BidiGenerateContent?key=${T}`}let p=()=>{};const f=new Promise(T=>{p=T}),g=t.callbacks,m=function(){var T;(T=g==null?void 0:g.onopen)===null||T===void 0||T.call(g),p({})},h=this.apiClient,y={onopen:m,onmessage:T=>{Ps(h,g.onmessage,T)},onerror:(e=g==null?void 0:g.onerror)!==null&&e!==void 0?e:function(T){},onclose:(n=g==null?void 0:g.onclose)!==null&&n!==void 0?n:function(T){}},v=this.webSocketFactory.create(u,Fs(c),y);v.connect(),await f;let C=x(this.apiClient,t.model);if(this.apiClient.isVertexAI()&&C.startsWith("publishers/")){const T=this.apiClient.getProject(),b=this.apiClient.getLocation();C=`projects/${T}/locations/${b}/`+C}let w={};this.apiClient.isVertexAI()&&((o=t.config)===null||o===void 0?void 0:o.responseModalities)===void 0&&(t.config===void 0?t.config={responseModalities:[te.AUDIO]}:t.config.responseModalities=[te.AUDIO]),!((a=t.config)===null||a===void 0)&&a.generationConfig&&console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");const E={model:C,config:t.config,callbacks:t.callbacks};return this.apiClient.isVertexAI()?w=Ci(this.apiClient,E):w=vi(this.apiClient,E),delete w.config,v.send(JSON.stringify(w)),new Ls(v,this.apiClient)}}const Ns={turnComplete:!0};class Ls{constructor(t,e){this.conn=t,this.apiClient=e}tLiveClientContent(t,e){if(e.turns!==null&&e.turns!==void 0){let n=[];try{n=F(t,e.turns),t.isVertexAI()?n=n.map(o=>H(t,o)):n=n.map(o=>se(t,o))}catch{throw new Error(`Failed to parse client content "turns", type: '${typeof e.turns}'`)}return{clientContent:{turns:n,turnComplete:e.turnComplete}}}return{clientContent:{turnComplete:e.turnComplete}}}tLiveClienttToolResponse(t,e){let n=[];if(e.functionResponses==null)throw new Error("functionResponses is required.");if(Array.isArray(e.functionResponses)?n=e.functionResponses:n=[e.functionResponses],n.length===0)throw new Error("functionResponses is required.");for(const a of n){if(typeof a!="object"||a===null||!("name"in a)||!("response"in a))throw new Error(`Could not parse function response, type '${typeof a}'.`);if(!t.isVertexAI()&&!("id"in a))throw new Error(Ms)}return{toolResponse:{functionResponses:n}}}sendClientContent(t){t=Object.assign(Object.assign({},Ns),t);const e=this.tLiveClientContent(this.apiClient,t);this.conn.send(JSON.stringify(e))}sendRealtimeInput(t){let e={};this.apiClient.isVertexAI()?e={realtimeInput:Ii(this.apiClient,t)}:e={realtimeInput:bi(this.apiClient,t)},this.conn.send(JSON.stringify(e))}sendToolResponse(t){if(t.functionResponses==null)throw new Error("Tool response parameters are required.");const e=this.tLiveClienttToolResponse(this.apiClient,t);this.conn.send(JSON.stringify(e))}close(){this.conn.close()}}function Fs(i){const t={};return i.forEach((e,n)=>{t[n]=e}),t}function qs(i){const t=new Headers;for(const[e,n]of Object.entries(i))t.append(e,n);return t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Vs extends J{constructor(t){super(),this.apiClient=t,this.generateContent=async e=>await this.generateContentInternal(e),this.generateContentStream=async e=>await this.generateContentStreamInternal(e),this.generateImages=async e=>await this.generateImagesInternal(e).then(n=>{var o;let a;const l=[];if(n!=null&&n.generatedImages)for(const u of n.generatedImages)u&&(u!=null&&u.safetyAttributes)&&((o=u==null?void 0:u.safetyAttributes)===null||o===void 0?void 0:o.contentType)==="Positive Prompt"?a=u==null?void 0:u.safetyAttributes:l.push(u);let d;return a?d={generatedImages:l,positivePromptSafetyAttributes:a}:d={generatedImages:l},d})}async generateContentInternal(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=dt(this.apiClient,t);return d=S("{model}:generateContent",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=pt(this.apiClient,p),g=new K;return Object.assign(g,f),g})}else{const c=lt(this.apiClient,t);return d=S("{model}:generateContent",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>{const f=ct(this.apiClient,p),g=new K;return Object.assign(g,f),g})}}async generateContentStreamInternal(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=dt(this.apiClient,t);d=S("{model}:streamGenerateContent?alt=sse",c._url),u=c._query,delete c.config,delete c._url,delete c._query;const p=this.apiClient;return l=p.requestStream({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}),l.then(function(f){return ne(this,arguments,function*(){var g,m,h,y;try{for(var v=!0,C=ce(f),w;w=yield R(C.next()),g=w.done,!g;v=!0){y=w.value,v=!1;const T=pt(p,yield R(y.json())),b=new K;Object.assign(b,T),yield yield R(b)}}catch(E){m={error:E}}finally{try{!v&&!g&&(h=C.return)&&(yield R(h.call(C)))}finally{if(m)throw m.error}}})})}else{const c=lt(this.apiClient,t);d=S("{model}:streamGenerateContent?alt=sse",c._url),u=c._query,delete c.config,delete c._url,delete c._query;const p=this.apiClient;return l=p.requestStream({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}),l.then(function(f){return ne(this,arguments,function*(){var g,m,h,y;try{for(var v=!0,C=ce(f),w;w=yield R(C.next()),g=w.done,!g;v=!0){y=w.value,v=!1;const T=ct(p,yield R(y.json())),b=new K;Object.assign(b,T),yield yield R(b)}}catch(E){m={error:E}}finally{try{!v&&!g&&(h=C.return)&&(yield R(h.call(C)))}finally{if(m)throw m.error}}})})}}async embedContent(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=Lo(this.apiClient,t);return d=S("{model}:predict",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=vs(this.apiClient,p),g=new Xe;return Object.assign(g,f),g})}else{const c=lo(this.apiClient,t);return d=S("{model}:batchEmbedContents",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>{const f=es(this.apiClient,p),g=new Xe;return Object.assign(g,f),g})}}async generateImagesInternal(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=qo(this.apiClient,t);return d=S("{model}:predict",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=ws(this.apiClient,p),g=new Ze;return Object.assign(g,f),g})}else{const c=uo(this.apiClient,t);return d=S("{model}:predict",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>{const f=is(this.apiClient,p),g=new Ze;return Object.assign(g,f),g})}}async get(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=Vo(this.apiClient,t);return d=S("{name}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>ft(this.apiClient,p))}else{const c=po(this.apiClient,t);return d=S("{name}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>ut(this.apiClient,p))}}async update(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=Bo(this.apiClient,t);return d=S("{model}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"PATCH",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>ft(this.apiClient,p))}else{const c=ho(this.apiClient,t);return d=S("{name}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"PATCH",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>ut(this.apiClient,p))}}async delete(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=Go(this.apiClient,t);return d=S("{name}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"DELETE",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(()=>{const p=bs(),f=new je;return Object.assign(f,p),f})}else{const c=go(this.apiClient,t);return d=S("{name}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"DELETE",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(()=>{const p=ss(),f=new je;return Object.assign(f,p),f})}}async countTokens(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=$o(this.apiClient,t);return d=S("{model}:countTokens",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Is(this.apiClient,p),g=new et;return Object.assign(g,f),g})}else{const c=yo(this.apiClient,t);return d=S("{model}:countTokens",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>{const f=rs(this.apiClient,p),g=new et;return Object.assign(g,f),g})}}async computeTokens(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI()){const d=zo(this.apiClient,t);return a=S("{model}:computeTokens",d._url),l=d._query,delete d.config,delete d._url,delete d._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(u=>{const c=xs(this.apiClient,u),p=new In;return Object.assign(p,c),p})}else throw new Error("This method is only supported by the Vertex AI.")}async generateVideos(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=Yo(this.apiClient,t);return d=S("{model}:predictLongRunning",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>ks(this.apiClient,p))}else{const c=To(this.apiClient,t);return d=S("{model}:predictLongRunning",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>cs(this.apiClient,p))}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Us(i,t){const e={},n=s(t,["operationName"]);n!=null&&r(e,["_url","operationName"],n);const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function Bs(i,t){const e={},n=s(t,["operationName"]);n!=null&&r(e,["_url","operationName"],n);const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function Gs(i,t){const e={},n=s(t,["operationName"]);n!=null&&r(e,["operationName"],n);const o=s(t,["resourceName"]);o!=null&&r(e,["_url","resourceName"],o);const a=s(t,["config"]);return a!=null&&r(e,["config"],a),e}function Hs(i,t){const e={},n=s(t,["video","uri"]);n!=null&&r(e,["uri"],n);const o=s(t,["video","encodedVideo"]);o!=null&&r(e,["videoBytes"],V(i,o));const a=s(t,["encoding"]);return a!=null&&r(e,["mimeType"],a),e}function $s(i,t){const e={},n=s(t,["_self"]);return n!=null&&r(e,["video"],Hs(i,n)),e}function zs(i,t){const e={},n=s(t,["generatedSamples"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(d=>$s(i,d))),r(e,["generatedVideos"],l)}const o=s(t,["raiMediaFilteredCount"]);o!=null&&r(e,["raiMediaFilteredCount"],o);const a=s(t,["raiMediaFilteredReasons"]);return a!=null&&r(e,["raiMediaFilteredReasons"],a),e}function Ws(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["metadata"]);o!=null&&r(e,["metadata"],o);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);l!=null&&r(e,["error"],l);const d=s(t,["response","generateVideoResponse"]);return d!=null&&r(e,["response"],zs(i,d)),e}function Os(i,t){const e={},n=s(t,["gcsUri"]);n!=null&&r(e,["uri"],n);const o=s(t,["bytesBase64Encoded"]);o!=null&&r(e,["videoBytes"],V(i,o));const a=s(t,["mimeType"]);return a!=null&&r(e,["mimeType"],a),e}function Ys(i,t){const e={},n=s(t,["_self"]);return n!=null&&r(e,["video"],Os(i,n)),e}function Js(i,t){const e={},n=s(t,["videos"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(d=>Ys(i,d))),r(e,["generatedVideos"],l)}const o=s(t,["raiMediaFilteredCount"]);o!=null&&r(e,["raiMediaFilteredCount"],o);const a=s(t,["raiMediaFilteredReasons"]);return a!=null&&r(e,["raiMediaFilteredReasons"],a),e}function ht(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["metadata"]);o!=null&&r(e,["metadata"],o);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);l!=null&&r(e,["error"],l);const d=s(t,["response"]);return d!=null&&r(e,["response"],Js(i,d)),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ks extends J{constructor(t){super(),this.apiClient=t}async getVideosOperation(t){const e=t.operation,n=t.config;if(e.name===void 0||e.name==="")throw new Error("Operation name is required.");if(this.apiClient.isVertexAI()){const o=e.name.split("/operations/")[0];let a;return n&&"httpOptions"in n&&(a=n.httpOptions),this.fetchPredictVideosOperationInternal({operationName:e.name,resourceName:o,config:{httpOptions:a}})}else return this.getVideosOperationInternal({operationName:e.name,config:n})}async getVideosOperationInternal(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=Bs(this.apiClient,t);return d=S("{operationName}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>ht(this.apiClient,p))}else{const c=Us(this.apiClient,t);return d=S("{operationName}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>Ws(this.apiClient,p))}}async fetchPredictVideosOperationInternal(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI()){const d=Gs(this.apiClient,t);return a=S("{resourceName}:fetchPredictOperation",d._url),l=d._query,delete d.config,delete d._url,delete d._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(u=>ht(this.apiClient,u))}else throw new Error("This method is only supported by the Vertex AI.")}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Qs="Content-Type",Xs="X-Server-Timeout",Zs="User-Agent",js="x-goog-api-client",er="0.12.0",tr=`google-genai-sdk/${er}`,nr="v1beta1",ir="v1beta",gt=/^data: (.*)(?:\n\n|\r\r|\r\n\r\n)/;class Nt extends Error{constructor(t,e){e?super(t,{cause:e}):super(t,{cause:new Error().stack}),this.message=t,this.name="ClientError"}}class pe extends Error{constructor(t,e){e?super(t,{cause:e}):super(t,{cause:new Error().stack}),this.message=t,this.name="ServerError"}}class or{constructor(t){var e,n;this.clientOptions=Object.assign(Object.assign({},t),{project:t.project,location:t.location,apiKey:t.apiKey,vertexai:t.vertexai});const o={};this.clientOptions.vertexai?(o.apiVersion=(e=this.clientOptions.apiVersion)!==null&&e!==void 0?e:nr,this.getProject()||this.getLocation()?(o.baseUrl=`https://${this.clientOptions.location}-aiplatform.googleapis.com/`,this.clientOptions.apiKey=void 0):(o.baseUrl="https://aiplatform.googleapis.com/",this.clientOptions.project=void 0,this.clientOptions.location=void 0)):(o.apiVersion=(n=this.clientOptions.apiVersion)!==null&&n!==void 0?n:ir,o.baseUrl="https://generativelanguage.googleapis.com/"),o.headers=this.getDefaultHeaders(),this.clientOptions.httpOptions=o,t.httpOptions&&(this.clientOptions.httpOptions=this.patchHttpOptions(o,t.httpOptions))}isVertexAI(){var t;return(t=this.clientOptions.vertexai)!==null&&t!==void 0?t:!1}getProject(){return this.clientOptions.project}getLocation(){return this.clientOptions.location}getApiVersion(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.apiVersion!==void 0)return this.clientOptions.httpOptions.apiVersion;throw new Error("API version is not set.")}getBaseUrl(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.baseUrl!==void 0)return this.clientOptions.httpOptions.baseUrl;throw new Error("Base URL is not set.")}getRequestUrl(){return this.getRequestUrlInternal(this.clientOptions.httpOptions)}getHeaders(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.headers!==void 0)return this.clientOptions.httpOptions.headers;throw new Error("Headers are not set.")}getRequestUrlInternal(t){if(!t||t.baseUrl===void 0||t.apiVersion===void 0)throw new Error("HTTP options are not correctly set.");const n=[t.baseUrl.endsWith("/")?t.baseUrl.slice(0,-1):t.baseUrl];return t.apiVersion&&t.apiVersion!==""&&n.push(t.apiVersion),n.join("/")}getBaseResourcePath(){return`projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`}getApiKey(){return this.clientOptions.apiKey}getWebsocketBaseUrl(){const t=this.getBaseUrl(),e=new URL(t);return e.protocol=e.protocol=="http:"?"ws":"wss",e.toString()}setBaseUrl(t){if(this.clientOptions.httpOptions)this.clientOptions.httpOptions.baseUrl=t;else throw new Error("HTTP options are not correctly set.")}constructUrl(t,e,n){const o=[this.getRequestUrlInternal(e)];return n&&o.push(this.getBaseResourcePath()),t!==""&&o.push(t),new URL(`${o.join("/")}`)}shouldPrependVertexProjectPath(t){return!(this.clientOptions.apiKey||!this.clientOptions.vertexai||t.path.startsWith("projects/")||t.httpMethod==="GET"&&t.path.startsWith("publishers/google/models"))}async request(t){let e=this.clientOptions.httpOptions;t.httpOptions&&(e=this.patchHttpOptions(this.clientOptions.httpOptions,t.httpOptions));const n=this.shouldPrependVertexProjectPath(t),o=this.constructUrl(t.path,e,n);if(t.queryParams)for(const[l,d]of Object.entries(t.queryParams))o.searchParams.append(l,String(d));let a={};if(t.httpMethod==="GET"){if(t.body&&t.body!=="{}")throw new Error("Request body should be empty for GET request, but got non empty request body")}else a.body=t.body;return a=await this.includeExtraHttpOptionsToRequestInit(a,e,t.abortSignal),this.unaryApiCall(o,a,t.httpMethod)}patchHttpOptions(t,e){const n=JSON.parse(JSON.stringify(t));for(const[o,a]of Object.entries(e))typeof a=="object"?n[o]=Object.assign(Object.assign({},n[o]),a):a!==void 0&&(n[o]=a);return n}async requestStream(t){let e=this.clientOptions.httpOptions;t.httpOptions&&(e=this.patchHttpOptions(this.clientOptions.httpOptions,t.httpOptions));const n=this.shouldPrependVertexProjectPath(t),o=this.constructUrl(t.path,e,n);(!o.searchParams.has("alt")||o.searchParams.get("alt")!=="sse")&&o.searchParams.set("alt","sse");let a={};return a.body=t.body,a=await this.includeExtraHttpOptionsToRequestInit(a,e,t.abortSignal),this.streamApiCall(o,a,t.httpMethod)}async includeExtraHttpOptionsToRequestInit(t,e,n){if(e&&e.timeout||n){const o=new AbortController,a=o.signal;e.timeout&&(e==null?void 0:e.timeout)>0&&setTimeout(()=>o.abort(),e.timeout),n&&n.addEventListener("abort",()=>{o.abort()}),t.signal=a}return t.headers=await this.getHeadersInternal(e),t}async unaryApiCall(t,e,n){return this.apiCall(t.toString(),Object.assign(Object.assign({},e),{method:n})).then(async o=>(await mt(o),new de(o))).catch(o=>{throw o instanceof Error?o:new Error(JSON.stringify(o))})}async streamApiCall(t,e,n){return this.apiCall(t.toString(),Object.assign(Object.assign({},e),{method:n})).then(async o=>(await mt(o),this.processStreamResponse(o))).catch(o=>{throw o instanceof Error?o:new Error(JSON.stringify(o))})}processStreamResponse(t){var e;return ne(this,arguments,function*(){const o=(e=t==null?void 0:t.body)===null||e===void 0?void 0:e.getReader(),a=new TextDecoder("utf-8");if(!o)throw new Error("Response body is empty");try{let l="";for(;;){const{done:d,value:u}=yield R(o.read());if(d){if(l.trim().length>0)throw new Error("Incomplete JSON segment at the end");break}const c=a.decode(u);try{const f=JSON.parse(c);if("error"in f){const g=JSON.parse(JSON.stringify(f.error)),m=g.status,h=g.code,y=`got status: ${m}. ${JSON.stringify(f)}`;if(h>=400&&h<500)throw new Nt(y);if(h>=500&&h<600)throw new pe(y)}}catch(f){const g=f;if(g.name==="ClientError"||g.name==="ServerError")throw f}l+=c;let p=l.match(gt);for(;p;){const f=p[1];try{const g=new Response(f,{headers:t==null?void 0:t.headers,status:t==null?void 0:t.status,statusText:t==null?void 0:t.statusText});yield yield R(new de(g)),l=l.slice(p[0].length),p=l.match(gt)}catch(g){throw new Error(`exception parsing stream chunk ${f}. ${g}`)}}}}finally{o.releaseLock()}})}async apiCall(t,e){return fetch(t,e).catch(n=>{throw new Error(`exception ${n} sending request`)})}getDefaultHeaders(){const t={},e=tr+" "+this.clientOptions.userAgentExtra;return t[Zs]=e,t[js]=e,t[Qs]="application/json",t}async getHeadersInternal(t){const e=new Headers;if(t&&t.headers){for(const[n,o]of Object.entries(t.headers))e.append(n,o);t.timeout&&t.timeout>0&&e.append(Xs,String(Math.ceil(t.timeout/1e3)))}return await this.clientOptions.auth.addAuthHeaders(e),e}async uploadFile(t,e){var n;const o={};e!=null&&(o.mimeType=e.mimeType,o.name=e.name,o.displayName=e.displayName),o.name&&!o.name.startsWith("files/")&&(o.name=`files/${o.name}`);const a=this.clientOptions.uploader,l=await a.stat(t);o.sizeBytes=String(l.size);const d=(n=e==null?void 0:e.mimeType)!==null&&n!==void 0?n:l.type;if(d===void 0||d==="")throw new Error("Can not determine mimeType. Please provide mimeType in the config.");o.mimeType=d;const u=await this.fetchUploadUrl(o,e);return a.upload(t,u,this)}async fetchUploadUrl(t,e){var n;let o={};e!=null&&e.httpOptions?o=e.httpOptions:o={apiVersion:"",headers:{"Content-Type":"application/json","X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${t.sizeBytes}`,"X-Goog-Upload-Header-Content-Type":`${t.mimeType}`}};const a={file:t},l=await this.request({path:S("upload/v1beta/files",a._url),body:JSON.stringify(a),httpMethod:"POST",httpOptions:o});if(!l||!(l!=null&&l.headers))throw new Error("Server did not return an HttpResponse or the returned HttpResponse did not have headers.");const d=(n=l==null?void 0:l.headers)===null||n===void 0?void 0:n["x-goog-upload-url"];if(d===void 0)throw new Error("Failed to get upload url. Server did not return the x-google-upload-url in the headers");return d}}async function mt(i){var t;if(i===void 0)throw new pe("response is undefined");if(!i.ok){const e=i.status,n=i.statusText;let o;!((t=i.headers.get("content-type"))===null||t===void 0)&&t.includes("application/json")?o=await i.json():o={error:{message:await i.text(),code:i.status,status:i.statusText}};const a=`got status: ${e} ${n}. ${JSON.stringify(o)}`;throw e>=400&&e<500?new Nt(a):e>=500&&e<600?new pe(a):new Error(a)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function sr(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],n);const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function rr(i,t,e){const n={},o=s(t,["pageSize"]);e!==void 0&&o!=null&&r(e,["_query","pageSize"],o);const a=s(t,["pageToken"]);e!==void 0&&a!=null&&r(e,["_query","pageToken"],a);const l=s(t,["filter"]);return e!==void 0&&l!=null&&r(e,["_query","filter"],l),n}function ar(i,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],rr(i,n,e)),e}function lr(i,t){const e={},n=s(t,["textInput"]);n!=null&&r(e,["textInput"],n);const o=s(t,["output"]);return o!=null&&r(e,["output"],o),e}function dr(i,t){const e={};if(s(t,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");const n=s(t,["examples"]);if(n!=null){let o=n;Array.isArray(o)&&(o=o.map(a=>lr(i,a))),r(e,["examples","examples"],o)}return e}function cr(i,t,e){const n={};if(s(t,["validationDataset"])!==void 0)throw new Error("validationDataset parameter is not supported in Gemini API.");const o=s(t,["tunedModelDisplayName"]);if(e!==void 0&&o!=null&&r(e,["displayName"],o),s(t,["description"])!==void 0)throw new Error("description parameter is not supported in Gemini API.");const a=s(t,["epochCount"]);e!==void 0&&a!=null&&r(e,["tuningTask","hyperparameters","epochCount"],a);const l=s(t,["learningRateMultiplier"]);if(l!=null&&r(n,["tuningTask","hyperparameters","learningRateMultiplier"],l),s(t,["adapterSize"])!==void 0)throw new Error("adapterSize parameter is not supported in Gemini API.");const d=s(t,["batchSize"]);e!==void 0&&d!=null&&r(e,["tuningTask","hyperparameters","batchSize"],d);const u=s(t,["learningRate"]);return e!==void 0&&u!=null&&r(e,["tuningTask","hyperparameters","learningRate"],u),n}function ur(i,t){const e={},n=s(t,["baseModel"]);n!=null&&r(e,["baseModel"],n);const o=s(t,["trainingDataset"]);o!=null&&r(e,["tuningTask","trainingData"],dr(i,o));const a=s(t,["config"]);return a!=null&&r(e,["config"],cr(i,a,e)),e}function pr(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],n);const o=s(t,["config"]);return o!=null&&r(e,["config"],o),e}function fr(i,t,e){const n={},o=s(t,["pageSize"]);e!==void 0&&o!=null&&r(e,["_query","pageSize"],o);const a=s(t,["pageToken"]);e!==void 0&&a!=null&&r(e,["_query","pageToken"],a);const l=s(t,["filter"]);return e!==void 0&&l!=null&&r(e,["_query","filter"],l),n}function hr(i,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],fr(i,n,e)),e}function gr(i,t,e){const n={},o=s(t,["gcsUri"]);if(e!==void 0&&o!=null&&r(e,["supervisedTuningSpec","trainingDatasetUri"],o),s(t,["examples"])!==void 0)throw new Error("examples parameter is not supported in Vertex AI.");return n}function mr(i,t){const e={},n=s(t,["gcsUri"]);return n!=null&&r(e,["validationDatasetUri"],n),e}function yr(i,t,e){const n={},o=s(t,["validationDataset"]);e!==void 0&&o!=null&&r(e,["supervisedTuningSpec"],mr(i,o));const a=s(t,["tunedModelDisplayName"]);e!==void 0&&a!=null&&r(e,["tunedModelDisplayName"],a);const l=s(t,["description"]);e!==void 0&&l!=null&&r(e,["description"],l);const d=s(t,["epochCount"]);e!==void 0&&d!=null&&r(e,["supervisedTuningSpec","hyperParameters","epochCount"],d);const u=s(t,["learningRateMultiplier"]);e!==void 0&&u!=null&&r(e,["supervisedTuningSpec","hyperParameters","learningRateMultiplier"],u);const c=s(t,["adapterSize"]);if(e!==void 0&&c!=null&&r(e,["supervisedTuningSpec","hyperParameters","adapterSize"],c),s(t,["batchSize"])!==void 0)throw new Error("batchSize parameter is not supported in Vertex AI.");if(s(t,["learningRate"])!==void 0)throw new Error("learningRate parameter is not supported in Vertex AI.");return n}function vr(i,t){const e={},n=s(t,["baseModel"]);n!=null&&r(e,["baseModel"],n);const o=s(t,["trainingDataset"]);o!=null&&r(e,["supervisedTuningSpec","trainingDatasetUri"],gr(i,o,e));const a=s(t,["config"]);return a!=null&&r(e,["config"],yr(i,a,e)),e}function Cr(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["model"],n);const o=s(t,["name"]);return o!=null&&r(e,["endpoint"],o),e}function Lt(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["state"]);o!=null&&r(e,["state"],_t(i,o));const a=s(t,["createTime"]);a!=null&&r(e,["createTime"],a);const l=s(t,["tuningTask","startTime"]);l!=null&&r(e,["startTime"],l);const d=s(t,["tuningTask","completeTime"]);d!=null&&r(e,["endTime"],d);const u=s(t,["updateTime"]);u!=null&&r(e,["updateTime"],u);const c=s(t,["description"]);c!=null&&r(e,["description"],c);const p=s(t,["baseModel"]);p!=null&&r(e,["baseModel"],p);const f=s(t,["_self"]);f!=null&&r(e,["tunedModel"],Cr(i,f));const g=s(t,["distillationSpec"]);g!=null&&r(e,["distillationSpec"],g);const m=s(t,["experiment"]);m!=null&&r(e,["experiment"],m);const h=s(t,["labels"]);h!=null&&r(e,["labels"],h);const y=s(t,["pipelineJob"]);y!=null&&r(e,["pipelineJob"],y);const v=s(t,["tunedModelDisplayName"]);return v!=null&&r(e,["tunedModelDisplayName"],v),e}function Tr(i,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const o=s(t,["tunedModels"]);if(o!=null){let a=o;Array.isArray(a)&&(a=a.map(l=>Lt(i,l))),r(e,["tuningJobs"],a)}return e}function wr(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["metadata"]);o!=null&&r(e,["metadata"],o);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);return l!=null&&r(e,["error"],l),e}function Er(i,t){const e={},n=s(t,["model"]);n!=null&&r(e,["model"],n);const o=s(t,["endpoint"]);return o!=null&&r(e,["endpoint"],o),e}function fe(i,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const o=s(t,["state"]);o!=null&&r(e,["state"],_t(i,o));const a=s(t,["createTime"]);a!=null&&r(e,["createTime"],a);const l=s(t,["startTime"]);l!=null&&r(e,["startTime"],l);const d=s(t,["endTime"]);d!=null&&r(e,["endTime"],d);const u=s(t,["updateTime"]);u!=null&&r(e,["updateTime"],u);const c=s(t,["error"]);c!=null&&r(e,["error"],c);const p=s(t,["description"]);p!=null&&r(e,["description"],p);const f=s(t,["baseModel"]);f!=null&&r(e,["baseModel"],f);const g=s(t,["tunedModel"]);g!=null&&r(e,["tunedModel"],Er(i,g));const m=s(t,["supervisedTuningSpec"]);m!=null&&r(e,["supervisedTuningSpec"],m);const h=s(t,["tuningDataStats"]);h!=null&&r(e,["tuningDataStats"],h);const y=s(t,["encryptionSpec"]);y!=null&&r(e,["encryptionSpec"],y);const v=s(t,["partnerModelTuningSpec"]);v!=null&&r(e,["partnerModelTuningSpec"],v);const C=s(t,["distillationSpec"]);C!=null&&r(e,["distillationSpec"],C);const w=s(t,["experiment"]);w!=null&&r(e,["experiment"],w);const E=s(t,["labels"]);E!=null&&r(e,["labels"],E);const T=s(t,["pipelineJob"]);T!=null&&r(e,["pipelineJob"],T);const b=s(t,["tunedModelDisplayName"]);return b!=null&&r(e,["tunedModelDisplayName"],b),e}function Sr(i,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const o=s(t,["tuningJobs"]);if(o!=null){let a=o;Array.isArray(a)&&(a=a.map(l=>fe(i,l))),r(e,["tuningJobs"],a)}return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class br extends J{constructor(t){super(),this.apiClient=t,this.get=async e=>await this.getInternal(e),this.list=async(e={})=>new he(Y.PAGED_ITEM_TUNING_JOBS,n=>this.listInternal(n),await this.listInternal(e),e),this.tune=async e=>{if(this.apiClient.isVertexAI())return await this.tuneInternal(e);{const n=await this.tuneMldevInternal(e);let o="";return n.metadata!==void 0&&n.metadata.tunedModel!==void 0?o=n.metadata.tunedModel:n.name!==void 0&&n.name.includes("/operations/")&&(o=n.name.split("/operations/")[0]),{name:o,state:le.JOB_STATE_QUEUED}}}}async getInternal(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=pr(this.apiClient,t);return d=S("{name}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>fe(this.apiClient,p))}else{const c=sr(this.apiClient,t);return d=S("{name}",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>Lt(this.apiClient,p))}}async listInternal(t){var e,n,o,a;let l,d="",u={};if(this.apiClient.isVertexAI()){const c=hr(this.apiClient,t);return d=S("tuningJobs",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Sr(this.apiClient,p),g=new tt;return Object.assign(g,f),g})}else{const c=ar(this.apiClient,t);return d=S("tunedModels",c._url),u=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:d,queryParams:u,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(o=t.config)===null||o===void 0?void 0:o.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Tr(this.apiClient,p),g=new tt;return Object.assign(g,f),g})}}async tuneInternal(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI()){const d=vr(this.apiClient,t);return a=S("tuningJobs",d._url),l=d._query,delete d.config,delete d._url,delete d._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(u=>fe(this.apiClient,u))}else throw new Error("This method is only supported by the Vertex AI.")}async tuneMldevInternal(t){var e,n;let o,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const d=ur(this.apiClient,t);return a=S("tunedModels",d._url),l=d._query,delete d.config,delete d._url,delete d._query,o=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),o.then(u=>wr(this.apiClient,u))}}}const Ir=1024*1024*8;async function xr(i,t,e){var n,o;let a=0,l=0,d=new de(new Response),u="upload";for(a=i.size;l<a;){const p=Math.min(Ir,a-l),f=i.slice(l,l+p);if(l+p>=a&&(u+=", finalize"),d=await e.request({path:"",body:f,httpMethod:"POST",httpOptions:{apiVersion:"",baseUrl:t,headers:{"X-Goog-Upload-Command":u,"X-Goog-Upload-Offset":String(l),"Content-Length":String(p)}}}),l+=p,((n=d==null?void 0:d.headers)===null||n===void 0?void 0:n["x-goog-upload-status"])!=="active")break;if(a<=l)throw new Error("All content has been uploaded, but the upload status is not finalized.")}const c=await(d==null?void 0:d.json());if(((o=d==null?void 0:d.headers)===null||o===void 0?void 0:o["x-goog-upload-status"])!=="final")throw new Error("Failed to upload file: Upload status is not finalized.");return c.file}async function Ar(i){return{size:i.size,type:i.type}}class _r{async upload(t,e,n){if(typeof t=="string")throw new Error("File path is not supported in browser uploader.");return await xr(t,e,n)}async stat(t){if(typeof t=="string")throw new Error("File path is not supported in browser uploader.");return await Ar(t)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Rr{create(t,e,n){return new kr(t,e,n)}}class kr{constructor(t,e,n){this.url=t,this.headers=e,this.callbacks=n}connect(){this.ws=new WebSocket(this.url),this.ws.onopen=this.callbacks.onopen,this.ws.onerror=this.callbacks.onerror,this.ws.onclose=this.callbacks.onclose,this.ws.onmessage=this.callbacks.onmessage}send(t){if(this.ws===void 0)throw new Error("WebSocket is not connected");this.ws.send(t)}close(){if(this.ws===void 0)throw new Error("WebSocket is not connected");this.ws.close()}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const yt="x-goog-api-key";class Mr{constructor(t){this.apiKey=t}async addAuthHeaders(t){t.get(yt)===null&&t.append(yt,this.apiKey)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Pr="gl-node/";class Dr{constructor(t){var e;if(t.apiKey==null)throw new Error("An API Key must be set when running in a browser");if(t.project||t.location)throw new Error("Vertex AI project based authentication is not supported on browser runtimes. Please do not provide a project or location.");this.vertexai=(e=t.vertexai)!==null&&e!==void 0?e:!1,this.apiKey=t.apiKey;const n=Bt(t,void 0,void 0);n&&(t.httpOptions?t.httpOptions.baseUrl=n:t.httpOptions={baseUrl:n}),this.apiVersion=t.apiVersion;const o=new Mr(this.apiKey);this.apiClient=new or({auth:o,apiVersion:this.apiVersion,apiKey:this.apiKey,vertexai:this.vertexai,httpOptions:t.httpOptions,userAgentExtra:Pr+"web",uploader:new _r}),this.models=new Vs(this.apiClient),this.live=new Ds(this.apiClient,o,new Rr),this.chats=new Dn(this.models,this.apiClient),this.caches=new Rn(this.apiClient),this.files=new On(this.apiClient),this.operations=new Ks(this.apiClient),this.tunings=new br(this.apiClient)}}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/const vt="AIzaSyALB2_8eh4kNA3hrpevwvDtgO6FnpkWU7s";let L=null;vt.trim()&&(L=new Dr({apiKey:vt}));const Ct={commitmentSigned:"roof-er.commitmentSigned"},z=document.getElementById("sidebar"),W=document.getElementById("main-content"),A={welcome:`
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
            <div id="scenario-progress" style="text-align: center; margin-bottom: 20px; font-weight: 500; color: #8b4fbe;"></div>
            <div style="background: #f8f4fc; border-left: 4px solid #8b4fbe; padding: 20px; margin-bottom: 20px; border-radius: 5px;">
                <h3 id="scenario-title" style="margin: 0 0 10px 0; color: #8b4fbe;">Scenario</h3>
                <p id="scenario-context" style="margin: 0 0 15px 0; color: #555;"></p>
                <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #e0d4f0;">
                    <strong style="color: #8b4fbe;"><span id="agnes-name">Agnes</span> says:</strong>
                    <p id="agnes-prompt" style="margin: 10px 0 0 0; font-style: italic;"></p>
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <label for="user-response" style="display: block; font-weight: 500; margin-bottom: 10px;">Your Response:</label>
                <textarea id="user-response" rows="6" style="width: 100%; padding: 15px; border: 2px solid #e0d4f0; border-radius: 5px; font-size: 16px; font-family: inherit;" placeholder="Type your response here..."></textarea>
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <button id="submit-response" style="flex: 1; padding: 15px 30px; background: #8b4fbe; color: white; border: none; border-radius: 5px; font-size: 16px; font-weight: 500; cursor: pointer;">Submit Response</button>
                <button id="voice-input-btn" style="padding: 15px 30px; background: #f8f4fc; color: #8b4fbe; border: 2px solid #8b4fbe; border-radius: 5px; font-size: 16px; cursor: pointer;">🎤 Voice Input</button>
                <button id="hint-btn" style="padding: 15px 30px; background: #f8f4fc; color: #8b4fbe; border: 2px solid #8b4fbe; border-radius: 5px; font-size: 16px; cursor: pointer;">💡 Hint</button>
            </div>

            <div id="hint-display" style="display: none; background: #fff9e6; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 20px; border-radius: 5px;"></div>
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
  `};A["general-knowledge"]=`
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
`;A["shingle-types-materials"]=A["shingle-types"]||`
  <div class="content-card"><h1>Shingle Types & Materials</h1><p>Content coming soon.</p></div>
`;A["handling-initial-pitch-objections"]=A["objection-handling"]||`
  <div class="content-card"><h1>Handling Initial Pitch Objections</h1><p>Content coming soon.</p></div>
`;A["post-inspection-objections"]=`
  <div class="content-card">
    <h1>Post‑Inspection Objections</h1>

    <h2>9 Common Post-Inspection Objections</h2>
    <div class="objections-grid">
      <div class="objection-card">
        <h3>1. "I need to get other estimates"</h3>
        <p><strong>Response:</strong> "That's smart! Here's what I recommend: Get those estimates, but know that insurance pays the same regardless of contractor. The difference is in service, speed, and warranty. We file the claim for you today - that starts your timeline. Other estimates can take weeks."</p>
        <p><strong>Why it works:</strong> Validates their concern while emphasizing our value-add and urgency.</p>
        <button class="practice-agnes-btn" data-scenario="m9-capstone-1">🎭 Practice with Agnes</button>
      </div>

      <div class="objection-card">
        <h3>2. "This seems expensive"</h3>
        <p><strong>Response:</strong> "I hear you! But remember - insurance covers this. Your only out-of-pocket is the deductible ($1,000-2,500 typically). A new $18,000 roof for $1,500? That's the best deal you'll ever get."</p>
        <p><strong>Why it works:</strong> Reframes the cost through the insurance lens.</p>
        <button class="practice-agnes-btn" data-scenario="m9-deductible-objection-close">🎭 Practice with Agnes</button>
      </div>

      <div class="objection-card">
        <h3>3. "I don't want to file a claim"</h3>
        <p><strong>Response:</strong> "I understand the concern about rates. But here's the reality: 1) This is what you pay insurance FOR. 2) Rates go up regardless - inflation, area risk. 3) Not filing means $20k out-of-pocket in 2 years when it leaks. Which would you rather pay?"</p>
        <p><strong>Why it works:</strong> Addresses fear directly with facts and reframes the alternative.</p>
        <button class="practice-agnes-btn" data-scenario="m9-claim-fear">🎭 Practice with Agnes</button>
      </div>

      <div class="objection-card">
        <h3>4. "My roof is fine"</h3>
        <p><strong>Response:</strong> "It looks fine from the ground! That's what I thought too. But look at these photos - [show granule loss, exposed mat, bruising]. This is like a cavity in a tooth - small now, major problem soon. We fix it now while insurance pays."</p>
        <p><strong>Why it works:</strong> Visual evidence + medical analogy makes it tangible.</p>
        <button class="practice-agnes-btn" data-scenario="m9-adjuster-pushback">🎭 Practice with Agnes</button>
      </div>

      <div class="objection-card">
        <h3>5. "I need to talk to my spouse"</h3>
        <p><strong>Response:</strong> "Absolutely! When can you both be available? I'm happy to come back tonight at 7pm to walk through the photos together. Or we can do a 3-way call right now - takes 5 minutes."</p>
        <p><strong>Why it works:</strong> Removes the delay while respecting the need for joint decision.</p>
        <button class="practice-agnes-btn" data-scenario="m9-spouse-decision">🎭 Practice with Agnes</button>
      </div>

      <div class="objection-card">
        <h3>6. "I'll just handle this myself"</h3>
        <p><strong>Response:</strong> "You absolutely can! But here's what most homeowners don't know: Insurance companies hire adjusters whose job is to minimize payouts. We're your advocate - we know what to look for, what codes require, and how to negotiate. Most DIY claims get 30-40% less coverage."</p>
        <p><strong>Why it works:</strong> Educates on the hidden challenge and value of professional representation.</p>
        <button class="practice-agnes-btn" data-scenario="m9-scope-walkthrough">🎭 Practice with Agnes</button>
      </div>

      <div class="objection-card">
        <h3>7. "I've never filed a claim before"</h3>
        <p><strong>Response:</strong> "Perfect - I'll walk you through every step. It's actually very simple: 1) We call together (3 minutes), 2) Adjuster comes out (I'll be here), 3) Approved, 4) We schedule install. I've done this 500+ times - you're in good hands."</p>
        <p><strong>Why it works:</strong> Simplifies the unknown and builds confidence.</p>
        <button class="practice-agnes-btn" data-scenario="m9-first-time-claim">🎭 Practice with Agnes</button>
      </div>

      <div class="objection-card">
        <h3>8. "What if my claim gets denied?"</h3>
        <p><strong>Response:</strong> "Great question. That's why we have a contingency agreement - if we don't get you fully approved, you owe us NOTHING. The contract is null and void. Zero risk to you."</p>
        <p><strong>Why it works:</strong> Removes financial risk completely.</p>
        <button class="practice-agnes-btn" data-scenario="m9-denial-fear">🎭 Practice with Agnes</button>
      </div>

      <div class="objection-card">
        <h3>9. "I'm going to wait and see if it gets worse"</h3>
        <p><strong>Response:</strong> "I understand the hesitation, but here's the problem: Insurance only covers storm damage within your policy's statute of limitations - usually 1-2 years. Wait too long, and you lose coverage entirely. Plus, every day UV light and weather degrade the damaged shingles more. File now while you're protected."</p>
        <p><strong>Why it works:</strong> Creates urgency with real consequences.</p>
        <button class="practice-agnes-btn" data-scenario="m9-wait-and-see">🎭 Practice with Agnes</button>
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
`;A["damage-identification"]=A["roofing-damage-id"]||`
  <div class="content-card"><h1>Damage Identification</h1><p>Content coming soon.</p></div>
`;A["filing-claim-closing"]=A["claim-closing"]||`
  <div class="content-card"><h1>Filing the Claim & Closing</h1><p>Content coming soon.</p></div>
`;A["closing-objections"]=`
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
`;A["discontinued-products"]=`
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
`;A["sales-cycle-job-flow"]=A["sales-cycle"]||`
  <div class="content-card"><h1>Sales Cycle & Job Flow</h1><p>Content coming soon.</p></div>
`;A["final-exam"]=`
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
`;A.welcome+=`
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
`;A["role-play"]=(A["role-play"]||"").replace('<div id="chat-container">',`<div class="rp-controls">
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
  `}const O=window.speechSynthesis;let $=null;function Nr(i){const t=i.target.closest(".speak-btn");if(!t)return;const e=t.closest('[data-text-source="true"]');if(!e)return;const n=e.innerText.trim();if(O.speaking&&$&&(O.cancel(),$.text===n)){$=null;return}const o=new SpeechSynthesisUtterance(n);$=o,o.onerror=a=>console.error("SpeechSynthesis Error",a),O.speak(o)}function Tt(){const i=document.getElementById("items-pool"),t=document.getElementById("sorted-list"),e=document.getElementById("sales-cycle-feedback");if(!i||!t||!e)return;let n=null;const o=["1","2","3","4","5"];i.addEventListener("dragstart",l=>{n=l.target,setTimeout(()=>{n&&(n.style.display="none")},0)}),i.addEventListener("dragend",()=>{setTimeout(()=>{n&&(n.style.display="block",n=null)},0)}),t.addEventListener("dragover",l=>l.preventDefault()),t.addEventListener("drop",l=>{l.preventDefault(),n&&(t.appendChild(n),a())});function a(){const l=t.querySelectorAll(".draggable-item");if(l.length!==o.length)return;const d=Array.from(l).map(u=>u.dataset.order);JSON.stringify(d)===JSON.stringify(o)?(e.textContent="Correct! That is the right order.",e.className="feedback-message correct"):(e.textContent="Not quite right. Try again!",e.className="feedback-message incorrect"),e.style.display="block"}}function wt(){const i=document.querySelectorAll("#objections-list .draggable-item"),t=document.querySelectorAll(".drop-zone"),e=document.getElementById("objection-feedback");let n=0;const o=i.length;let a=null;i.forEach(l=>{l.addEventListener("dragstart",d=>{a=d.target,setTimeout(()=>{a&&a.classList.add("dragging")},0)}),l.addEventListener("dragend",()=>{a&&a.classList.remove("dragging")})}),t.forEach(l=>{l.addEventListener("dragover",d=>{d.preventDefault(),l.classList.add("drag-over")}),l.addEventListener("dragleave",()=>{l.classList.remove("drag-over")}),l.addEventListener("drop",d=>{if(d.preventDefault(),l.classList.remove("drag-over"),!a||l.children.length>1)return;const u=l.dataset.match,c=a.dataset.match;if(u===c){const p=l.querySelector(".response-text");p&&(p.style.display="none"),l.appendChild(a),a.setAttribute("draggable","false"),l.classList.add("correctly-matched"),n++,n===o&&e&&(e.textContent="Great job! All objections matched correctly.",e.className="feedback-message correct",e.style.display="block")}})})}function Lr(){console.log("🎭 Initializing Module 9 Practice with Agnes buttons...");const i=document.querySelectorAll(".practice-agnes-btn");i.forEach(t=>{t.addEventListener("click",function(){const e=this.getAttribute("data-scenario"),n=document.querySelector('[data-module="role-play"]');n&&(n.click(),setTimeout(()=>{localStorage.setItem("preselected-scenario",e);const a=getAllAgnesScenarios().find(l=>l.id===e);a&&Fr(a)},100))})}),console.log(`✅ Initialized ${i.length} Practice with Agnes buttons`)}function Fr(i){if(!i)return;const t=document.getElementById("role-selection-screen"),e=document.getElementById("scenario-screen");t&&(t.style.display="none"),e&&(e.style.display="block");const n=document.getElementById("scenario-prompt"),o=document.getElementById("scenario-progress");n&&(n.textContent=i.prompt),o&&(o.textContent=`Scenario: ${i.id}`),currentScenario=i,sessionScenarios=[i],currentScenarioIndex=0}function qr(){if(console.log("🎭 Initializing Agnes Role-Play System..."),typeof getAllAgnesScenarios!="function"){console.error("❌ Agnes scenarios not loaded. Check that agnes-scenarios.js is included before index.tsx"),alert("Error: Agnes scenario data not loaded. Please check browser console.");return}if(typeof scoreResponse!="function"){console.error("❌ scoreResponse function not found. Check agnes-scenarios.js"),alert("Error: Scoring function not available. Please check browser console.");return}const i={selectedRole:null,selectedPersonality:null,difficulty:"beginner",scenarios:[],currentScenarioIndex:0,currentScenario:null,responses:[],scores:[],hintsUsed:0,startTime:Date.now(),recognition:null,scenarioStartTime:null};function t(h){["roleplay-setup","personality-selector","scenario-display","feedback-area","session-summary"].forEach(v=>{const C=document.getElementById(v);C&&(C.style.display=v===h?"block":"none")})}function e(){console.log("📋 Showing role selection"),t("roleplay-setup"),i.selectedRole=null,i.scenarios=[],i.currentScenarioIndex=0,i.responses=[],i.scores=[],i.hintsUsed=0,i.startTime=Date.now()}function n(h){h<0||h>=i.scenarios.length||(i.currentScenarioIndex=h,i.currentScenario=i.scenarios[h],i.scenarioStartTime=Date.now(),o(i.currentScenario))}function o(h){const y=document.getElementById("scenario-title"),v=document.getElementById("scenario-context"),C=document.getElementById("agnes-prompt"),w=document.getElementById("scenario-progress"),E=document.getElementById("user-response"),T=document.getElementById("submit-response");y&&(y.textContent=h.id||`Scenario ${i.currentScenarioIndex+1}`),v&&(v.textContent=`Role: ${h.role} | Difficulty: beginner`),C&&(C.textContent=h.prompt||""),w&&(w.textContent=`Scenario ${i.currentScenarioIndex+1} of ${i.scenarios.length}`),E&&(E.value="",E.disabled=!1),T&&(T.disabled=!1,T.textContent="Submit Response")}async function a(){var h,y;try{const v=document.getElementById("user-response"),C=document.getElementById("submit-response");if(!v||!C)return;const w=v.value.trim();if(!w){alert("Please enter a response before submitting.");return}v.disabled=!0,C.disabled=!0,C.textContent="Processing...";const E=i.currentScenario,T=window.scoreResponse(w,E.expectedKeyPoints||[],((h=E.rubric)==null?void 0:h.keywords)||[],((y=E.rubric)==null?void 0:y.passThreshold)||70);let b=null;if(L)try{b=await l(w,E,T)}catch(_){console.warn("AI feedback unavailable:",_)}i.responses.push({scenarioIndex:i.currentScenarioIndex,userResponse:w,timestamp:new Date().toISOString()}),i.scores.push({...T,scenarioIndex:i.currentScenarioIndex,aiFeedback:b}),d(T,b),v.disabled=!1,C.textContent="Submit Response"}catch(v){console.error("Error submitting response:",v),alert("Error processing response. Please try again.")}}async function l(h,y,v){var w;if(!L)return null;const C=`You are Agnes, an expert insurance training coach. Analyze this role-play response and provide constructive feedback.

Scenario: ${y.id}
User Response: "${h}"

Performance:
- Score: ${v.score}/100
- Matched: ${v.matchedPoints.join(", ")||"None"}
- Missed: ${v.missedPoints.join(", ")||"None"}

Provide feedback in JSON format:
{
  "strengths": ["Strength 1", "Strength 2"],
  "improvements": ["Improvement 1", "Improvement 2"]
}

Be specific, actionable, and encouraging.`;try{let b=(await(await L.chats.create({model:"gemini-2.0-flash-exp",config:{temperature:.7,maxOutputTokens:500}})).sendMessage(C)).text.trim();return b.includes("```json")&&(b=((w=b.match(/```json\n([\s\S]*?)\n```/))==null?void 0:w[1])||b),JSON.parse(b)}catch{return{strengths:[`You scored ${v.score}/100`,`Matched ${v.matchedPoints.length} key points`],improvements:[`Try to include: ${v.missedPoints.slice(0,2).join(", ")}`,"Practice using clear, professional language"]}}}function d(h,y){const v=document.getElementById("score-circle"),C=document.getElementById("score-text"),w=document.getElementById("matched-points-list"),E=document.getElementById("missed-points-list"),T=document.getElementById("strengths-list"),b=document.getElementById("improvements-list");v&&(v.textContent=String(h.score),v.style.borderColor=h.score>=85?"#4caf50":h.score>=70?"#ff9800":"#f44336",v.style.color=h.score>=85?"#4caf50":h.score>=70?"#ff9800":"#f44336"),C&&(C.textContent=h.score>=70?`Great! You passed with ${h.score}/100`:`Score: ${h.score}/100 (Need 70 to pass)`),w&&(w.innerHTML=h.matchedPoints.length>0?h.matchedPoints.map(_=>`<li style="margin-bottom: 8px;"><span style="color: #4caf50; margin-right: 8px;">✓</span>${_}</li>`).join(""):"<li>No key points matched</li>"),E&&(E.innerHTML=h.missedPoints.length>0?h.missedPoints.map(_=>`<li style="margin-bottom: 8px;"><span style="color: #ff9800; margin-right: 8px;">✗</span>${_}</li>`).join(""):"<li>All key points covered!</li>"),y&&T&&b&&(T.innerHTML=y.strengths.map(_=>`<li style="margin-bottom: 8px;">${_}</li>`).join(""),b.innerHTML=y.improvements.map(_=>`<li style="margin-bottom: 8px;">${_}</li>`).join("")),t("feedback-area")}function u(){const h=i.currentScenarioIndex+1;h>=i.scenarios.length?p():(n(h),t("scenario-display"))}function c(){i.responses.length>0&&i.responses.pop(),i.scores.length>0&&i.scores.pop(),o(i.currentScenario),t("scenario-display")}function p(){t("session-summary");const h=document.getElementById("session-summary");if(!h)return;const y=i.scores.map(T=>T.score),v=y.length>0?Math.round(y.reduce((T,b)=>T+b,0)/y.length):0,C=y.length>0?Math.max(...y):0,w=y.filter(T=>T>=70).length;h.innerHTML=`
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
          <div style="font-size: 36px; font-weight: bold; color: #8b4fbe;">${C}</div>
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
    `;const E=document.getElementById("start-new-session-btn");E&&E.addEventListener("click",e)}function f(){const h=i.currentScenario;if(!(h!=null&&h.followUps)||h.followUps.length===0){alert("No hints available for this scenario.");return}const y=h.followUps[Math.floor(Math.random()*h.followUps.length)],v=document.getElementById("hint-display");v&&(v.innerHTML=`<strong>💡 Hint:</strong> ${y}`,v.style.display="block",i.hintsUsed++,setTimeout(()=>{v.style.display="none"},1e4))}function g(){document.querySelectorAll(".role-btn").forEach(y=>{y.addEventListener("click",async v=>{var E;const w=(E=v.target.closest("[data-role]"))==null?void 0:E.getAttribute("data-role");w&&(i.selectedRole=w,i.startTime=Date.now(),t("personality-selector"))})})}function m(){document.querySelectorAll(".personality-card").forEach(v=>{v.addEventListener("click",async C=>{var b,_;const w=C.target,E=(b=w.closest("[data-personality]"))==null?void 0:b.getAttribute("data-personality"),T=(_=w.closest("[data-difficulty]"))==null?void 0:_.getAttribute("data-difficulty");if(!(!E||!T)){i.selectedPersonality=E,i.difficulty=T,console.log(`✨ Selected personality: ${E} (difficulty: ${T})`);try{const M=window.getAgnesScenariosByRole(i.selectedRole);if(!M||M.length===0)throw new Error(`No scenarios found for role: ${i.selectedRole}`);i.scenarios=M,i.currentScenarioIndex=0,setTimeout(()=>{n(0),t("scenario-display");const N=document.getElementById("agnes-name");if(N){const U={supportive:"Agnes the Supportive Coach",realistic:"Agnes the Real Homeowner",skeptical:"Agnes the Skeptical Buyer",rushed:"Agnes the Rushed Decision-Maker","final-boss":"Agnes the Final Boss"};N.textContent=U[E]||"Agnes"}},300)}catch(M){console.error("Error loading scenarios:",M),alert(`Error: ${M.message}`)}}})});const y=document.getElementById("back-to-roles");y&&y.addEventListener("click",()=>{t("roleplay-setup"),i.selectedRole=null,i.selectedPersonality=null})}try{g(),m();const h=document.getElementById("submit-response");h&&h.addEventListener("click",a);const y=document.getElementById("next-scenario-btn");y&&y.addEventListener("click",u);const v=document.getElementById("retry-scenario-btn");v&&v.addEventListener("click",c);const C=document.getElementById("hint-btn");C&&C.addEventListener("click",f),e(),console.log("✅ Agnes Role-Play System initialized successfully")}catch(h){throw console.error("❌ Error initializing Agnes system:",h),h}}async function Vr(){const i=document.getElementById("quiz-area");if(i){i.innerHTML='<div id="loader">Generating your quiz...</div>';try{if(!L){i.innerHTML='<p style="color: red;">Quiz is unavailable: missing API key. Set GEMINI_API_KEY in .env.local and reload.</p>';return}const t=Object.values(A).join(" "),e=await L.models.generateContent({model:"gemini-2.5-flash",contents:`Based on this summary of the Roof-ER sales training, generate a 5-question multiple-choice quiz. Ensure the "answer" field exactly matches one of the strings in the "options" array. ${t}`,config:{responseMimeType:"application/json",responseSchema:{type:I.ARRAY,items:{type:I.OBJECT,properties:{question:{type:I.STRING},options:{type:I.ARRAY,items:{type:I.STRING}},answer:{type:I.STRING}},required:["question","options","answer"]}}}}),n=JSON.parse(e.text.trim());Ur(n)}catch(t){console.error("Quiz generation failed:",t),i.innerHTML='<p style="color: red;">Sorry, there was an error generating the quiz. Please try again.</p>'}}}function Ur(i){const t=document.getElementById("quiz-area");if(!t)return;t.innerHTML=i.map((o,a)=>`
    <div class="quiz-item" data-question-index="${a}">
      <p class="quiz-question">${a+1}. ${o.question}</p>
      <ul class="quiz-options">
        ${o.options.map(l=>`<li data-option="${l.replace(/"/g,"&quot;")}">${l}</li>`).join("")}
      </ul>
      <div id="quiz-feedback-${a}" class="quiz-feedback"></div>
    </div>
  `).join("")+'<button id="submitQuizButton">Submit Answers</button>',t.querySelectorAll(".quiz-options li").forEach(o=>{o.addEventListener("click",()=>{o.parentElement.querySelectorAll("li").forEach(l=>l.classList.remove("selected")),o.classList.add("selected")})});const n=document.getElementById("submitQuizButton");n==null||n.addEventListener("click",()=>{i.forEach((o,a)=>{const l=document.querySelector(`.quiz-item[data-question-index="${a}"] .quiz-options li.selected`),d=document.getElementById(`quiz-feedback-${a}`);l&&d&&(l.dataset.option===o.answer?(d.textContent="Correct!",d.className="quiz-feedback correct"):(d.textContent=`Incorrect. The correct answer is: ${o.answer}`,d.className="quiz-feedback incorrect"))}),n.disabled=!0})}function Ft(i){var t;if(W)switch(W.innerHTML=A[i]||"<div>Content not found.</div>",O.speaking&&(O.cancel(),$=null),i){case"quiz":(t=document.getElementById("generateQuizButton"))==null||t.addEventListener("click",Vr);break;case"sales-cycle":Tt();break;case"objection-handling":wt();break;case"role-play":qr();break;case"welcome":Kr(),Hr(),zr();break;case"post-inspection-objections":Lr();break;case"general-knowledge":Wr();break;case"final-exam":Or();break;case"handling-initial-pitch-objections":wt();break;case"sales-cycle-job-flow":Tt();break;case"commitment":$r();break}}function Br(i){const t=i.target;if(t.tagName==="LI"&&t.dataset.module){const e=t.dataset.module;z==null||z.querySelectorAll("li").forEach(n=>n.classList.remove("active")),t.classList.add("active"),Ft(e)}}document.addEventListener("DOMContentLoaded",()=>{var i;z&&z.addEventListener("click",Br),W==null||W.addEventListener("click",Nr),Ft("welcome"),(i=document.querySelector('#sidebar li[data-module="welcome"]'))==null||i.classList.add("active")});const Gr={oliver:{name:"Oliver Brown",title:"Owner & Founder",img:"/resources/images/oliver-theroofdocs.jpg",link:"https://www.theroofdocs.com/about/",summary:"Owner & Founder focused on integrity, quality, and simplicity with a transparent, customer‑first process."},reese:{name:"Reese Samala",title:"Director of Sales",img:"/resources/images/reese-theroofdocs.jpg",link:"https://www.theroofdocs.com/about/",summary:"Leads sales with a consultative, education‑forward approach that builds trust and results."},ford:{name:"Ford Barsi",title:"General Manager",img:"/resources/images/ford-theroofdocs.jpg",link:"https://www.theroofdocs.com/about/",summary:"Oversees operations and execution, aligning teams and process from inspection to completion."}};function Hr(){var n;const i=document.getElementById("main-content");if(!i)return;let t=document.getElementById("bio-modal-overlay");t||(t=document.createElement("div"),t.id="bio-modal-overlay",t.className="modal-overlay",t.innerHTML=`
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
      </div>`,document.body.appendChild(t));const e=()=>{t.classList.remove("show")};t.addEventListener("click",o=>{o.target===t&&e()}),(n=t.querySelector(".modal-close"))==null||n.addEventListener("click",e),document.addEventListener("keyup",o=>{o.key==="Escape"&&e()}),i.querySelectorAll(".bio-btn").forEach(o=>{o.addEventListener("click",()=>{const a=o.getAttribute("data-bio")||"",l=Gr[a];if(!l)return;t.querySelector("#bioTitle").textContent=`${l.name} — ${l.title}`;const d=t.querySelector("#bioImg");d.src=l.img,d.alt=l.name,t.querySelector("#bioSummary").textContent=l.summary;const u=t.querySelector("#bioLink");u.href=l.link,t.classList.add("show")})})}function $r(){const i=document.getElementById("main-content");if(!i||localStorage.getItem(Ct.commitmentSigned)==="true")return;const e=document.createElement("div");e.innerHTML=`
    <div class="commitment-gate">
      <h3>Digital Signature</h3>
      <p>You must acknowledge and sign before accessing the training.</p>
      <label>Full Name: <input id="sigName" type="text" placeholder="Your full name"/></label>
      <label><input id="sigAgree" type="checkbox"/> I agree to uphold Roof‑ER standards and ethics.</label>
      <button id="sigSubmit">Sign & Continue</button>
      <div id="sigMsg" class="sig-message"></div>
    </div>`,i.appendChild(e);const n=e.querySelector("#sigSubmit");n==null||n.addEventListener("click",()=>{var d,u,c;const o=(u=(d=e.querySelector("#sigName"))==null?void 0:d.value)==null?void 0:u.trim(),a=(c=e.querySelector("#sigAgree"))==null?void 0:c.checked,l=e.querySelector("#sigMsg");if(!o||!a){l&&(l.textContent="Please enter your name and agree to proceed.");return}localStorage.setItem(Ct.commitmentSigned,"true"),l&&(l.textContent="Signed. You may continue to other sections.")})}function zr(){document.querySelectorAll(".bio-toggle-btn").forEach(t=>{t.addEventListener("click",function(){const e=this.getAttribute("data-bio"),n=document.getElementById(e);n&&(n.style.display==="none"||n.style.display===""?(n.style.display="block",this.textContent="Hide Bio"):(n.style.display="none",this.textContent="My Bio"))})})}function Wr(){const i=document.getElementById("startQuickQuiz2"),t=document.getElementById("quiz2-area");!i||!t||i.addEventListener("click",()=>{var e;t.innerHTML=`
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
    `,(e=document.getElementById("quiz2Submit"))==null||e.addEventListener("click",()=>{var d,u;const n=(d=document.querySelector('input[name="q1"]:checked'))==null?void 0:d.value,o=(u=document.querySelector('input[name="q2"]:checked'))==null?void 0:u.value,a=n==="b"&&o==="b",l=document.getElementById("quiz2Result");l&&(l.textContent=a?"Pass":"Fail",l.className=a?"quiz-feedback correct":"quiz-feedback incorrect")})})}function Or(){const i=document.getElementById("startFinalExam"),t=document.getElementById("exam-area");!i||!t||i.addEventListener("click",async()=>{if(!L){t.innerHTML='<p style="color:red">Final exam generation requires an API key. Set GEMINI_API_KEY in .env.local.</p>';return}t.innerHTML='<div id="loader">Preparing your 50‑question exam…</div>';try{const e=Object.values(A).join(" "),n=await L.models.generateContent({model:"gemini-2.5-flash",contents:"Create a final exam for Roof‑ER training with exactly: 35 multiple‑choice (options+answer), 10 fill‑in‑the‑blank (answer string), 5 short‑answer (keywords array for rubric). Return JSON matching the schema.",config:{responseMimeType:"application/json",responseSchema:{type:I.OBJECT,properties:{multipleChoice:{type:I.ARRAY,items:{type:I.OBJECT,properties:{question:{type:I.STRING},options:{type:I.ARRAY,items:{type:I.STRING}},answer:{type:I.STRING}},required:["question","options","answer"]}},fillBlank:{type:I.ARRAY,items:{type:I.OBJECT,properties:{question:{type:I.STRING},answer:{type:I.STRING}},required:["question","answer"]}},shortAnswer:{type:I.ARRAY,items:{type:I.OBJECT,properties:{prompt:{type:I.STRING},keywords:{type:I.ARRAY,items:{type:I.STRING}}},required:["prompt","keywords"]}}},required:["multipleChoice","fillBlank","shortAnswer"]}}}),o=JSON.parse(n.text.trim());Yr(t,o)}catch(e){console.error(e),t.innerHTML='<p style="color:red">Failed to generate exam. Please try again.</p>'}})}function Yr(i,t){i.innerHTML="";const e=[];Array.isArray(t.multipleChoice)&&e.push("multipleChoice"),Array.isArray(t.fillBlank)&&e.push("fillBlank"),Array.isArray(t.shortAnswer)&&e.push("shortAnswer"),e.forEach(o=>{const a=document.createElement("div");a.className="exam-section",a.innerHTML=`<h3>${o==="multipleChoice"?"Multiple Choice":o==="fillBlank"?"Fill in the Blank":"Short Answer"}</h3>`,t[o].forEach((d,u)=>{const c=document.createElement("div");c.className="exam-item",o==="multipleChoice"?c.innerHTML=`
          <p>${u+1}. ${d.question}</p>
          ${d.options.map((p,f)=>`<label><input type="radio" name="mcq-${u}" value="${p}"> ${p}</label>`).join("")}
        `:o==="fillBlank"?c.innerHTML=`<p>${u+1}. ${d.question}</p><input type="text" name="fib-${u}" />`:c.innerHTML=`<p>${u+1}. ${d.prompt}</p><textarea name="sa-${u}" rows="2"></textarea>`,a.appendChild(c)}),i.appendChild(a)});const n=document.createElement("button");n.textContent="Submit Exam",n.addEventListener("click",()=>Jr(i,t)),i.appendChild(n),i.appendChild(Object.assign(document.createElement("div"),{id:"examResult"}))}function Jr(i,t){let e=0,n=Array.isArray(t.multipleChoice)?t.multipleChoice.length:0;t.multipleChoice&&t.multipleChoice.forEach((h,y)=>{var C;const v=(C=i.querySelector(`input[name="mcq-${y}"]:checked`))==null?void 0:C.value;v&&v===h.answer&&e++});let o=0,a=Array.isArray(t.fillBlank)?t.fillBlank.length:0;t.fillBlank&&t.fillBlank.forEach((h,y)=>{var w,E;const v=(E=(w=i.querySelector(`input[name="fib-${y}"]`))==null?void 0:w.value)==null?void 0:E.trim().toLowerCase(),C=String(h.answer||"").trim().toLowerCase();v&&C&&v===C&&o++});let l=0,d=Array.isArray(t.shortAnswer)?t.shortAnswer.length:0;t.shortAnswer&&t.shortAnswer.forEach((h,y)=>{var E,T;const v=((T=(E=i.querySelector(`textarea[name="sa-${y}"]`))==null?void 0:E.value)==null?void 0:T.toLowerCase())||"",C=Array.isArray(h.keywords)?h.keywords.map(b=>String(b).toLowerCase()):[],w=C.filter(b=>v.includes(b)).length;l+=w/Math.max(C.length,1)});const u=n+a,c=e+o,p=u?Math.round(c/u*100):0,f=d?Math.round(l/d*100):0,g=Math.round(p*.8+f*.2),m=i.querySelector("#examResult");m&&(m.textContent=`MCQ: ${e}/${n}, FIB: ${o}/${a}, SA Score: ${f}%. Overall: ${g}%.`)}function Kr(){const i=document.getElementById("startQuickQuiz1"),t=document.getElementById("quiz1-area");!i||!t||i.addEventListener("click",()=>{var e;t.innerHTML=`
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
    `,(e=document.getElementById("quiz1Submit"))==null||e.addEventListener("click",()=>{var u,c,p;const n=(u=document.querySelector('input[name="qa1"]:checked'))==null?void 0:u.value,o=(c=document.querySelector('input[name="qa2"]:checked'))==null?void 0:c.value,a=(p=document.querySelector('input[name="qa3"]:checked'))==null?void 0:p.value,l=n==="a"&&o==="b"&&a==="c",d=document.getElementById("quiz1Result");if(d)if(l)d.textContent="✓ Perfect! You know the Roof-ER leadership team, core values, and founding year.",d.className="quiz-feedback correct";else{let f="✗ Not quite. ";n!=="a"&&(f+="Review the leadership team. "),o!=="b"&&(f+="Check our core values. "),a!=="c"&&(f+="Roof-ER was founded in 2019. "),d.textContent=f,d.className="quiz-feedback incorrect"}})})}
