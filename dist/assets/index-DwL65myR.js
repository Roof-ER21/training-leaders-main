(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let qt,Vt;function Ut(){return{geminiUrl:qt,vertexUrl:Vt}}function Bt(o,t,e){var n,i,a;if(!(!((n=o.httpOptions)===null||n===void 0)&&n.baseUrl)){const l=Ut();return o.vertexai?(i=l.vertexUrl)!==null&&i!==void 0?i:t:(a=l.geminiUrl)!==null&&a!==void 0?a:e}return o.httpOptions.baseUrl}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class J{}function S(o,t){const e=/\{([^}]+)\}/g;return o.replace(e,(n,i)=>{if(Object.prototype.hasOwnProperty.call(t,i)){const a=t[i];return a!=null?String(a):""}else throw new Error(`Key '${i}' not found in valueMap.`)})}function r(o,t,e){for(let a=0;a<t.length-1;a++){const l=t[a];if(l.endsWith("[]")){const u=l.slice(0,-2);if(!(u in o))if(Array.isArray(e))o[u]=Array.from({length:e.length},()=>({}));else throw new Error(`Value must be a list given an array path ${l}`);if(Array.isArray(o[u])){const d=o[u];if(Array.isArray(e))for(let c=0;c<d.length;c++){const f=d[c];r(f,t.slice(a+1),e[c])}else for(const c of d)r(c,t.slice(a+1),e)}return}else if(l.endsWith("[0]")){const u=l.slice(0,-3);u in o||(o[u]=[{}]);const d=o[u];r(d[0],t.slice(a+1),e);return}(!o[l]||typeof o[l]!="object")&&(o[l]={}),o=o[l]}const n=t[t.length-1],i=o[n];if(i!==void 0){if(!e||typeof e=="object"&&Object.keys(e).length===0||e===i)return;if(typeof i=="object"&&typeof e=="object"&&i!==null&&e!==null)Object.assign(i,e);else throw new Error(`Cannot set value for an existing key. Key: ${n}`)}else o[n]=e}function s(o,t){try{if(t.length===1&&t[0]==="_self")return o;for(let e=0;e<t.length;e++){if(typeof o!="object"||o===null)return;const n=t[e];if(n.endsWith("[]")){const i=n.slice(0,-2);if(i in o){const a=o[i];return Array.isArray(a)?a.map(l=>s(l,t.slice(e+1))):void 0}else return}else o=o[n]}return o}catch(e){if(e instanceof TypeError)return;throw e}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function A(o,t){if(!t||typeof t!="string")throw new Error("model is required and must be a string");if(o.isVertexAI()){if(t.startsWith("publishers/")||t.startsWith("projects/")||t.startsWith("models/"))return t;if(t.indexOf("/")>=0){const e=t.split("/",2);return`publishers/${e[0]}/models/${e[1]}`}else return`publishers/google/models/${t}`}else return t.startsWith("models/")||t.startsWith("tunedModels/")?t:`models/${t}`}function Et(o,t){const e=A(o,t);return e?e.startsWith("publishers/")&&o.isVertexAI()?`projects/${o.getProject()}/locations/${o.getLocation()}/${e}`:e.startsWith("models/")&&o.isVertexAI()?`projects/${o.getProject()}/locations/${o.getLocation()}/publishers/google/${e}`:e:""}function St(o,t){return Array.isArray(t)?t.map(e=>ee(o,e)):[ee(o,t)]}function ee(o,t){if(typeof t=="object"&&t!==null)return t;throw new Error(`Could not parse input as Blob. Unsupported blob type: ${typeof t}`)}function Gt(o,t){const e=ee(o,t);if(e.mimeType&&e.mimeType.startsWith("image/"))return e;throw new Error(`Unsupported mime type: ${e.mimeType}`)}function Ht(o,t){const e=ee(o,t);if(e.mimeType&&e.mimeType.startsWith("audio/"))return e;throw new Error(`Unsupported mime type: ${e.mimeType}`)}function ye(o,t){if(t==null)throw new Error("PartUnion is required");if(typeof t=="object")return t;if(typeof t=="string")return{text:t};throw new Error(`Unsupported part type: ${typeof t}`)}function It(o,t){if(t==null||Array.isArray(t)&&t.length===0)throw new Error("PartListUnion is required");return Array.isArray(t)?t.map(e=>ye(o,e)):[ye(o,t)]}function ae(o){return o!=null&&typeof o=="object"&&"parts"in o&&Array.isArray(o.parts)}function ve(o){return o!=null&&typeof o=="object"&&"functionCall"in o}function Ce(o){return o!=null&&typeof o=="object"&&"functionResponse"in o}function R(o,t){if(t==null)throw new Error("ContentUnion is required");return ae(t)?t:{role:"user",parts:It(o,t)}}function bt(o,t){if(!t)return[];if(o.isVertexAI()&&Array.isArray(t))return t.flatMap(e=>{const n=R(o,e);return n.parts&&n.parts.length>0&&n.parts[0].text!==void 0?[n.parts[0].text]:[]});if(o.isVertexAI()){const e=R(o,t);return e.parts&&e.parts.length>0&&e.parts[0].text!==void 0?[e.parts[0].text]:[]}return Array.isArray(t)?t.map(e=>R(o,e)):[R(o,t)]}function D(o,t){if(t==null||Array.isArray(t)&&t.length===0)throw new Error("contents are required");if(!Array.isArray(t)){if(ve(t)||Ce(t))throw new Error("To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them");return[R(o,t)]}const e=[],n=[],i=ae(t[0]);for(const a of t){const l=ae(a);if(l!=i)throw new Error("Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them");if(l)e.push(a);else{if(ve(a)||Ce(a))throw new Error("To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them");n.push(a)}}return i||e.push({role:"user",parts:It(o,n)}),e}function At(o,t){return t}function xt(o,t){if(typeof t=="object")return t;if(typeof t=="string")return{voiceConfig:{prebuiltVoiceConfig:{voiceName:t}}};throw new Error(`Unsupported speechConfig type: ${typeof t}`)}function oe(o,t){return t}function ie(o,t){if(!Array.isArray(t))throw new Error("tool is required and must be an array of Tools");return t}function $t(o,t,e,n=1){const i=!t.startsWith(`${e}/`)&&t.split("/").length===n;return o.isVertexAI()?t.startsWith("projects/")?t:t.startsWith("locations/")?`projects/${o.getProject()}/${t}`:t.startsWith(`${e}/`)?`projects/${o.getProject()}/locations/${o.getLocation()}/${t}`:i?`projects/${o.getProject()}/locations/${o.getLocation()}/${e}/${t}`:t:i?`${e}/${t}`:t}function N(o,t){if(typeof t!="string")throw new Error("name must be a string");return $t(o,t,"cachedContents")}function _t(o,t){switch(t){case"STATE_UNSPECIFIED":return"JOB_STATE_UNSPECIFIED";case"CREATING":return"JOB_STATE_RUNNING";case"ACTIVE":return"JOB_STATE_SUCCEEDED";case"FAILED":return"JOB_STATE_FAILED";default:return t}}function L(o,t){if(typeof t!="string")throw new Error("fromImageBytes must be a string");return t}function Rt(o,t){if(typeof t!="string")throw new Error("fromName must be a string");return t.startsWith("files/")?t.split("files/")[1]:t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Wt(o,t){const e={};if(s(t,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const i=s(t,["codeExecutionResult"]);i!=null&&r(e,["codeExecutionResult"],i);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const d=s(t,["functionResponse"]);d!=null&&r(e,["functionResponse"],d);const c=s(t,["inlineData"]);c!=null&&r(e,["inlineData"],c);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function Te(o,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Wt(o,l))),r(e,["parts"],a)}const i=s(t,["role"]);return i!=null&&r(e,["role"],i),e}function zt(){return{}}function Ot(o,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const i=s(t,["dynamicThreshold"]);return i!=null&&r(e,["dynamicThreshold"],i),e}function Yt(o,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],Ot(o,n)),e}function Jt(o,t){const e={};if(s(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");s(t,["googleSearch"])!=null&&r(e,["googleSearch"],zt());const i=s(t,["googleSearchRetrieval"]);i!=null&&r(e,["googleSearchRetrieval"],Yt(o,i));const a=s(t,["codeExecution"]);a!=null&&r(e,["codeExecution"],a);const l=s(t,["functionDeclarations"]);return l!=null&&r(e,["functionDeclarations"],l),e}function Kt(o,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const i=s(t,["allowedFunctionNames"]);return i!=null&&r(e,["allowedFunctionNames"],i),e}function Qt(o,t){const e={},n=s(t,["functionCallingConfig"]);return n!=null&&r(e,["functionCallingConfig"],Kt(o,n)),e}function Xt(o,t,e){const n={},i=s(t,["ttl"]);e!==void 0&&i!=null&&r(e,["ttl"],i);const a=s(t,["expireTime"]);e!==void 0&&a!=null&&r(e,["expireTime"],a);const l=s(t,["displayName"]);e!==void 0&&l!=null&&r(e,["displayName"],l);const u=s(t,["contents"]);if(e!==void 0&&u!=null){let p=D(o,u);Array.isArray(p)&&(p=p.map(g=>Te(o,g))),r(e,["contents"],p)}const d=s(t,["systemInstruction"]);e!==void 0&&d!=null&&r(e,["systemInstruction"],Te(o,R(o,d)));const c=s(t,["tools"]);if(e!==void 0&&c!=null){let p=c;Array.isArray(p)&&(p=p.map(g=>Jt(o,g))),r(e,["tools"],p)}const f=s(t,["toolConfig"]);return e!==void 0&&f!=null&&r(e,["toolConfig"],Qt(o,f)),n}function Zt(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["model"],Et(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],Xt(o,i,e)),e}function jt(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],N(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function en(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],N(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function tn(o,t,e){const n={},i=s(t,["ttl"]);e!==void 0&&i!=null&&r(e,["ttl"],i);const a=s(t,["expireTime"]);return e!==void 0&&a!=null&&r(e,["expireTime"],a),n}function nn(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],N(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],tn(o,i,e)),e}function on(o,t,e){const n={},i=s(t,["pageSize"]);e!==void 0&&i!=null&&r(e,["_query","pageSize"],i);const a=s(t,["pageToken"]);return e!==void 0&&a!=null&&r(e,["_query","pageToken"],a),n}function sn(o,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],on(o,n,e)),e}function rn(o,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const i=s(t,["thought"]);i!=null&&r(e,["thought"],i);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const u=s(t,["fileData"]);u!=null&&r(e,["fileData"],u);const d=s(t,["functionCall"]);d!=null&&r(e,["functionCall"],d);const c=s(t,["functionResponse"]);c!=null&&r(e,["functionResponse"],c);const f=s(t,["inlineData"]);f!=null&&r(e,["inlineData"],f);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function we(o,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>rn(o,l))),r(e,["parts"],a)}const i=s(t,["role"]);return i!=null&&r(e,["role"],i),e}function an(){return{}}function ln(o,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const i=s(t,["dynamicThreshold"]);return i!=null&&r(e,["dynamicThreshold"],i),e}function un(o,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],ln(o,n)),e}function cn(o,t){const e={},n=s(t,["retrieval"]);n!=null&&r(e,["retrieval"],n),s(t,["googleSearch"])!=null&&r(e,["googleSearch"],an());const a=s(t,["googleSearchRetrieval"]);a!=null&&r(e,["googleSearchRetrieval"],un(o,a));const l=s(t,["codeExecution"]);l!=null&&r(e,["codeExecution"],l);const u=s(t,["functionDeclarations"]);return u!=null&&r(e,["functionDeclarations"],u),e}function dn(o,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const i=s(t,["allowedFunctionNames"]);return i!=null&&r(e,["allowedFunctionNames"],i),e}function fn(o,t){const e={},n=s(t,["functionCallingConfig"]);return n!=null&&r(e,["functionCallingConfig"],dn(o,n)),e}function pn(o,t,e){const n={},i=s(t,["ttl"]);e!==void 0&&i!=null&&r(e,["ttl"],i);const a=s(t,["expireTime"]);e!==void 0&&a!=null&&r(e,["expireTime"],a);const l=s(t,["displayName"]);e!==void 0&&l!=null&&r(e,["displayName"],l);const u=s(t,["contents"]);if(e!==void 0&&u!=null){let p=D(o,u);Array.isArray(p)&&(p=p.map(g=>we(o,g))),r(e,["contents"],p)}const d=s(t,["systemInstruction"]);e!==void 0&&d!=null&&r(e,["systemInstruction"],we(o,R(o,d)));const c=s(t,["tools"]);if(e!==void 0&&c!=null){let p=c;Array.isArray(p)&&(p=p.map(g=>cn(o,g))),r(e,["tools"],p)}const f=s(t,["toolConfig"]);return e!==void 0&&f!=null&&r(e,["toolConfig"],fn(o,f)),n}function hn(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["model"],Et(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],pn(o,i,e)),e}function gn(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],N(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function mn(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],N(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function yn(o,t,e){const n={},i=s(t,["ttl"]);e!==void 0&&i!=null&&r(e,["ttl"],i);const a=s(t,["expireTime"]);return e!==void 0&&a!=null&&r(e,["expireTime"],a),n}function vn(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],N(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],yn(o,i,e)),e}function Cn(o,t,e){const n={},i=s(t,["pageSize"]);e!==void 0&&i!=null&&r(e,["_query","pageSize"],i);const a=s(t,["pageToken"]);return e!==void 0&&a!=null&&r(e,["_query","pageToken"],a),n}function Tn(o,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],Cn(o,n,e)),e}function Z(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const i=s(t,["displayName"]);i!=null&&r(e,["displayName"],i);const a=s(t,["model"]);a!=null&&r(e,["model"],a);const l=s(t,["createTime"]);l!=null&&r(e,["createTime"],l);const u=s(t,["updateTime"]);u!=null&&r(e,["updateTime"],u);const d=s(t,["expireTime"]);d!=null&&r(e,["expireTime"],d);const c=s(t,["usageMetadata"]);return c!=null&&r(e,["usageMetadata"],c),e}function wn(){return{}}function En(o,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const i=s(t,["cachedContents"]);if(i!=null){let a=i;Array.isArray(a)&&(a=a.map(l=>Z(o,l))),r(e,["cachedContents"],a)}return e}function j(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const i=s(t,["displayName"]);i!=null&&r(e,["displayName"],i);const a=s(t,["model"]);a!=null&&r(e,["model"],a);const l=s(t,["createTime"]);l!=null&&r(e,["createTime"],l);const u=s(t,["updateTime"]);u!=null&&r(e,["updateTime"],u);const d=s(t,["expireTime"]);d!=null&&r(e,["expireTime"],d);const c=s(t,["usageMetadata"]);return c!=null&&r(e,["usageMetadata"],c),e}function Sn(){return{}}function In(o,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const i=s(t,["cachedContents"]);if(i!=null){let a=i;Array.isArray(a)&&(a=a.map(l=>j(o,l))),r(e,["cachedContents"],a)}return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var Y;(function(o){o.PAGED_ITEM_BATCH_JOBS="batchJobs",o.PAGED_ITEM_MODELS="models",o.PAGED_ITEM_TUNING_JOBS="tuningJobs",o.PAGED_ITEM_FILES="files",o.PAGED_ITEM_CACHED_CONTENTS="cachedContents"})(Y||(Y={}));class he{constructor(t,e,n,i){this.pageInternal=[],this.paramsInternal={},this.requestInternal=e,this.init(t,n,i)}init(t,e,n){var i,a;this.nameInternal=t,this.pageInternal=e[this.nameInternal]||[],this.idxInternal=0;let l={config:{}};n?typeof n=="object"?l=Object.assign({},n):l=n:l={config:{}},l.config&&(l.config.pageToken=e.nextPageToken),this.paramsInternal=l,this.pageInternalSize=(a=(i=l.config)===null||i===void 0?void 0:i.pageSize)!==null&&a!==void 0?a:this.pageInternal.length}initNextPage(t){this.init(this.nameInternal,t,this.paramsInternal)}get page(){return this.pageInternal}get name(){return this.nameInternal}get pageSize(){return this.pageInternalSize}get params(){return this.paramsInternal}get pageLength(){return this.pageInternal.length}getItem(t){return this.pageInternal[t]}[Symbol.asyncIterator](){return{next:async()=>{if(this.idxInternal>=this.pageLength)if(this.hasNextPage())await this.nextPage();else return{value:void 0,done:!0};const t=this.getItem(this.idxInternal);return this.idxInternal+=1,{value:t,done:!1}},return:async()=>({value:void 0,done:!0})}}async nextPage(){if(!this.hasNextPage())throw new Error("No more pages to fetch.");const t=await this.requestInternal(this.params);return this.initNextPage(t),this.page}hasNextPage(){var t;return((t=this.params.config)===null||t===void 0?void 0:t.pageToken)!==void 0}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var Ee;(function(o){o.OUTCOME_UNSPECIFIED="OUTCOME_UNSPECIFIED",o.OUTCOME_OK="OUTCOME_OK",o.OUTCOME_FAILED="OUTCOME_FAILED",o.OUTCOME_DEADLINE_EXCEEDED="OUTCOME_DEADLINE_EXCEEDED"})(Ee||(Ee={}));var Se;(function(o){o.LANGUAGE_UNSPECIFIED="LANGUAGE_UNSPECIFIED",o.PYTHON="PYTHON"})(Se||(Se={}));var Ie;(function(o){o.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",o.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",o.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",o.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",o.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",o.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(Ie||(Ie={}));var be;(function(o){o.HARM_BLOCK_METHOD_UNSPECIFIED="HARM_BLOCK_METHOD_UNSPECIFIED",o.SEVERITY="SEVERITY",o.PROBABILITY="PROBABILITY"})(be||(be={}));var Ae;(function(o){o.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",o.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",o.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",o.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",o.BLOCK_NONE="BLOCK_NONE",o.OFF="OFF"})(Ae||(Ae={}));var xe;(function(o){o.MODE_UNSPECIFIED="MODE_UNSPECIFIED",o.MODE_DYNAMIC="MODE_DYNAMIC"})(xe||(xe={}));var b;(function(o){o.TYPE_UNSPECIFIED="TYPE_UNSPECIFIED",o.STRING="STRING",o.NUMBER="NUMBER",o.INTEGER="INTEGER",o.BOOLEAN="BOOLEAN",o.ARRAY="ARRAY",o.OBJECT="OBJECT"})(b||(b={}));var _e;(function(o){o.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",o.STOP="STOP",o.MAX_TOKENS="MAX_TOKENS",o.SAFETY="SAFETY",o.RECITATION="RECITATION",o.LANGUAGE="LANGUAGE",o.OTHER="OTHER",o.BLOCKLIST="BLOCKLIST",o.PROHIBITED_CONTENT="PROHIBITED_CONTENT",o.SPII="SPII",o.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",o.IMAGE_SAFETY="IMAGE_SAFETY"})(_e||(_e={}));var Re;(function(o){o.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",o.NEGLIGIBLE="NEGLIGIBLE",o.LOW="LOW",o.MEDIUM="MEDIUM",o.HIGH="HIGH"})(Re||(Re={}));var ke;(function(o){o.HARM_SEVERITY_UNSPECIFIED="HARM_SEVERITY_UNSPECIFIED",o.HARM_SEVERITY_NEGLIGIBLE="HARM_SEVERITY_NEGLIGIBLE",o.HARM_SEVERITY_LOW="HARM_SEVERITY_LOW",o.HARM_SEVERITY_MEDIUM="HARM_SEVERITY_MEDIUM",o.HARM_SEVERITY_HIGH="HARM_SEVERITY_HIGH"})(ke||(ke={}));var Me;(function(o){o.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",o.SAFETY="SAFETY",o.OTHER="OTHER",o.BLOCKLIST="BLOCKLIST",o.PROHIBITED_CONTENT="PROHIBITED_CONTENT"})(Me||(Me={}));var Pe;(function(o){o.TRAFFIC_TYPE_UNSPECIFIED="TRAFFIC_TYPE_UNSPECIFIED",o.ON_DEMAND="ON_DEMAND",o.PROVISIONED_THROUGHPUT="PROVISIONED_THROUGHPUT"})(Pe||(Pe={}));var te;(function(o){o.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",o.TEXT="TEXT",o.IMAGE="IMAGE",o.AUDIO="AUDIO"})(te||(te={}));var De;(function(o){o.MEDIA_RESOLUTION_UNSPECIFIED="MEDIA_RESOLUTION_UNSPECIFIED",o.MEDIA_RESOLUTION_LOW="MEDIA_RESOLUTION_LOW",o.MEDIA_RESOLUTION_MEDIUM="MEDIA_RESOLUTION_MEDIUM",o.MEDIA_RESOLUTION_HIGH="MEDIA_RESOLUTION_HIGH"})(De||(De={}));var le;(function(o){o.JOB_STATE_UNSPECIFIED="JOB_STATE_UNSPECIFIED",o.JOB_STATE_QUEUED="JOB_STATE_QUEUED",o.JOB_STATE_PENDING="JOB_STATE_PENDING",o.JOB_STATE_RUNNING="JOB_STATE_RUNNING",o.JOB_STATE_SUCCEEDED="JOB_STATE_SUCCEEDED",o.JOB_STATE_FAILED="JOB_STATE_FAILED",o.JOB_STATE_CANCELLING="JOB_STATE_CANCELLING",o.JOB_STATE_CANCELLED="JOB_STATE_CANCELLED",o.JOB_STATE_PAUSED="JOB_STATE_PAUSED",o.JOB_STATE_EXPIRED="JOB_STATE_EXPIRED",o.JOB_STATE_UPDATING="JOB_STATE_UPDATING",o.JOB_STATE_PARTIALLY_SUCCEEDED="JOB_STATE_PARTIALLY_SUCCEEDED"})(le||(le={}));var Ne;(function(o){o.ADAPTER_SIZE_UNSPECIFIED="ADAPTER_SIZE_UNSPECIFIED",o.ADAPTER_SIZE_ONE="ADAPTER_SIZE_ONE",o.ADAPTER_SIZE_TWO="ADAPTER_SIZE_TWO",o.ADAPTER_SIZE_FOUR="ADAPTER_SIZE_FOUR",o.ADAPTER_SIZE_EIGHT="ADAPTER_SIZE_EIGHT",o.ADAPTER_SIZE_SIXTEEN="ADAPTER_SIZE_SIXTEEN",o.ADAPTER_SIZE_THIRTY_TWO="ADAPTER_SIZE_THIRTY_TWO"})(Ne||(Ne={}));var Le;(function(o){o.FEATURE_SELECTION_PREFERENCE_UNSPECIFIED="FEATURE_SELECTION_PREFERENCE_UNSPECIFIED",o.PRIORITIZE_QUALITY="PRIORITIZE_QUALITY",o.BALANCED="BALANCED",o.PRIORITIZE_COST="PRIORITIZE_COST"})(Le||(Le={}));var Fe;(function(o){o.MODE_UNSPECIFIED="MODE_UNSPECIFIED",o.MODE_DYNAMIC="MODE_DYNAMIC"})(Fe||(Fe={}));var qe;(function(o){o.MODE_UNSPECIFIED="MODE_UNSPECIFIED",o.AUTO="AUTO",o.ANY="ANY",o.NONE="NONE"})(qe||(qe={}));var Ve;(function(o){o.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",o.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",o.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",o.BLOCK_NONE="BLOCK_NONE"})(Ve||(Ve={}));var Ue;(function(o){o.DONT_ALLOW="DONT_ALLOW",o.ALLOW_ADULT="ALLOW_ADULT",o.ALLOW_ALL="ALLOW_ALL"})(Ue||(Ue={}));var Be;(function(o){o.auto="auto",o.en="en",o.ja="ja",o.ko="ko",o.hi="hi"})(Be||(Be={}));var Ge;(function(o){o.STATE_UNSPECIFIED="STATE_UNSPECIFIED",o.PROCESSING="PROCESSING",o.ACTIVE="ACTIVE",o.FAILED="FAILED"})(Ge||(Ge={}));var He;(function(o){o.SOURCE_UNSPECIFIED="SOURCE_UNSPECIFIED",o.UPLOADED="UPLOADED",o.GENERATED="GENERATED"})(He||(He={}));var $e;(function(o){o.MASK_MODE_DEFAULT="MASK_MODE_DEFAULT",o.MASK_MODE_USER_PROVIDED="MASK_MODE_USER_PROVIDED",o.MASK_MODE_BACKGROUND="MASK_MODE_BACKGROUND",o.MASK_MODE_FOREGROUND="MASK_MODE_FOREGROUND",o.MASK_MODE_SEMANTIC="MASK_MODE_SEMANTIC"})($e||($e={}));var We;(function(o){o.CONTROL_TYPE_DEFAULT="CONTROL_TYPE_DEFAULT",o.CONTROL_TYPE_CANNY="CONTROL_TYPE_CANNY",o.CONTROL_TYPE_SCRIBBLE="CONTROL_TYPE_SCRIBBLE",o.CONTROL_TYPE_FACE_MESH="CONTROL_TYPE_FACE_MESH"})(We||(We={}));var ze;(function(o){o.SUBJECT_TYPE_DEFAULT="SUBJECT_TYPE_DEFAULT",o.SUBJECT_TYPE_PERSON="SUBJECT_TYPE_PERSON",o.SUBJECT_TYPE_ANIMAL="SUBJECT_TYPE_ANIMAL",o.SUBJECT_TYPE_PRODUCT="SUBJECT_TYPE_PRODUCT"})(ze||(ze={}));var Oe;(function(o){o.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",o.TEXT="TEXT",o.IMAGE="IMAGE",o.VIDEO="VIDEO",o.AUDIO="AUDIO",o.DOCUMENT="DOCUMENT"})(Oe||(Oe={}));var Ye;(function(o){o.START_SENSITIVITY_UNSPECIFIED="START_SENSITIVITY_UNSPECIFIED",o.START_SENSITIVITY_HIGH="START_SENSITIVITY_HIGH",o.START_SENSITIVITY_LOW="START_SENSITIVITY_LOW"})(Ye||(Ye={}));var Je;(function(o){o.END_SENSITIVITY_UNSPECIFIED="END_SENSITIVITY_UNSPECIFIED",o.END_SENSITIVITY_HIGH="END_SENSITIVITY_HIGH",o.END_SENSITIVITY_LOW="END_SENSITIVITY_LOW"})(Je||(Je={}));var Ke;(function(o){o.ACTIVITY_HANDLING_UNSPECIFIED="ACTIVITY_HANDLING_UNSPECIFIED",o.START_OF_ACTIVITY_INTERRUPTS="START_OF_ACTIVITY_INTERRUPTS",o.NO_INTERRUPTION="NO_INTERRUPTION"})(Ke||(Ke={}));var Qe;(function(o){o.TURN_COVERAGE_UNSPECIFIED="TURN_COVERAGE_UNSPECIFIED",o.TURN_INCLUDES_ONLY_ACTIVITY="TURN_INCLUDES_ONLY_ACTIVITY",o.TURN_INCLUDES_ALL_INPUT="TURN_INCLUDES_ALL_INPUT"})(Qe||(Qe={}));class K{get text(){var t,e,n,i,a,l,u,d;if(((i=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning text from the first one.");let c="",f=!1;const p=[];for(const g of(d=(u=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||u===void 0?void 0:u.parts)!==null&&d!==void 0?d:[]){for(const[h,m]of Object.entries(g))h!=="text"&&h!=="thought"&&(m!==null||m!==void 0)&&p.push(h);if(typeof g.text=="string"){if(typeof g.thought=="boolean"&&g.thought)continue;f=!0,c+=g.text}}return p.length>0&&console.warn(`there are non-text parts ${p} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),f?c:void 0}get data(){var t,e,n,i,a,l,u,d;if(((i=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning data from the first one.");let c="";const f=[];for(const p of(d=(u=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||u===void 0?void 0:u.parts)!==null&&d!==void 0?d:[]){for(const[g,h]of Object.entries(p))g!=="inlineData"&&(h!==null||h!==void 0)&&f.push(g);p.inlineData&&typeof p.inlineData.data=="string"&&(c+=atob(p.inlineData.data))}return f.length>0&&console.warn(`there are non-data parts ${f} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`),c.length>0?btoa(c):void 0}get functionCalls(){var t,e,n,i,a,l,u,d;if(((i=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning function calls from the first one.");const c=(d=(u=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||u===void 0?void 0:u.parts)===null||d===void 0?void 0:d.filter(f=>f.functionCall).map(f=>f.functionCall).filter(f=>f!==void 0);if((c==null?void 0:c.length)!==0)return c}get executableCode(){var t,e,n,i,a,l,u,d,c;if(((i=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning executable code from the first one.");const f=(d=(u=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||u===void 0?void 0:u.parts)===null||d===void 0?void 0:d.filter(p=>p.executableCode).map(p=>p.executableCode).filter(p=>p!==void 0);if((f==null?void 0:f.length)!==0)return(c=f==null?void 0:f[0])===null||c===void 0?void 0:c.code}get codeExecutionResult(){var t,e,n,i,a,l,u,d,c;if(((i=(n=(e=(t=this.candidates)===null||t===void 0?void 0:t[0])===null||e===void 0?void 0:e.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning code execution result from the first one.");const f=(d=(u=(l=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content)===null||u===void 0?void 0:u.parts)===null||d===void 0?void 0:d.filter(p=>p.codeExecutionResult).map(p=>p.codeExecutionResult).filter(p=>p!==void 0);if((f==null?void 0:f.length)!==0)return(c=f==null?void 0:f[0])===null||c===void 0?void 0:c.output}}class Xe{}class Ze{}class je{}class et{}class bn{}class tt{}class nt{}class ot{}class An{}class ue{constructor(t){const e={};for(const n of t.headers.entries())e[n[0]]=n[1];this.headers=e,this.responseInternal=t}json(){return this.responseInternal.json()}}class xn{}class _n{}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Rn extends J{constructor(t){super(),this.apiClient=t,this.list=async(e={})=>new he(Y.PAGED_ITEM_CACHED_CONTENTS,n=>this.listInternal(n),await this.listInternal(e),e)}async create(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=hn(this.apiClient,t);return u=S("cachedContents",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>j(this.apiClient,f))}else{const c=Zt(this.apiClient,t);return u=S("cachedContents",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>Z(this.apiClient,f))}}async get(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=gn(this.apiClient,t);return u=S("{name}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>j(this.apiClient,f))}else{const c=jt(this.apiClient,t);return u=S("{name}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>Z(this.apiClient,f))}}async delete(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=mn(this.apiClient,t);return u=S("{name}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"DELETE",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(()=>{const f=Sn(),p=new nt;return Object.assign(p,f),p})}else{const c=en(this.apiClient,t);return u=S("{name}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"DELETE",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(()=>{const f=wn(),p=new nt;return Object.assign(p,f),p})}}async update(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=vn(this.apiClient,t);return u=S("{name}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"PATCH",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>j(this.apiClient,f))}else{const c=nn(this.apiClient,t);return u=S("{name}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"PATCH",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>Z(this.apiClient,f))}}async listInternal(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=Tn(this.apiClient,t);return u=S("cachedContents",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>{const p=In(this.apiClient,f),g=new ot;return Object.assign(g,p),g})}else{const c=sn(this.apiClient,t);return u=S("cachedContents",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>{const p=En(this.apiClient,f),g=new ot;return Object.assign(g,p),g})}}}function it(o){var t=typeof Symbol=="function"&&Symbol.iterator,e=t&&o[t],n=0;if(e)return e.call(o);if(o&&typeof o.length=="number")return{next:function(){return o&&n>=o.length&&(o=void 0),{value:o&&o[n++],done:!o}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function _(o){return this instanceof _?(this.v=o,this):new _(o)}function ne(o,t,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=e.apply(o,t||[]),i,a=[];return i=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),u("next"),u("throw"),u("return",l),i[Symbol.asyncIterator]=function(){return this},i;function l(h){return function(m){return Promise.resolve(m).then(h,p)}}function u(h,m){n[h]&&(i[h]=function(y){return new Promise(function(v,C){a.push([h,y,v,C])>1||d(h,y)})},m&&(i[h]=m(i[h])))}function d(h,m){try{c(n[h](m))}catch(y){g(a[0][3],y)}}function c(h){h.value instanceof _?Promise.resolve(h.value.v).then(f,p):g(a[0][2],h)}function f(h){d("next",h)}function p(h){d("throw",h)}function g(h,m){h(m),a.shift(),a.length&&d(a[0][0],a[0][1])}}function ce(o){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=o[Symbol.asyncIterator],e;return t?t.call(o):(o=typeof it=="function"?it(o):o[Symbol.iterator](),e={},n("next"),n("throw"),n("return"),e[Symbol.asyncIterator]=function(){return this},e);function n(a){e[a]=o[a]&&function(l){return new Promise(function(u,d){l=o[a](l),i(u,d,l.done,l.value)})}}function i(a,l,u,d){Promise.resolve(d).then(function(c){a({value:c,done:u})},l)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function kn(o){var t;if(o.candidates==null||o.candidates.length===0)return!1;const e=(t=o.candidates[0])===null||t===void 0?void 0:t.content;return e===void 0?!1:kt(e)}function kt(o){if(o.parts===void 0||o.parts.length===0)return!1;for(const t of o.parts)if(t===void 0||Object.keys(t).length===0||t.text!==void 0&&t.text==="")return!1;return!0}function Mn(o){if(o.length!==0){if(o[0].role!=="user")throw new Error("History must start with a user turn.");for(const t of o)if(t.role!=="user"&&t.role!=="model")throw new Error(`Role must be user or model, but got ${t.role}.`)}}function Pn(o){if(o===void 0||o.length===0)return[];const t=[],e=o.length;let n=0,i=o[0];for(;n<e;)if(o[n].role==="user")i=o[n],n++;else{const a=[];let l=!0;for(;n<e&&o[n].role==="model";)a.push(o[n]),l&&!kt(o[n])&&(l=!1),n++;l&&(t.push(i),t.push(...a))}return t}class Dn{constructor(t,e){this.modelsModule=t,this.apiClient=e}create(t){return new Nn(this.apiClient,this.modelsModule,t.model,t.config,t.history)}}class Nn{constructor(t,e,n,i={},a=[]){this.apiClient=t,this.modelsModule=e,this.model=n,this.config=i,this.history=a,this.sendPromise=Promise.resolve(),Mn(a)}async sendMessage(t){var e;await this.sendPromise;const n=R(this.apiClient,t.message),i=this.modelsModule.generateContent({model:this.model,contents:this.getHistory(!0).concat(n),config:(e=t.config)!==null&&e!==void 0?e:this.config});return this.sendPromise=(async()=>{var a,l;const d=(l=(a=(await i).candidates)===null||a===void 0?void 0:a[0])===null||l===void 0?void 0:l.content,c=d?[d]:[];this.recordHistory(n,c)})(),await this.sendPromise,i}async sendMessageStream(t){var e;await this.sendPromise;const n=R(this.apiClient,t.message),i=this.modelsModule.generateContentStream({model:this.model,contents:this.getHistory(!0).concat(n),config:(e=t.config)!==null&&e!==void 0?e:this.config});this.sendPromise=i.then(()=>{}).catch(()=>{});const a=await i;return this.processStreamResponse(a,n)}getHistory(t=!1){return t?Pn(this.history):this.history}processStreamResponse(t,e){var n,i;return ne(this,arguments,function*(){var l,u,d,c;const f=[];try{for(var p=!0,g=ce(t),h;h=yield _(g.next()),l=h.done,!l;p=!0){c=h.value,p=!1;const m=c;if(kn(m)){const y=(i=(n=m.candidates)===null||n===void 0?void 0:n[0])===null||i===void 0?void 0:i.content;y!==void 0&&f.push(y)}yield yield _(m)}}catch(m){u={error:m}}finally{try{!p&&!l&&(d=g.return)&&(yield _(d.call(g)))}finally{if(u)throw u.error}}this.recordHistory(e,f)})}recordHistory(t,e){let n=[];e.length>0&&e.every(i=>i.role==="model")?n=e:n.push({role:"model",parts:[]}),this.history.push(t),this.history.push(...n)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Ln(o,t,e){const n={},i=s(t,["pageSize"]);e!==void 0&&i!=null&&r(e,["_query","pageSize"],i);const a=s(t,["pageToken"]);return e!==void 0&&a!=null&&r(e,["_query","pageToken"],a),n}function Fn(o,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],Ln(o,n,e)),e}function qn(o,t){const e={},n=s(t,["details"]);n!=null&&r(e,["details"],n);const i=s(t,["message"]);i!=null&&r(e,["message"],i);const a=s(t,["code"]);return a!=null&&r(e,["code"],a),e}function Vn(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const i=s(t,["displayName"]);i!=null&&r(e,["displayName"],i);const a=s(t,["mimeType"]);a!=null&&r(e,["mimeType"],a);const l=s(t,["sizeBytes"]);l!=null&&r(e,["sizeBytes"],l);const u=s(t,["createTime"]);u!=null&&r(e,["createTime"],u);const d=s(t,["expirationTime"]);d!=null&&r(e,["expirationTime"],d);const c=s(t,["updateTime"]);c!=null&&r(e,["updateTime"],c);const f=s(t,["sha256Hash"]);f!=null&&r(e,["sha256Hash"],f);const p=s(t,["uri"]);p!=null&&r(e,["uri"],p);const g=s(t,["downloadUri"]);g!=null&&r(e,["downloadUri"],g);const h=s(t,["state"]);h!=null&&r(e,["state"],h);const m=s(t,["source"]);m!=null&&r(e,["source"],m);const y=s(t,["videoMetadata"]);y!=null&&r(e,["videoMetadata"],y);const v=s(t,["error"]);return v!=null&&r(e,["error"],qn(o,v)),e}function Un(o,t){const e={},n=s(t,["file"]);n!=null&&r(e,["file"],Vn(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function Bn(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","file"],Rt(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function Gn(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","file"],Rt(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function Hn(o,t){const e={},n=s(t,["details"]);n!=null&&r(e,["details"],n);const i=s(t,["message"]);i!=null&&r(e,["message"],i);const a=s(t,["code"]);return a!=null&&r(e,["code"],a),e}function de(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const i=s(t,["displayName"]);i!=null&&r(e,["displayName"],i);const a=s(t,["mimeType"]);a!=null&&r(e,["mimeType"],a);const l=s(t,["sizeBytes"]);l!=null&&r(e,["sizeBytes"],l);const u=s(t,["createTime"]);u!=null&&r(e,["createTime"],u);const d=s(t,["expirationTime"]);d!=null&&r(e,["expirationTime"],d);const c=s(t,["updateTime"]);c!=null&&r(e,["updateTime"],c);const f=s(t,["sha256Hash"]);f!=null&&r(e,["sha256Hash"],f);const p=s(t,["uri"]);p!=null&&r(e,["uri"],p);const g=s(t,["downloadUri"]);g!=null&&r(e,["downloadUri"],g);const h=s(t,["state"]);h!=null&&r(e,["state"],h);const m=s(t,["source"]);m!=null&&r(e,["source"],m);const y=s(t,["videoMetadata"]);y!=null&&r(e,["videoMetadata"],y);const v=s(t,["error"]);return v!=null&&r(e,["error"],Hn(o,v)),e}function $n(o,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const i=s(t,["files"]);if(i!=null){let a=i;Array.isArray(a)&&(a=a.map(l=>de(o,l))),r(e,["files"],a)}return e}function Wn(){return{}}function zn(){return{}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class On extends J{constructor(t){super(),this.apiClient=t,this.list=async(e={})=>new he(Y.PAGED_ITEM_FILES,n=>this.listInternal(n),await this.listInternal(e),e)}async upload(t){if(this.apiClient.isVertexAI())throw new Error("Vertex AI does not support uploading files. You can share files through a GCS bucket.");return this.apiClient.uploadFile(t.file,t.config).then(e=>de(this.apiClient,e))}async listInternal(t){var e,n;let i,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const u=Fn(this.apiClient,t);return a=S("files",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(u),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(d=>d.json()),i.then(d=>{const c=$n(this.apiClient,d),f=new An;return Object.assign(f,c),f})}}async createInternal(t){var e,n;let i,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const u=Un(this.apiClient,t);return a=S("upload/v1beta/files",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(d=>d.json()),i.then(()=>{const d=Wn(),c=new xn;return Object.assign(c,d),c})}}async get(t){var e,n;let i,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const u=Bn(this.apiClient,t);return a=S("files/{file}",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(u),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(d=>d.json()),i.then(d=>de(this.apiClient,d))}}async delete(t){var e,n;let i,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const u=Gn(this.apiClient,t);return a=S("files/{file}",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(u),httpMethod:"DELETE",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(d=>d.json()),i.then(()=>{const d=zn(),c=new _n;return Object.assign(c,d),c})}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Yn(o,t){const e={};if(s(t,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const i=s(t,["codeExecutionResult"]);i!=null&&r(e,["codeExecutionResult"],i);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const d=s(t,["functionResponse"]);d!=null&&r(e,["functionResponse"],d);const c=s(t,["inlineData"]);c!=null&&r(e,["inlineData"],c);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function Jn(o,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const i=s(t,["thought"]);i!=null&&r(e,["thought"],i);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const u=s(t,["fileData"]);u!=null&&r(e,["fileData"],u);const d=s(t,["functionCall"]);d!=null&&r(e,["functionCall"],d);const c=s(t,["functionResponse"]);c!=null&&r(e,["functionResponse"],c);const f=s(t,["inlineData"]);f!=null&&r(e,["inlineData"],f);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function Kn(o,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Yn(o,l))),r(e,["parts"],a)}const i=s(t,["role"]);return i!=null&&r(e,["role"],i),e}function Qn(o,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Jn(o,l))),r(e,["parts"],a)}const i=s(t,["role"]);return i!=null&&r(e,["role"],i),e}function Xn(){return{}}function Zn(){return{}}function jn(o,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const i=s(t,["dynamicThreshold"]);return i!=null&&r(e,["dynamicThreshold"],i),e}function eo(o,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const i=s(t,["dynamicThreshold"]);return i!=null&&r(e,["dynamicThreshold"],i),e}function to(o,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],jn(o,n)),e}function no(o,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],eo(o,n)),e}function oo(o,t){const e={};if(s(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");s(t,["googleSearch"])!=null&&r(e,["googleSearch"],Xn());const i=s(t,["googleSearchRetrieval"]);i!=null&&r(e,["googleSearchRetrieval"],to(o,i));const a=s(t,["codeExecution"]);a!=null&&r(e,["codeExecution"],a);const l=s(t,["functionDeclarations"]);return l!=null&&r(e,["functionDeclarations"],l),e}function io(o,t){const e={},n=s(t,["retrieval"]);n!=null&&r(e,["retrieval"],n),s(t,["googleSearch"])!=null&&r(e,["googleSearch"],Zn());const a=s(t,["googleSearchRetrieval"]);a!=null&&r(e,["googleSearchRetrieval"],no(o,a));const l=s(t,["codeExecution"]);l!=null&&r(e,["codeExecution"],l);const u=s(t,["functionDeclarations"]);return u!=null&&r(e,["functionDeclarations"],u),e}function so(o,t){const e={},n=s(t,["handle"]);if(n!=null&&r(e,["handle"],n),s(t,["transparent"])!==void 0)throw new Error("transparent parameter is not supported in Gemini API.");return e}function ro(o,t){const e={},n=s(t,["handle"]);n!=null&&r(e,["handle"],n);const i=s(t,["transparent"]);return i!=null&&r(e,["transparent"],i),e}function ao(){return{}}function st(){return{}}function lo(o,t){const e={},n=s(t,["disabled"]);n!=null&&r(e,["disabled"],n);const i=s(t,["startOfSpeechSensitivity"]);i!=null&&r(e,["startOfSpeechSensitivity"],i);const a=s(t,["endOfSpeechSensitivity"]);a!=null&&r(e,["endOfSpeechSensitivity"],a);const l=s(t,["prefixPaddingMs"]);l!=null&&r(e,["prefixPaddingMs"],l);const u=s(t,["silenceDurationMs"]);return u!=null&&r(e,["silenceDurationMs"],u),e}function uo(o,t){const e={},n=s(t,["disabled"]);n!=null&&r(e,["disabled"],n);const i=s(t,["startOfSpeechSensitivity"]);i!=null&&r(e,["startOfSpeechSensitivity"],i);const a=s(t,["endOfSpeechSensitivity"]);a!=null&&r(e,["endOfSpeechSensitivity"],a);const l=s(t,["prefixPaddingMs"]);l!=null&&r(e,["prefixPaddingMs"],l);const u=s(t,["silenceDurationMs"]);return u!=null&&r(e,["silenceDurationMs"],u),e}function co(o,t){const e={},n=s(t,["automaticActivityDetection"]);n!=null&&r(e,["automaticActivityDetection"],lo(o,n));const i=s(t,["activityHandling"]);i!=null&&r(e,["activityHandling"],i);const a=s(t,["turnCoverage"]);return a!=null&&r(e,["turnCoverage"],a),e}function fo(o,t){const e={},n=s(t,["automaticActivityDetection"]);n!=null&&r(e,["automaticActivityDetection"],uo(o,n));const i=s(t,["activityHandling"]);i!=null&&r(e,["activityHandling"],i);const a=s(t,["turnCoverage"]);return a!=null&&r(e,["turnCoverage"],a),e}function po(o,t){const e={},n=s(t,["targetTokens"]);return n!=null&&r(e,["targetTokens"],n),e}function ho(o,t){const e={},n=s(t,["targetTokens"]);return n!=null&&r(e,["targetTokens"],n),e}function go(o,t){const e={},n=s(t,["triggerTokens"]);n!=null&&r(e,["triggerTokens"],n);const i=s(t,["slidingWindow"]);return i!=null&&r(e,["slidingWindow"],po(o,i)),e}function mo(o,t){const e={},n=s(t,["triggerTokens"]);n!=null&&r(e,["triggerTokens"],n);const i=s(t,["slidingWindow"]);return i!=null&&r(e,["slidingWindow"],ho(o,i)),e}function yo(o,t,e){const n={},i=s(t,["generationConfig"]);e!==void 0&&i!=null&&r(e,["setup","generationConfig"],i);const a=s(t,["responseModalities"]);e!==void 0&&a!=null&&r(e,["setup","generationConfig","responseModalities"],a);const l=s(t,["temperature"]);e!==void 0&&l!=null&&r(e,["setup","generationConfig","temperature"],l);const u=s(t,["topP"]);e!==void 0&&u!=null&&r(e,["setup","generationConfig","topP"],u);const d=s(t,["topK"]);e!==void 0&&d!=null&&r(e,["setup","generationConfig","topK"],d);const c=s(t,["maxOutputTokens"]);e!==void 0&&c!=null&&r(e,["setup","generationConfig","maxOutputTokens"],c);const f=s(t,["mediaResolution"]);e!==void 0&&f!=null&&r(e,["setup","generationConfig","mediaResolution"],f);const p=s(t,["seed"]);e!==void 0&&p!=null&&r(e,["setup","generationConfig","seed"],p);const g=s(t,["speechConfig"]);e!==void 0&&g!=null&&r(e,["setup","generationConfig","speechConfig"],g);const h=s(t,["systemInstruction"]);e!==void 0&&h!=null&&r(e,["setup","systemInstruction"],Kn(o,R(o,h)));const m=s(t,["tools"]);if(e!==void 0&&m!=null){let T=ie(o,m);Array.isArray(T)&&(T=T.map(E=>oo(o,oe(o,E)))),r(e,["setup","tools"],T)}const y=s(t,["sessionResumption"]);if(e!==void 0&&y!=null&&r(e,["setup","sessionResumption"],so(o,y)),s(t,["inputAudioTranscription"])!==void 0)throw new Error("inputAudioTranscription parameter is not supported in Gemini API.");const v=s(t,["outputAudioTranscription"]);e!==void 0&&v!=null&&r(e,["setup","outputAudioTranscription"],ao());const C=s(t,["realtimeInputConfig"]);e!==void 0&&C!=null&&r(e,["setup","realtimeInputConfig"],co(o,C));const w=s(t,["contextWindowCompression"]);return e!==void 0&&w!=null&&r(e,["setup","contextWindowCompression"],go(o,w)),n}function vo(o,t,e){const n={},i=s(t,["generationConfig"]);e!==void 0&&i!=null&&r(e,["setup","generationConfig"],i);const a=s(t,["responseModalities"]);e!==void 0&&a!=null&&r(e,["setup","generationConfig","responseModalities"],a);const l=s(t,["temperature"]);e!==void 0&&l!=null&&r(e,["setup","generationConfig","temperature"],l);const u=s(t,["topP"]);e!==void 0&&u!=null&&r(e,["setup","generationConfig","topP"],u);const d=s(t,["topK"]);e!==void 0&&d!=null&&r(e,["setup","generationConfig","topK"],d);const c=s(t,["maxOutputTokens"]);e!==void 0&&c!=null&&r(e,["setup","generationConfig","maxOutputTokens"],c);const f=s(t,["mediaResolution"]);e!==void 0&&f!=null&&r(e,["setup","generationConfig","mediaResolution"],f);const p=s(t,["seed"]);e!==void 0&&p!=null&&r(e,["setup","generationConfig","seed"],p);const g=s(t,["speechConfig"]);e!==void 0&&g!=null&&r(e,["setup","generationConfig","speechConfig"],g);const h=s(t,["systemInstruction"]);e!==void 0&&h!=null&&r(e,["setup","systemInstruction"],Qn(o,R(o,h)));const m=s(t,["tools"]);if(e!==void 0&&m!=null){let E=ie(o,m);Array.isArray(E)&&(E=E.map(I=>io(o,oe(o,I)))),r(e,["setup","tools"],E)}const y=s(t,["sessionResumption"]);e!==void 0&&y!=null&&r(e,["setup","sessionResumption"],ro(o,y));const v=s(t,["inputAudioTranscription"]);e!==void 0&&v!=null&&r(e,["setup","inputAudioTranscription"],st());const C=s(t,["outputAudioTranscription"]);e!==void 0&&C!=null&&r(e,["setup","outputAudioTranscription"],st());const w=s(t,["realtimeInputConfig"]);e!==void 0&&w!=null&&r(e,["setup","realtimeInputConfig"],fo(o,w));const T=s(t,["contextWindowCompression"]);return e!==void 0&&T!=null&&r(e,["setup","contextWindowCompression"],mo(o,T)),n}function Co(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["setup","model"],A(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],yo(o,i,e)),e}function To(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["setup","model"],A(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],vo(o,i,e)),e}function wo(){return{}}function Eo(){return{}}function So(){return{}}function Io(){return{}}function bo(o,t){const e={},n=s(t,["media"]);n!=null&&r(e,["mediaChunks"],St(o,n));const i=s(t,["audio"]);i!=null&&r(e,["audio"],Ht(o,i));const a=s(t,["audioStreamEnd"]);a!=null&&r(e,["audioStreamEnd"],a);const l=s(t,["video"]);l!=null&&r(e,["video"],Gt(o,l));const u=s(t,["text"]);return u!=null&&r(e,["text"],u),s(t,["activityStart"])!=null&&r(e,["activityStart"],wo()),s(t,["activityEnd"])!=null&&r(e,["activityEnd"],So()),e}function Ao(o,t){const e={},n=s(t,["media"]);if(n!=null&&r(e,["mediaChunks"],St(o,n)),s(t,["audio"])!==void 0)throw new Error("audio parameter is not supported in Vertex AI.");const i=s(t,["audioStreamEnd"]);if(i!=null&&r(e,["audioStreamEnd"],i),s(t,["video"])!==void 0)throw new Error("video parameter is not supported in Vertex AI.");if(s(t,["text"])!==void 0)throw new Error("text parameter is not supported in Vertex AI.");return s(t,["activityStart"])!=null&&r(e,["activityStart"],Eo()),s(t,["activityEnd"])!=null&&r(e,["activityEnd"],Io()),e}function xo(){return{}}function _o(){return{}}function Ro(o,t){const e={},n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const i=s(t,["codeExecutionResult"]);i!=null&&r(e,["codeExecutionResult"],i);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const d=s(t,["functionResponse"]);d!=null&&r(e,["functionResponse"],d);const c=s(t,["inlineData"]);c!=null&&r(e,["inlineData"],c);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function ko(o,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const i=s(t,["thought"]);i!=null&&r(e,["thought"],i);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const u=s(t,["fileData"]);u!=null&&r(e,["fileData"],u);const d=s(t,["functionCall"]);d!=null&&r(e,["functionCall"],d);const c=s(t,["functionResponse"]);c!=null&&r(e,["functionResponse"],c);const f=s(t,["inlineData"]);f!=null&&r(e,["inlineData"],f);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function Mo(o,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Ro(o,l))),r(e,["parts"],a)}const i=s(t,["role"]);return i!=null&&r(e,["role"],i),e}function Po(o,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>ko(o,l))),r(e,["parts"],a)}const i=s(t,["role"]);return i!=null&&r(e,["role"],i),e}function rt(o,t){const e={},n=s(t,["text"]);n!=null&&r(e,["text"],n);const i=s(t,["finished"]);return i!=null&&r(e,["finished"],i),e}function at(o,t){const e={},n=s(t,["text"]);n!=null&&r(e,["text"],n);const i=s(t,["finished"]);return i!=null&&r(e,["finished"],i),e}function Do(o,t){const e={},n=s(t,["modelTurn"]);n!=null&&r(e,["modelTurn"],Mo(o,n));const i=s(t,["turnComplete"]);i!=null&&r(e,["turnComplete"],i);const a=s(t,["interrupted"]);a!=null&&r(e,["interrupted"],a);const l=s(t,["groundingMetadata"]);l!=null&&r(e,["groundingMetadata"],l);const u=s(t,["generationComplete"]);u!=null&&r(e,["generationComplete"],u);const d=s(t,["inputTranscription"]);d!=null&&r(e,["inputTranscription"],rt(o,d));const c=s(t,["outputTranscription"]);return c!=null&&r(e,["outputTranscription"],rt(o,c)),e}function No(o,t){const e={},n=s(t,["modelTurn"]);n!=null&&r(e,["modelTurn"],Po(o,n));const i=s(t,["turnComplete"]);i!=null&&r(e,["turnComplete"],i);const a=s(t,["interrupted"]);a!=null&&r(e,["interrupted"],a);const l=s(t,["groundingMetadata"]);l!=null&&r(e,["groundingMetadata"],l);const u=s(t,["generationComplete"]);u!=null&&r(e,["generationComplete"],u);const d=s(t,["inputTranscription"]);d!=null&&r(e,["inputTranscription"],at(o,d));const c=s(t,["outputTranscription"]);return c!=null&&r(e,["outputTranscription"],at(o,c)),e}function Lo(o,t){const e={},n=s(t,["id"]);n!=null&&r(e,["id"],n);const i=s(t,["args"]);i!=null&&r(e,["args"],i);const a=s(t,["name"]);return a!=null&&r(e,["name"],a),e}function Fo(o,t){const e={},n=s(t,["args"]);n!=null&&r(e,["args"],n);const i=s(t,["name"]);return i!=null&&r(e,["name"],i),e}function qo(o,t){const e={},n=s(t,["functionCalls"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(a=>Lo(o,a))),r(e,["functionCalls"],i)}return e}function Vo(o,t){const e={},n=s(t,["functionCalls"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(a=>Fo(o,a))),r(e,["functionCalls"],i)}return e}function Uo(o,t){const e={},n=s(t,["ids"]);return n!=null&&r(e,["ids"],n),e}function Bo(o,t){const e={},n=s(t,["ids"]);return n!=null&&r(e,["ids"],n),e}function Q(o,t){const e={},n=s(t,["modality"]);n!=null&&r(e,["modality"],n);const i=s(t,["tokenCount"]);return i!=null&&r(e,["tokenCount"],i),e}function X(o,t){const e={},n=s(t,["modality"]);n!=null&&r(e,["modality"],n);const i=s(t,["tokenCount"]);return i!=null&&r(e,["tokenCount"],i),e}function Go(o,t){const e={},n=s(t,["promptTokenCount"]);n!=null&&r(e,["promptTokenCount"],n);const i=s(t,["cachedContentTokenCount"]);i!=null&&r(e,["cachedContentTokenCount"],i);const a=s(t,["responseTokenCount"]);a!=null&&r(e,["responseTokenCount"],a);const l=s(t,["toolUsePromptTokenCount"]);l!=null&&r(e,["toolUsePromptTokenCount"],l);const u=s(t,["thoughtsTokenCount"]);u!=null&&r(e,["thoughtsTokenCount"],u);const d=s(t,["totalTokenCount"]);d!=null&&r(e,["totalTokenCount"],d);const c=s(t,["promptTokensDetails"]);if(c!=null){let h=c;Array.isArray(h)&&(h=h.map(m=>Q(o,m))),r(e,["promptTokensDetails"],h)}const f=s(t,["cacheTokensDetails"]);if(f!=null){let h=f;Array.isArray(h)&&(h=h.map(m=>Q(o,m))),r(e,["cacheTokensDetails"],h)}const p=s(t,["responseTokensDetails"]);if(p!=null){let h=p;Array.isArray(h)&&(h=h.map(m=>Q(o,m))),r(e,["responseTokensDetails"],h)}const g=s(t,["toolUsePromptTokensDetails"]);if(g!=null){let h=g;Array.isArray(h)&&(h=h.map(m=>Q(o,m))),r(e,["toolUsePromptTokensDetails"],h)}return e}function Ho(o,t){const e={},n=s(t,["promptTokenCount"]);n!=null&&r(e,["promptTokenCount"],n);const i=s(t,["cachedContentTokenCount"]);i!=null&&r(e,["cachedContentTokenCount"],i);const a=s(t,["candidatesTokenCount"]);a!=null&&r(e,["responseTokenCount"],a);const l=s(t,["toolUsePromptTokenCount"]);l!=null&&r(e,["toolUsePromptTokenCount"],l);const u=s(t,["thoughtsTokenCount"]);u!=null&&r(e,["thoughtsTokenCount"],u);const d=s(t,["totalTokenCount"]);d!=null&&r(e,["totalTokenCount"],d);const c=s(t,["promptTokensDetails"]);if(c!=null){let m=c;Array.isArray(m)&&(m=m.map(y=>X(o,y))),r(e,["promptTokensDetails"],m)}const f=s(t,["cacheTokensDetails"]);if(f!=null){let m=f;Array.isArray(m)&&(m=m.map(y=>X(o,y))),r(e,["cacheTokensDetails"],m)}const p=s(t,["candidatesTokensDetails"]);if(p!=null){let m=p;Array.isArray(m)&&(m=m.map(y=>X(o,y))),r(e,["responseTokensDetails"],m)}const g=s(t,["toolUsePromptTokensDetails"]);if(g!=null){let m=g;Array.isArray(m)&&(m=m.map(y=>X(o,y))),r(e,["toolUsePromptTokensDetails"],m)}const h=s(t,["trafficType"]);return h!=null&&r(e,["trafficType"],h),e}function $o(o,t){const e={},n=s(t,["timeLeft"]);return n!=null&&r(e,["timeLeft"],n),e}function Wo(o,t){const e={},n=s(t,["timeLeft"]);return n!=null&&r(e,["timeLeft"],n),e}function zo(o,t){const e={},n=s(t,["newHandle"]);n!=null&&r(e,["newHandle"],n);const i=s(t,["resumable"]);i!=null&&r(e,["resumable"],i);const a=s(t,["lastConsumedClientMessageIndex"]);return a!=null&&r(e,["lastConsumedClientMessageIndex"],a),e}function Oo(o,t){const e={},n=s(t,["newHandle"]);n!=null&&r(e,["newHandle"],n);const i=s(t,["resumable"]);i!=null&&r(e,["resumable"],i);const a=s(t,["lastConsumedClientMessageIndex"]);return a!=null&&r(e,["lastConsumedClientMessageIndex"],a),e}function Yo(o,t){const e={};s(t,["setupComplete"])!=null&&r(e,["setupComplete"],xo());const i=s(t,["serverContent"]);i!=null&&r(e,["serverContent"],Do(o,i));const a=s(t,["toolCall"]);a!=null&&r(e,["toolCall"],qo(o,a));const l=s(t,["toolCallCancellation"]);l!=null&&r(e,["toolCallCancellation"],Uo(o,l));const u=s(t,["usageMetadata"]);u!=null&&r(e,["usageMetadata"],Go(o,u));const d=s(t,["goAway"]);d!=null&&r(e,["goAway"],$o(o,d));const c=s(t,["sessionResumptionUpdate"]);return c!=null&&r(e,["sessionResumptionUpdate"],zo(o,c)),e}function Jo(o,t){const e={};s(t,["setupComplete"])!=null&&r(e,["setupComplete"],_o());const i=s(t,["serverContent"]);i!=null&&r(e,["serverContent"],No(o,i));const a=s(t,["toolCall"]);a!=null&&r(e,["toolCall"],Vo(o,a));const l=s(t,["toolCallCancellation"]);l!=null&&r(e,["toolCallCancellation"],Bo(o,l));const u=s(t,["usageMetadata"]);u!=null&&r(e,["usageMetadata"],Ho(o,u));const d=s(t,["goAway"]);d!=null&&r(e,["goAway"],Wo(o,d));const c=s(t,["sessionResumptionUpdate"]);return c!=null&&r(e,["sessionResumptionUpdate"],Oo(o,c)),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Ko(o,t){const e={};if(s(t,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const i=s(t,["codeExecutionResult"]);i!=null&&r(e,["codeExecutionResult"],i);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const d=s(t,["functionResponse"]);d!=null&&r(e,["functionResponse"],d);const c=s(t,["inlineData"]);c!=null&&r(e,["inlineData"],c);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function se(o,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Ko(o,l))),r(e,["parts"],a)}const i=s(t,["role"]);return i!=null&&r(e,["role"],i),e}function Qo(o,t){const e={};if(s(t,["method"])!==void 0)throw new Error("method parameter is not supported in Gemini API.");const n=s(t,["category"]);n!=null&&r(e,["category"],n);const i=s(t,["threshold"]);return i!=null&&r(e,["threshold"],i),e}function Xo(){return{}}function Zo(o,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const i=s(t,["dynamicThreshold"]);return i!=null&&r(e,["dynamicThreshold"],i),e}function jo(o,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],Zo(o,n)),e}function ei(o,t){const e={};if(s(t,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");s(t,["googleSearch"])!=null&&r(e,["googleSearch"],Xo());const i=s(t,["googleSearchRetrieval"]);i!=null&&r(e,["googleSearchRetrieval"],jo(o,i));const a=s(t,["codeExecution"]);a!=null&&r(e,["codeExecution"],a);const l=s(t,["functionDeclarations"]);return l!=null&&r(e,["functionDeclarations"],l),e}function ti(o,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const i=s(t,["allowedFunctionNames"]);return i!=null&&r(e,["allowedFunctionNames"],i),e}function ni(o,t){const e={},n=s(t,["functionCallingConfig"]);return n!=null&&r(e,["functionCallingConfig"],ti(o,n)),e}function oi(o,t){const e={},n=s(t,["voiceName"]);return n!=null&&r(e,["voiceName"],n),e}function ii(o,t){const e={},n=s(t,["prebuiltVoiceConfig"]);return n!=null&&r(e,["prebuiltVoiceConfig"],oi(o,n)),e}function si(o,t){const e={},n=s(t,["voiceConfig"]);n!=null&&r(e,["voiceConfig"],ii(o,n));const i=s(t,["languageCode"]);return i!=null&&r(e,["languageCode"],i),e}function ri(o,t){const e={},n=s(t,["includeThoughts"]);n!=null&&r(e,["includeThoughts"],n);const i=s(t,["thinkingBudget"]);return i!=null&&r(e,["thinkingBudget"],i),e}function ai(o,t,e){const n={},i=s(t,["systemInstruction"]);e!==void 0&&i!=null&&r(e,["systemInstruction"],se(o,R(o,i)));const a=s(t,["temperature"]);a!=null&&r(n,["temperature"],a);const l=s(t,["topP"]);l!=null&&r(n,["topP"],l);const u=s(t,["topK"]);u!=null&&r(n,["topK"],u);const d=s(t,["candidateCount"]);d!=null&&r(n,["candidateCount"],d);const c=s(t,["maxOutputTokens"]);c!=null&&r(n,["maxOutputTokens"],c);const f=s(t,["stopSequences"]);f!=null&&r(n,["stopSequences"],f);const p=s(t,["responseLogprobs"]);p!=null&&r(n,["responseLogprobs"],p);const g=s(t,["logprobs"]);g!=null&&r(n,["logprobs"],g);const h=s(t,["presencePenalty"]);h!=null&&r(n,["presencePenalty"],h);const m=s(t,["frequencyPenalty"]);m!=null&&r(n,["frequencyPenalty"],m);const y=s(t,["seed"]);y!=null&&r(n,["seed"],y);const v=s(t,["responseMimeType"]);v!=null&&r(n,["responseMimeType"],v);const C=s(t,["responseSchema"]);if(C!=null&&r(n,["responseSchema"],At(o,C)),s(t,["routingConfig"])!==void 0)throw new Error("routingConfig parameter is not supported in Gemini API.");if(s(t,["modelSelectionConfig"])!==void 0)throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");const w=s(t,["safetySettings"]);if(e!==void 0&&w!=null){let k=w;Array.isArray(k)&&(k=k.map(F=>Qo(o,F))),r(e,["safetySettings"],k)}const T=s(t,["tools"]);if(e!==void 0&&T!=null){let k=ie(o,T);Array.isArray(k)&&(k=k.map(F=>ei(o,oe(o,F)))),r(e,["tools"],k)}const E=s(t,["toolConfig"]);if(e!==void 0&&E!=null&&r(e,["toolConfig"],ni(o,E)),s(t,["labels"])!==void 0)throw new Error("labels parameter is not supported in Gemini API.");const I=s(t,["cachedContent"]);e!==void 0&&I!=null&&r(e,["cachedContent"],N(o,I));const U=s(t,["responseModalities"]);U!=null&&r(n,["responseModalities"],U);const B=s(t,["mediaResolution"]);B!=null&&r(n,["mediaResolution"],B);const G=s(t,["speechConfig"]);if(G!=null&&r(n,["speechConfig"],si(o,xt(o,G))),s(t,["audioTimestamp"])!==void 0)throw new Error("audioTimestamp parameter is not supported in Gemini API.");const H=s(t,["thinkingConfig"]);return H!=null&&r(n,["thinkingConfig"],ri(o,H)),n}function lt(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],A(o,n));const i=s(t,["contents"]);if(i!=null){let l=D(o,i);Array.isArray(l)&&(l=l.map(u=>se(o,u))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["generationConfig"],ai(o,a,e)),e}function li(o,t,e){const n={},i=s(t,["taskType"]);e!==void 0&&i!=null&&r(e,["requests[]","taskType"],i);const a=s(t,["title"]);e!==void 0&&a!=null&&r(e,["requests[]","title"],a);const l=s(t,["outputDimensionality"]);if(e!==void 0&&l!=null&&r(e,["requests[]","outputDimensionality"],l),s(t,["mimeType"])!==void 0)throw new Error("mimeType parameter is not supported in Gemini API.");if(s(t,["autoTruncate"])!==void 0)throw new Error("autoTruncate parameter is not supported in Gemini API.");return n}function ui(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],A(o,n));const i=s(t,["contents"]);i!=null&&r(e,["requests[]","content"],bt(o,i));const a=s(t,["config"]);a!=null&&r(e,["config"],li(o,a,e));const l=s(t,["model"]);return l!==void 0&&r(e,["requests[]","model"],A(o,l)),e}function ci(o,t,e){const n={};if(s(t,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(s(t,["negativePrompt"])!==void 0)throw new Error("negativePrompt parameter is not supported in Gemini API.");const i=s(t,["numberOfImages"]);e!==void 0&&i!=null&&r(e,["parameters","sampleCount"],i);const a=s(t,["aspectRatio"]);e!==void 0&&a!=null&&r(e,["parameters","aspectRatio"],a);const l=s(t,["guidanceScale"]);if(e!==void 0&&l!=null&&r(e,["parameters","guidanceScale"],l),s(t,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const u=s(t,["safetyFilterLevel"]);e!==void 0&&u!=null&&r(e,["parameters","safetySetting"],u);const d=s(t,["personGeneration"]);e!==void 0&&d!=null&&r(e,["parameters","personGeneration"],d);const c=s(t,["includeSafetyAttributes"]);e!==void 0&&c!=null&&r(e,["parameters","includeSafetyAttributes"],c);const f=s(t,["includeRaiReason"]);e!==void 0&&f!=null&&r(e,["parameters","includeRaiReason"],f);const p=s(t,["language"]);e!==void 0&&p!=null&&r(e,["parameters","language"],p);const g=s(t,["outputMimeType"]);e!==void 0&&g!=null&&r(e,["parameters","outputOptions","mimeType"],g);const h=s(t,["outputCompressionQuality"]);if(e!==void 0&&h!=null&&r(e,["parameters","outputOptions","compressionQuality"],h),s(t,["addWatermark"])!==void 0)throw new Error("addWatermark parameter is not supported in Gemini API.");if(s(t,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return n}function di(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],A(o,n));const i=s(t,["prompt"]);i!=null&&r(e,["instances[0]","prompt"],i);const a=s(t,["config"]);return a!=null&&r(e,["config"],ci(o,a,e)),e}function fi(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],A(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function pi(o,t,e){const n={},i=s(t,["displayName"]);e!==void 0&&i!=null&&r(e,["displayName"],i);const a=s(t,["description"]);return e!==void 0&&a!=null&&r(e,["description"],a),n}function hi(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],A(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],pi(o,i,e)),e}function gi(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],A(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function mi(o,t){const e={};if(s(t,["systemInstruction"])!==void 0)throw new Error("systemInstruction parameter is not supported in Gemini API.");if(s(t,["tools"])!==void 0)throw new Error("tools parameter is not supported in Gemini API.");if(s(t,["generationConfig"])!==void 0)throw new Error("generationConfig parameter is not supported in Gemini API.");return e}function yi(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],A(o,n));const i=s(t,["contents"]);if(i!=null){let l=D(o,i);Array.isArray(l)&&(l=l.map(u=>se(o,u))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["config"],mi(o,a)),e}function vi(o,t){const e={};if(s(t,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");const n=s(t,["imageBytes"]);n!=null&&r(e,["bytesBase64Encoded"],L(o,n));const i=s(t,["mimeType"]);return i!=null&&r(e,["mimeType"],i),e}function Ci(o,t,e){const n={},i=s(t,["numberOfVideos"]);if(e!==void 0&&i!=null&&r(e,["parameters","sampleCount"],i),s(t,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(s(t,["fps"])!==void 0)throw new Error("fps parameter is not supported in Gemini API.");const a=s(t,["durationSeconds"]);if(e!==void 0&&a!=null&&r(e,["parameters","durationSeconds"],a),s(t,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const l=s(t,["aspectRatio"]);if(e!==void 0&&l!=null&&r(e,["parameters","aspectRatio"],l),s(t,["resolution"])!==void 0)throw new Error("resolution parameter is not supported in Gemini API.");const u=s(t,["personGeneration"]);if(e!==void 0&&u!=null&&r(e,["parameters","personGeneration"],u),s(t,["pubsubTopic"])!==void 0)throw new Error("pubsubTopic parameter is not supported in Gemini API.");const d=s(t,["negativePrompt"]);if(e!==void 0&&d!=null&&r(e,["parameters","negativePrompt"],d),s(t,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return n}function Ti(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],A(o,n));const i=s(t,["prompt"]);i!=null&&r(e,["instances[0]","prompt"],i);const a=s(t,["image"]);a!=null&&r(e,["instances[0]","image"],vi(o,a));const l=s(t,["config"]);return l!=null&&r(e,["config"],Ci(o,l,e)),e}function wi(o,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const i=s(t,["thought"]);i!=null&&r(e,["thought"],i);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const u=s(t,["fileData"]);u!=null&&r(e,["fileData"],u);const d=s(t,["functionCall"]);d!=null&&r(e,["functionCall"],d);const c=s(t,["functionResponse"]);c!=null&&r(e,["functionResponse"],c);const f=s(t,["inlineData"]);f!=null&&r(e,["inlineData"],f);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function V(o,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>wi(o,l))),r(e,["parts"],a)}const i=s(t,["role"]);return i!=null&&r(e,["role"],i),e}function Ei(o,t){const e={},n=s(t,["featureSelectionPreference"]);return n!=null&&r(e,["featureSelectionPreference"],n),e}function Si(o,t){const e={},n=s(t,["method"]);n!=null&&r(e,["method"],n);const i=s(t,["category"]);i!=null&&r(e,["category"],i);const a=s(t,["threshold"]);return a!=null&&r(e,["threshold"],a),e}function Ii(){return{}}function bi(o,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const i=s(t,["dynamicThreshold"]);return i!=null&&r(e,["dynamicThreshold"],i),e}function Ai(o,t){const e={},n=s(t,["dynamicRetrievalConfig"]);return n!=null&&r(e,["dynamicRetrievalConfig"],bi(o,n)),e}function Mt(o,t){const e={},n=s(t,["retrieval"]);n!=null&&r(e,["retrieval"],n),s(t,["googleSearch"])!=null&&r(e,["googleSearch"],Ii());const a=s(t,["googleSearchRetrieval"]);a!=null&&r(e,["googleSearchRetrieval"],Ai(o,a));const l=s(t,["codeExecution"]);l!=null&&r(e,["codeExecution"],l);const u=s(t,["functionDeclarations"]);return u!=null&&r(e,["functionDeclarations"],u),e}function xi(o,t){const e={},n=s(t,["mode"]);n!=null&&r(e,["mode"],n);const i=s(t,["allowedFunctionNames"]);return i!=null&&r(e,["allowedFunctionNames"],i),e}function _i(o,t){const e={},n=s(t,["functionCallingConfig"]);return n!=null&&r(e,["functionCallingConfig"],xi(o,n)),e}function Ri(o,t){const e={},n=s(t,["voiceName"]);return n!=null&&r(e,["voiceName"],n),e}function ki(o,t){const e={},n=s(t,["prebuiltVoiceConfig"]);return n!=null&&r(e,["prebuiltVoiceConfig"],Ri(o,n)),e}function Mi(o,t){const e={},n=s(t,["voiceConfig"]);n!=null&&r(e,["voiceConfig"],ki(o,n));const i=s(t,["languageCode"]);return i!=null&&r(e,["languageCode"],i),e}function Pi(o,t){const e={},n=s(t,["includeThoughts"]);n!=null&&r(e,["includeThoughts"],n);const i=s(t,["thinkingBudget"]);return i!=null&&r(e,["thinkingBudget"],i),e}function Di(o,t,e){const n={},i=s(t,["systemInstruction"]);e!==void 0&&i!=null&&r(e,["systemInstruction"],V(o,R(o,i)));const a=s(t,["temperature"]);a!=null&&r(n,["temperature"],a);const l=s(t,["topP"]);l!=null&&r(n,["topP"],l);const u=s(t,["topK"]);u!=null&&r(n,["topK"],u);const d=s(t,["candidateCount"]);d!=null&&r(n,["candidateCount"],d);const c=s(t,["maxOutputTokens"]);c!=null&&r(n,["maxOutputTokens"],c);const f=s(t,["stopSequences"]);f!=null&&r(n,["stopSequences"],f);const p=s(t,["responseLogprobs"]);p!=null&&r(n,["responseLogprobs"],p);const g=s(t,["logprobs"]);g!=null&&r(n,["logprobs"],g);const h=s(t,["presencePenalty"]);h!=null&&r(n,["presencePenalty"],h);const m=s(t,["frequencyPenalty"]);m!=null&&r(n,["frequencyPenalty"],m);const y=s(t,["seed"]);y!=null&&r(n,["seed"],y);const v=s(t,["responseMimeType"]);v!=null&&r(n,["responseMimeType"],v);const C=s(t,["responseSchema"]);C!=null&&r(n,["responseSchema"],At(o,C));const w=s(t,["routingConfig"]);w!=null&&r(n,["routingConfig"],w);const T=s(t,["modelSelectionConfig"]);T!=null&&r(n,["modelConfig"],Ei(o,T));const E=s(t,["safetySettings"]);if(e!==void 0&&E!=null){let M=E;Array.isArray(M)&&(M=M.map(re=>Si(o,re))),r(e,["safetySettings"],M)}const I=s(t,["tools"]);if(e!==void 0&&I!=null){let M=ie(o,I);Array.isArray(M)&&(M=M.map(re=>Mt(o,oe(o,re)))),r(e,["tools"],M)}const U=s(t,["toolConfig"]);e!==void 0&&U!=null&&r(e,["toolConfig"],_i(o,U));const B=s(t,["labels"]);e!==void 0&&B!=null&&r(e,["labels"],B);const G=s(t,["cachedContent"]);e!==void 0&&G!=null&&r(e,["cachedContent"],N(o,G));const H=s(t,["responseModalities"]);H!=null&&r(n,["responseModalities"],H);const k=s(t,["mediaResolution"]);k!=null&&r(n,["mediaResolution"],k);const F=s(t,["speechConfig"]);F!=null&&r(n,["speechConfig"],Mi(o,xt(o,F)));const ge=s(t,["audioTimestamp"]);ge!=null&&r(n,["audioTimestamp"],ge);const me=s(t,["thinkingConfig"]);return me!=null&&r(n,["thinkingConfig"],Pi(o,me)),n}function ut(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],A(o,n));const i=s(t,["contents"]);if(i!=null){let l=D(o,i);Array.isArray(l)&&(l=l.map(u=>V(o,u))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["generationConfig"],Di(o,a,e)),e}function Ni(o,t,e){const n={},i=s(t,["taskType"]);e!==void 0&&i!=null&&r(e,["instances[]","task_type"],i);const a=s(t,["title"]);e!==void 0&&a!=null&&r(e,["instances[]","title"],a);const l=s(t,["outputDimensionality"]);e!==void 0&&l!=null&&r(e,["parameters","outputDimensionality"],l);const u=s(t,["mimeType"]);e!==void 0&&u!=null&&r(e,["instances[]","mimeType"],u);const d=s(t,["autoTruncate"]);return e!==void 0&&d!=null&&r(e,["parameters","autoTruncate"],d),n}function Li(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],A(o,n));const i=s(t,["contents"]);i!=null&&r(e,["instances[]","content"],bt(o,i));const a=s(t,["config"]);return a!=null&&r(e,["config"],Ni(o,a,e)),e}function Fi(o,t,e){const n={},i=s(t,["outputGcsUri"]);e!==void 0&&i!=null&&r(e,["parameters","storageUri"],i);const a=s(t,["negativePrompt"]);e!==void 0&&a!=null&&r(e,["parameters","negativePrompt"],a);const l=s(t,["numberOfImages"]);e!==void 0&&l!=null&&r(e,["parameters","sampleCount"],l);const u=s(t,["aspectRatio"]);e!==void 0&&u!=null&&r(e,["parameters","aspectRatio"],u);const d=s(t,["guidanceScale"]);e!==void 0&&d!=null&&r(e,["parameters","guidanceScale"],d);const c=s(t,["seed"]);e!==void 0&&c!=null&&r(e,["parameters","seed"],c);const f=s(t,["safetyFilterLevel"]);e!==void 0&&f!=null&&r(e,["parameters","safetySetting"],f);const p=s(t,["personGeneration"]);e!==void 0&&p!=null&&r(e,["parameters","personGeneration"],p);const g=s(t,["includeSafetyAttributes"]);e!==void 0&&g!=null&&r(e,["parameters","includeSafetyAttributes"],g);const h=s(t,["includeRaiReason"]);e!==void 0&&h!=null&&r(e,["parameters","includeRaiReason"],h);const m=s(t,["language"]);e!==void 0&&m!=null&&r(e,["parameters","language"],m);const y=s(t,["outputMimeType"]);e!==void 0&&y!=null&&r(e,["parameters","outputOptions","mimeType"],y);const v=s(t,["outputCompressionQuality"]);e!==void 0&&v!=null&&r(e,["parameters","outputOptions","compressionQuality"],v);const C=s(t,["addWatermark"]);e!==void 0&&C!=null&&r(e,["parameters","addWatermark"],C);const w=s(t,["enhancePrompt"]);return e!==void 0&&w!=null&&r(e,["parameters","enhancePrompt"],w),n}function qi(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],A(o,n));const i=s(t,["prompt"]);i!=null&&r(e,["instances[0]","prompt"],i);const a=s(t,["config"]);return a!=null&&r(e,["config"],Fi(o,a,e)),e}function Vi(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],A(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function Ui(o,t,e){const n={},i=s(t,["displayName"]);e!==void 0&&i!=null&&r(e,["displayName"],i);const a=s(t,["description"]);return e!==void 0&&a!=null&&r(e,["description"],a),n}function Bi(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],A(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],Ui(o,i,e)),e}function Gi(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","name"],A(o,n));const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function Hi(o,t,e){const n={},i=s(t,["systemInstruction"]);e!==void 0&&i!=null&&r(e,["systemInstruction"],V(o,R(o,i)));const a=s(t,["tools"]);if(e!==void 0&&a!=null){let u=a;Array.isArray(u)&&(u=u.map(d=>Mt(o,d))),r(e,["tools"],u)}const l=s(t,["generationConfig"]);return e!==void 0&&l!=null&&r(e,["generationConfig"],l),n}function $i(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],A(o,n));const i=s(t,["contents"]);if(i!=null){let l=D(o,i);Array.isArray(l)&&(l=l.map(u=>V(o,u))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["config"],Hi(o,a,e)),e}function Wi(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],A(o,n));const i=s(t,["contents"]);if(i!=null){let l=D(o,i);Array.isArray(l)&&(l=l.map(u=>V(o,u))),r(e,["contents"],l)}const a=s(t,["config"]);return a!=null&&r(e,["config"],a),e}function zi(o,t){const e={},n=s(t,["gcsUri"]);n!=null&&r(e,["gcsUri"],n);const i=s(t,["imageBytes"]);i!=null&&r(e,["bytesBase64Encoded"],L(o,i));const a=s(t,["mimeType"]);return a!=null&&r(e,["mimeType"],a),e}function Oi(o,t,e){const n={},i=s(t,["numberOfVideos"]);e!==void 0&&i!=null&&r(e,["parameters","sampleCount"],i);const a=s(t,["outputGcsUri"]);e!==void 0&&a!=null&&r(e,["parameters","storageUri"],a);const l=s(t,["fps"]);e!==void 0&&l!=null&&r(e,["parameters","fps"],l);const u=s(t,["durationSeconds"]);e!==void 0&&u!=null&&r(e,["parameters","durationSeconds"],u);const d=s(t,["seed"]);e!==void 0&&d!=null&&r(e,["parameters","seed"],d);const c=s(t,["aspectRatio"]);e!==void 0&&c!=null&&r(e,["parameters","aspectRatio"],c);const f=s(t,["resolution"]);e!==void 0&&f!=null&&r(e,["parameters","resolution"],f);const p=s(t,["personGeneration"]);e!==void 0&&p!=null&&r(e,["parameters","personGeneration"],p);const g=s(t,["pubsubTopic"]);e!==void 0&&g!=null&&r(e,["parameters","pubsubTopic"],g);const h=s(t,["negativePrompt"]);e!==void 0&&h!=null&&r(e,["parameters","negativePrompt"],h);const m=s(t,["enhancePrompt"]);return e!==void 0&&m!=null&&r(e,["parameters","enhancePrompt"],m),n}function Yi(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["_url","model"],A(o,n));const i=s(t,["prompt"]);i!=null&&r(e,["instances[0]","prompt"],i);const a=s(t,["image"]);a!=null&&r(e,["instances[0]","image"],zi(o,a));const l=s(t,["config"]);return l!=null&&r(e,["config"],Oi(o,l,e)),e}function Ji(o,t){const e={},n=s(t,["thought"]);n!=null&&r(e,["thought"],n);const i=s(t,["codeExecutionResult"]);i!=null&&r(e,["codeExecutionResult"],i);const a=s(t,["executableCode"]);a!=null&&r(e,["executableCode"],a);const l=s(t,["fileData"]);l!=null&&r(e,["fileData"],l);const u=s(t,["functionCall"]);u!=null&&r(e,["functionCall"],u);const d=s(t,["functionResponse"]);d!=null&&r(e,["functionResponse"],d);const c=s(t,["inlineData"]);c!=null&&r(e,["inlineData"],c);const f=s(t,["text"]);return f!=null&&r(e,["text"],f),e}function Ki(o,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Ji(o,l))),r(e,["parts"],a)}const i=s(t,["role"]);return i!=null&&r(e,["role"],i),e}function Qi(o,t){const e={},n=s(t,["citationSources"]);return n!=null&&r(e,["citations"],n),e}function Xi(o,t){const e={},n=s(t,["content"]);n!=null&&r(e,["content"],Ki(o,n));const i=s(t,["citationMetadata"]);i!=null&&r(e,["citationMetadata"],Qi(o,i));const a=s(t,["tokenCount"]);a!=null&&r(e,["tokenCount"],a);const l=s(t,["finishReason"]);l!=null&&r(e,["finishReason"],l);const u=s(t,["avgLogprobs"]);u!=null&&r(e,["avgLogprobs"],u);const d=s(t,["groundingMetadata"]);d!=null&&r(e,["groundingMetadata"],d);const c=s(t,["index"]);c!=null&&r(e,["index"],c);const f=s(t,["logprobsResult"]);f!=null&&r(e,["logprobsResult"],f);const p=s(t,["safetyRatings"]);return p!=null&&r(e,["safetyRatings"],p),e}function ct(o,t){const e={},n=s(t,["candidates"]);if(n!=null){let u=n;Array.isArray(u)&&(u=u.map(d=>Xi(o,d))),r(e,["candidates"],u)}const i=s(t,["modelVersion"]);i!=null&&r(e,["modelVersion"],i);const a=s(t,["promptFeedback"]);a!=null&&r(e,["promptFeedback"],a);const l=s(t,["usageMetadata"]);return l!=null&&r(e,["usageMetadata"],l),e}function Zi(o,t){const e={},n=s(t,["values"]);return n!=null&&r(e,["values"],n),e}function ji(){return{}}function es(o,t){const e={},n=s(t,["embeddings"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Zi(o,l))),r(e,["embeddings"],a)}return s(t,["metadata"])!=null&&r(e,["metadata"],ji()),e}function ts(o,t){const e={},n=s(t,["bytesBase64Encoded"]);n!=null&&r(e,["imageBytes"],L(o,n));const i=s(t,["mimeType"]);return i!=null&&r(e,["mimeType"],i),e}function Pt(o,t){const e={},n=s(t,["safetyAttributes","categories"]);n!=null&&r(e,["categories"],n);const i=s(t,["safetyAttributes","scores"]);i!=null&&r(e,["scores"],i);const a=s(t,["contentType"]);return a!=null&&r(e,["contentType"],a),e}function ns(o,t){const e={},n=s(t,["_self"]);n!=null&&r(e,["image"],ts(o,n));const i=s(t,["raiFilteredReason"]);i!=null&&r(e,["raiFilteredReason"],i);const a=s(t,["_self"]);return a!=null&&r(e,["safetyAttributes"],Pt(o,a)),e}function os(o,t){const e={},n=s(t,["predictions"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>ns(o,l))),r(e,["generatedImages"],a)}const i=s(t,["positivePromptSafetyAttributes"]);return i!=null&&r(e,["positivePromptSafetyAttributes"],Pt(o,i)),e}function is(o,t){const e={},n=s(t,["baseModel"]);n!=null&&r(e,["baseModel"],n);const i=s(t,["createTime"]);i!=null&&r(e,["createTime"],i);const a=s(t,["updateTime"]);return a!=null&&r(e,["updateTime"],a),e}function dt(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const i=s(t,["displayName"]);i!=null&&r(e,["displayName"],i);const a=s(t,["description"]);a!=null&&r(e,["description"],a);const l=s(t,["version"]);l!=null&&r(e,["version"],l);const u=s(t,["_self"]);u!=null&&r(e,["tunedModelInfo"],is(o,u));const d=s(t,["inputTokenLimit"]);d!=null&&r(e,["inputTokenLimit"],d);const c=s(t,["outputTokenLimit"]);c!=null&&r(e,["outputTokenLimit"],c);const f=s(t,["supportedGenerationMethods"]);return f!=null&&r(e,["supportedActions"],f),e}function ss(){return{}}function rs(o,t){const e={},n=s(t,["totalTokens"]);n!=null&&r(e,["totalTokens"],n);const i=s(t,["cachedContentTokenCount"]);return i!=null&&r(e,["cachedContentTokenCount"],i),e}function as(o,t){const e={},n=s(t,["video","uri"]);n!=null&&r(e,["uri"],n);const i=s(t,["video","encodedVideo"]);i!=null&&r(e,["videoBytes"],L(o,i));const a=s(t,["encoding"]);return a!=null&&r(e,["mimeType"],a),e}function ls(o,t){const e={},n=s(t,["_self"]);return n!=null&&r(e,["video"],as(o,n)),e}function us(o,t){const e={},n=s(t,["generatedSamples"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(u=>ls(o,u))),r(e,["generatedVideos"],l)}const i=s(t,["raiMediaFilteredCount"]);i!=null&&r(e,["raiMediaFilteredCount"],i);const a=s(t,["raiMediaFilteredReasons"]);return a!=null&&r(e,["raiMediaFilteredReasons"],a),e}function cs(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const i=s(t,["metadata"]);i!=null&&r(e,["metadata"],i);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);l!=null&&r(e,["error"],l);const u=s(t,["response","generateVideoResponse"]);return u!=null&&r(e,["response"],us(o,u)),e}function ds(o,t){const e={},n=s(t,["videoMetadata"]);n!=null&&r(e,["videoMetadata"],n);const i=s(t,["thought"]);i!=null&&r(e,["thought"],i);const a=s(t,["codeExecutionResult"]);a!=null&&r(e,["codeExecutionResult"],a);const l=s(t,["executableCode"]);l!=null&&r(e,["executableCode"],l);const u=s(t,["fileData"]);u!=null&&r(e,["fileData"],u);const d=s(t,["functionCall"]);d!=null&&r(e,["functionCall"],d);const c=s(t,["functionResponse"]);c!=null&&r(e,["functionResponse"],c);const f=s(t,["inlineData"]);f!=null&&r(e,["inlineData"],f);const p=s(t,["text"]);return p!=null&&r(e,["text"],p),e}function fs(o,t){const e={},n=s(t,["parts"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>ds(o,l))),r(e,["parts"],a)}const i=s(t,["role"]);return i!=null&&r(e,["role"],i),e}function ps(o,t){const e={},n=s(t,["citations"]);return n!=null&&r(e,["citations"],n),e}function hs(o,t){const e={},n=s(t,["content"]);n!=null&&r(e,["content"],fs(o,n));const i=s(t,["citationMetadata"]);i!=null&&r(e,["citationMetadata"],ps(o,i));const a=s(t,["finishMessage"]);a!=null&&r(e,["finishMessage"],a);const l=s(t,["finishReason"]);l!=null&&r(e,["finishReason"],l);const u=s(t,["avgLogprobs"]);u!=null&&r(e,["avgLogprobs"],u);const d=s(t,["groundingMetadata"]);d!=null&&r(e,["groundingMetadata"],d);const c=s(t,["index"]);c!=null&&r(e,["index"],c);const f=s(t,["logprobsResult"]);f!=null&&r(e,["logprobsResult"],f);const p=s(t,["safetyRatings"]);return p!=null&&r(e,["safetyRatings"],p),e}function ft(o,t){const e={},n=s(t,["candidates"]);if(n!=null){let c=n;Array.isArray(c)&&(c=c.map(f=>hs(o,f))),r(e,["candidates"],c)}const i=s(t,["createTime"]);i!=null&&r(e,["createTime"],i);const a=s(t,["responseId"]);a!=null&&r(e,["responseId"],a);const l=s(t,["modelVersion"]);l!=null&&r(e,["modelVersion"],l);const u=s(t,["promptFeedback"]);u!=null&&r(e,["promptFeedback"],u);const d=s(t,["usageMetadata"]);return d!=null&&r(e,["usageMetadata"],d),e}function gs(o,t){const e={},n=s(t,["truncated"]);n!=null&&r(e,["truncated"],n);const i=s(t,["token_count"]);return i!=null&&r(e,["tokenCount"],i),e}function ms(o,t){const e={},n=s(t,["values"]);n!=null&&r(e,["values"],n);const i=s(t,["statistics"]);return i!=null&&r(e,["statistics"],gs(o,i)),e}function ys(o,t){const e={},n=s(t,["billableCharacterCount"]);return n!=null&&r(e,["billableCharacterCount"],n),e}function vs(o,t){const e={},n=s(t,["predictions[]","embeddings"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>ms(o,l))),r(e,["embeddings"],a)}const i=s(t,["metadata"]);return i!=null&&r(e,["metadata"],ys(o,i)),e}function Cs(o,t){const e={},n=s(t,["gcsUri"]);n!=null&&r(e,["gcsUri"],n);const i=s(t,["bytesBase64Encoded"]);i!=null&&r(e,["imageBytes"],L(o,i));const a=s(t,["mimeType"]);return a!=null&&r(e,["mimeType"],a),e}function Dt(o,t){const e={},n=s(t,["safetyAttributes","categories"]);n!=null&&r(e,["categories"],n);const i=s(t,["safetyAttributes","scores"]);i!=null&&r(e,["scores"],i);const a=s(t,["contentType"]);return a!=null&&r(e,["contentType"],a),e}function Ts(o,t){const e={},n=s(t,["_self"]);n!=null&&r(e,["image"],Cs(o,n));const i=s(t,["raiFilteredReason"]);i!=null&&r(e,["raiFilteredReason"],i);const a=s(t,["_self"]);a!=null&&r(e,["safetyAttributes"],Dt(o,a));const l=s(t,["prompt"]);return l!=null&&r(e,["enhancedPrompt"],l),e}function ws(o,t){const e={},n=s(t,["predictions"]);if(n!=null){let a=n;Array.isArray(a)&&(a=a.map(l=>Ts(o,l))),r(e,["generatedImages"],a)}const i=s(t,["positivePromptSafetyAttributes"]);return i!=null&&r(e,["positivePromptSafetyAttributes"],Dt(o,i)),e}function Es(o,t){const e={},n=s(t,["endpoint"]);n!=null&&r(e,["name"],n);const i=s(t,["deployedModelId"]);return i!=null&&r(e,["deployedModelId"],i),e}function Ss(o,t){const e={},n=s(t,["labels","google-vertex-llm-tuning-base-model-id"]);n!=null&&r(e,["baseModel"],n);const i=s(t,["createTime"]);i!=null&&r(e,["createTime"],i);const a=s(t,["updateTime"]);return a!=null&&r(e,["updateTime"],a),e}function pt(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const i=s(t,["displayName"]);i!=null&&r(e,["displayName"],i);const a=s(t,["description"]);a!=null&&r(e,["description"],a);const l=s(t,["versionId"]);l!=null&&r(e,["version"],l);const u=s(t,["deployedModels"]);if(u!=null){let f=u;Array.isArray(f)&&(f=f.map(p=>Es(o,p))),r(e,["endpoints"],f)}const d=s(t,["labels"]);d!=null&&r(e,["labels"],d);const c=s(t,["_self"]);return c!=null&&r(e,["tunedModelInfo"],Ss(o,c)),e}function Is(){return{}}function bs(o,t){const e={},n=s(t,["totalTokens"]);return n!=null&&r(e,["totalTokens"],n),e}function As(o,t){const e={},n=s(t,["tokensInfo"]);return n!=null&&r(e,["tokensInfo"],n),e}function xs(o,t){const e={},n=s(t,["gcsUri"]);n!=null&&r(e,["uri"],n);const i=s(t,["bytesBase64Encoded"]);i!=null&&r(e,["videoBytes"],L(o,i));const a=s(t,["mimeType"]);return a!=null&&r(e,["mimeType"],a),e}function _s(o,t){const e={},n=s(t,["_self"]);return n!=null&&r(e,["video"],xs(o,n)),e}function Rs(o,t){const e={},n=s(t,["videos"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(u=>_s(o,u))),r(e,["generatedVideos"],l)}const i=s(t,["raiMediaFilteredCount"]);i!=null&&r(e,["raiMediaFilteredCount"],i);const a=s(t,["raiMediaFilteredReasons"]);return a!=null&&r(e,["raiMediaFilteredReasons"],a),e}function ks(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const i=s(t,["metadata"]);i!=null&&r(e,["metadata"],i);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);l!=null&&r(e,["error"],l);const u=s(t,["response"]);return u!=null&&r(e,["response"],Rs(o,u)),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ms="FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";async function Ps(o,t,e){let n,i;e.data instanceof Blob?i=JSON.parse(await e.data.text()):i=JSON.parse(e.data),o.isVertexAI()?n=Jo(o,i):n=Yo(o,i),t(n)}class Ds{constructor(t,e,n){this.apiClient=t,this.auth=e,this.webSocketFactory=n}async connect(t){var e,n,i,a;const l=this.apiClient.getWebsocketBaseUrl(),u=this.apiClient.getApiVersion();let d;const c=qs(this.apiClient.getDefaultHeaders());if(this.apiClient.isVertexAI())d=`${l}/ws/google.cloud.aiplatform.${u}.LlmBidiService/BidiGenerateContent`,await this.auth.addAuthHeaders(c);else{const E=this.apiClient.getApiKey();d=`${l}/ws/google.ai.generativelanguage.${u}.GenerativeService.BidiGenerateContent?key=${E}`}let f=()=>{};const p=new Promise(E=>{f=E}),g=t.callbacks,h=function(){var E;(E=g==null?void 0:g.onopen)===null||E===void 0||E.call(g),f({})},m=this.apiClient,y={onopen:h,onmessage:E=>{Ps(m,g.onmessage,E)},onerror:(e=g==null?void 0:g.onerror)!==null&&e!==void 0?e:function(E){},onclose:(n=g==null?void 0:g.onclose)!==null&&n!==void 0?n:function(E){}},v=this.webSocketFactory.create(d,Fs(c),y);v.connect(),await p;let C=A(this.apiClient,t.model);if(this.apiClient.isVertexAI()&&C.startsWith("publishers/")){const E=this.apiClient.getProject(),I=this.apiClient.getLocation();C=`projects/${E}/locations/${I}/`+C}let w={};this.apiClient.isVertexAI()&&((i=t.config)===null||i===void 0?void 0:i.responseModalities)===void 0&&(t.config===void 0?t.config={responseModalities:[te.AUDIO]}:t.config.responseModalities=[te.AUDIO]),!((a=t.config)===null||a===void 0)&&a.generationConfig&&console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");const T={model:C,config:t.config,callbacks:t.callbacks};return this.apiClient.isVertexAI()?w=To(this.apiClient,T):w=Co(this.apiClient,T),delete w.config,v.send(JSON.stringify(w)),new Ls(v,this.apiClient)}}const Ns={turnComplete:!0};class Ls{constructor(t,e){this.conn=t,this.apiClient=e}tLiveClientContent(t,e){if(e.turns!==null&&e.turns!==void 0){let n=[];try{n=D(t,e.turns),t.isVertexAI()?n=n.map(i=>V(t,i)):n=n.map(i=>se(t,i))}catch{throw new Error(`Failed to parse client content "turns", type: '${typeof e.turns}'`)}return{clientContent:{turns:n,turnComplete:e.turnComplete}}}return{clientContent:{turnComplete:e.turnComplete}}}tLiveClienttToolResponse(t,e){let n=[];if(e.functionResponses==null)throw new Error("functionResponses is required.");if(Array.isArray(e.functionResponses)?n=e.functionResponses:n=[e.functionResponses],n.length===0)throw new Error("functionResponses is required.");for(const a of n){if(typeof a!="object"||a===null||!("name"in a)||!("response"in a))throw new Error(`Could not parse function response, type '${typeof a}'.`);if(!t.isVertexAI()&&!("id"in a))throw new Error(Ms)}return{toolResponse:{functionResponses:n}}}sendClientContent(t){t=Object.assign(Object.assign({},Ns),t);const e=this.tLiveClientContent(this.apiClient,t);this.conn.send(JSON.stringify(e))}sendRealtimeInput(t){let e={};this.apiClient.isVertexAI()?e={realtimeInput:Ao(this.apiClient,t)}:e={realtimeInput:bo(this.apiClient,t)},this.conn.send(JSON.stringify(e))}sendToolResponse(t){if(t.functionResponses==null)throw new Error("Tool response parameters are required.");const e=this.tLiveClienttToolResponse(this.apiClient,t);this.conn.send(JSON.stringify(e))}close(){this.conn.close()}}function Fs(o){const t={};return o.forEach((e,n)=>{t[n]=e}),t}function qs(o){const t=new Headers;for(const[e,n]of Object.entries(o))t.append(e,n);return t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Vs extends J{constructor(t){super(),this.apiClient=t,this.generateContent=async e=>await this.generateContentInternal(e),this.generateContentStream=async e=>await this.generateContentStreamInternal(e),this.generateImages=async e=>await this.generateImagesInternal(e).then(n=>{var i;let a;const l=[];if(n!=null&&n.generatedImages)for(const d of n.generatedImages)d&&(d!=null&&d.safetyAttributes)&&((i=d==null?void 0:d.safetyAttributes)===null||i===void 0?void 0:i.contentType)==="Positive Prompt"?a=d==null?void 0:d.safetyAttributes:l.push(d);let u;return a?u={generatedImages:l,positivePromptSafetyAttributes:a}:u={generatedImages:l},u})}async generateContentInternal(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=ut(this.apiClient,t);return u=S("{model}:generateContent",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>{const p=ft(this.apiClient,f),g=new K;return Object.assign(g,p),g})}else{const c=lt(this.apiClient,t);return u=S("{model}:generateContent",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>{const p=ct(this.apiClient,f),g=new K;return Object.assign(g,p),g})}}async generateContentStreamInternal(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=ut(this.apiClient,t);u=S("{model}:streamGenerateContent?alt=sse",c._url),d=c._query,delete c.config,delete c._url,delete c._query;const f=this.apiClient;return l=f.requestStream({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}),l.then(function(p){return ne(this,arguments,function*(){var g,h,m,y;try{for(var v=!0,C=ce(p),w;w=yield _(C.next()),g=w.done,!g;v=!0){y=w.value,v=!1;const E=ft(f,yield _(y.json())),I=new K;Object.assign(I,E),yield yield _(I)}}catch(T){h={error:T}}finally{try{!v&&!g&&(m=C.return)&&(yield _(m.call(C)))}finally{if(h)throw h.error}}})})}else{const c=lt(this.apiClient,t);u=S("{model}:streamGenerateContent?alt=sse",c._url),d=c._query,delete c.config,delete c._url,delete c._query;const f=this.apiClient;return l=f.requestStream({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}),l.then(function(p){return ne(this,arguments,function*(){var g,h,m,y;try{for(var v=!0,C=ce(p),w;w=yield _(C.next()),g=w.done,!g;v=!0){y=w.value,v=!1;const E=ct(f,yield _(y.json())),I=new K;Object.assign(I,E),yield yield _(I)}}catch(T){h={error:T}}finally{try{!v&&!g&&(m=C.return)&&(yield _(m.call(C)))}finally{if(h)throw h.error}}})})}}async embedContent(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=Li(this.apiClient,t);return u=S("{model}:predict",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>{const p=vs(this.apiClient,f),g=new Xe;return Object.assign(g,p),g})}else{const c=ui(this.apiClient,t);return u=S("{model}:batchEmbedContents",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>{const p=es(this.apiClient,f),g=new Xe;return Object.assign(g,p),g})}}async generateImagesInternal(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=qi(this.apiClient,t);return u=S("{model}:predict",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>{const p=ws(this.apiClient,f),g=new Ze;return Object.assign(g,p),g})}else{const c=di(this.apiClient,t);return u=S("{model}:predict",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>{const p=os(this.apiClient,f),g=new Ze;return Object.assign(g,p),g})}}async get(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=Vi(this.apiClient,t);return u=S("{name}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>pt(this.apiClient,f))}else{const c=fi(this.apiClient,t);return u=S("{name}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>dt(this.apiClient,f))}}async update(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=Bi(this.apiClient,t);return u=S("{model}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"PATCH",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>pt(this.apiClient,f))}else{const c=hi(this.apiClient,t);return u=S("{name}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"PATCH",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>dt(this.apiClient,f))}}async delete(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=Gi(this.apiClient,t);return u=S("{name}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"DELETE",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(()=>{const f=Is(),p=new je;return Object.assign(p,f),p})}else{const c=gi(this.apiClient,t);return u=S("{name}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"DELETE",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(()=>{const f=ss(),p=new je;return Object.assign(p,f),p})}}async countTokens(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=$i(this.apiClient,t);return u=S("{model}:countTokens",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>{const p=bs(this.apiClient,f),g=new et;return Object.assign(g,p),g})}else{const c=yi(this.apiClient,t);return u=S("{model}:countTokens",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>{const p=rs(this.apiClient,f),g=new et;return Object.assign(g,p),g})}}async computeTokens(t){var e,n;let i,a="",l={};if(this.apiClient.isVertexAI()){const u=Wi(this.apiClient,t);return a=S("{model}:computeTokens",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(d=>d.json()),i.then(d=>{const c=As(this.apiClient,d),f=new bn;return Object.assign(f,c),f})}else throw new Error("This method is only supported by the Vertex AI.")}async generateVideos(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=Yi(this.apiClient,t);return u=S("{model}:predictLongRunning",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>ks(this.apiClient,f))}else{const c=Ti(this.apiClient,t);return u=S("{model}:predictLongRunning",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>cs(this.apiClient,f))}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Us(o,t){const e={},n=s(t,["operationName"]);n!=null&&r(e,["_url","operationName"],n);const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function Bs(o,t){const e={},n=s(t,["operationName"]);n!=null&&r(e,["_url","operationName"],n);const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function Gs(o,t){const e={},n=s(t,["operationName"]);n!=null&&r(e,["operationName"],n);const i=s(t,["resourceName"]);i!=null&&r(e,["_url","resourceName"],i);const a=s(t,["config"]);return a!=null&&r(e,["config"],a),e}function Hs(o,t){const e={},n=s(t,["video","uri"]);n!=null&&r(e,["uri"],n);const i=s(t,["video","encodedVideo"]);i!=null&&r(e,["videoBytes"],L(o,i));const a=s(t,["encoding"]);return a!=null&&r(e,["mimeType"],a),e}function $s(o,t){const e={},n=s(t,["_self"]);return n!=null&&r(e,["video"],Hs(o,n)),e}function Ws(o,t){const e={},n=s(t,["generatedSamples"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(u=>$s(o,u))),r(e,["generatedVideos"],l)}const i=s(t,["raiMediaFilteredCount"]);i!=null&&r(e,["raiMediaFilteredCount"],i);const a=s(t,["raiMediaFilteredReasons"]);return a!=null&&r(e,["raiMediaFilteredReasons"],a),e}function zs(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const i=s(t,["metadata"]);i!=null&&r(e,["metadata"],i);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);l!=null&&r(e,["error"],l);const u=s(t,["response","generateVideoResponse"]);return u!=null&&r(e,["response"],Ws(o,u)),e}function Os(o,t){const e={},n=s(t,["gcsUri"]);n!=null&&r(e,["uri"],n);const i=s(t,["bytesBase64Encoded"]);i!=null&&r(e,["videoBytes"],L(o,i));const a=s(t,["mimeType"]);return a!=null&&r(e,["mimeType"],a),e}function Ys(o,t){const e={},n=s(t,["_self"]);return n!=null&&r(e,["video"],Os(o,n)),e}function Js(o,t){const e={},n=s(t,["videos"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(u=>Ys(o,u))),r(e,["generatedVideos"],l)}const i=s(t,["raiMediaFilteredCount"]);i!=null&&r(e,["raiMediaFilteredCount"],i);const a=s(t,["raiMediaFilteredReasons"]);return a!=null&&r(e,["raiMediaFilteredReasons"],a),e}function ht(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const i=s(t,["metadata"]);i!=null&&r(e,["metadata"],i);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);l!=null&&r(e,["error"],l);const u=s(t,["response"]);return u!=null&&r(e,["response"],Js(o,u)),e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ks extends J{constructor(t){super(),this.apiClient=t}async getVideosOperation(t){const e=t.operation,n=t.config;if(e.name===void 0||e.name==="")throw new Error("Operation name is required.");if(this.apiClient.isVertexAI()){const i=e.name.split("/operations/")[0];let a;return n&&"httpOptions"in n&&(a=n.httpOptions),this.fetchPredictVideosOperationInternal({operationName:e.name,resourceName:i,config:{httpOptions:a}})}else return this.getVideosOperationInternal({operationName:e.name,config:n})}async getVideosOperationInternal(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=Bs(this.apiClient,t);return u=S("{operationName}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>ht(this.apiClient,f))}else{const c=Us(this.apiClient,t);return u=S("{operationName}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>zs(this.apiClient,f))}}async fetchPredictVideosOperationInternal(t){var e,n;let i,a="",l={};if(this.apiClient.isVertexAI()){const u=Gs(this.apiClient,t);return a=S("{resourceName}:fetchPredictOperation",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(d=>d.json()),i.then(d=>ht(this.apiClient,d))}else throw new Error("This method is only supported by the Vertex AI.")}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Qs="Content-Type",Xs="X-Server-Timeout",Zs="User-Agent",js="x-goog-api-client",er="0.12.0",tr=`google-genai-sdk/${er}`,nr="v1beta1",or="v1beta",gt=/^data: (.*)(?:\n\n|\r\r|\r\n\r\n)/;class Nt extends Error{constructor(t,e){e?super(t,{cause:e}):super(t,{cause:new Error().stack}),this.message=t,this.name="ClientError"}}class fe extends Error{constructor(t,e){e?super(t,{cause:e}):super(t,{cause:new Error().stack}),this.message=t,this.name="ServerError"}}class ir{constructor(t){var e,n;this.clientOptions=Object.assign(Object.assign({},t),{project:t.project,location:t.location,apiKey:t.apiKey,vertexai:t.vertexai});const i={};this.clientOptions.vertexai?(i.apiVersion=(e=this.clientOptions.apiVersion)!==null&&e!==void 0?e:nr,this.getProject()||this.getLocation()?(i.baseUrl=`https://${this.clientOptions.location}-aiplatform.googleapis.com/`,this.clientOptions.apiKey=void 0):(i.baseUrl="https://aiplatform.googleapis.com/",this.clientOptions.project=void 0,this.clientOptions.location=void 0)):(i.apiVersion=(n=this.clientOptions.apiVersion)!==null&&n!==void 0?n:or,i.baseUrl="https://generativelanguage.googleapis.com/"),i.headers=this.getDefaultHeaders(),this.clientOptions.httpOptions=i,t.httpOptions&&(this.clientOptions.httpOptions=this.patchHttpOptions(i,t.httpOptions))}isVertexAI(){var t;return(t=this.clientOptions.vertexai)!==null&&t!==void 0?t:!1}getProject(){return this.clientOptions.project}getLocation(){return this.clientOptions.location}getApiVersion(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.apiVersion!==void 0)return this.clientOptions.httpOptions.apiVersion;throw new Error("API version is not set.")}getBaseUrl(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.baseUrl!==void 0)return this.clientOptions.httpOptions.baseUrl;throw new Error("Base URL is not set.")}getRequestUrl(){return this.getRequestUrlInternal(this.clientOptions.httpOptions)}getHeaders(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.headers!==void 0)return this.clientOptions.httpOptions.headers;throw new Error("Headers are not set.")}getRequestUrlInternal(t){if(!t||t.baseUrl===void 0||t.apiVersion===void 0)throw new Error("HTTP options are not correctly set.");const n=[t.baseUrl.endsWith("/")?t.baseUrl.slice(0,-1):t.baseUrl];return t.apiVersion&&t.apiVersion!==""&&n.push(t.apiVersion),n.join("/")}getBaseResourcePath(){return`projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`}getApiKey(){return this.clientOptions.apiKey}getWebsocketBaseUrl(){const t=this.getBaseUrl(),e=new URL(t);return e.protocol=e.protocol=="http:"?"ws":"wss",e.toString()}setBaseUrl(t){if(this.clientOptions.httpOptions)this.clientOptions.httpOptions.baseUrl=t;else throw new Error("HTTP options are not correctly set.")}constructUrl(t,e,n){const i=[this.getRequestUrlInternal(e)];return n&&i.push(this.getBaseResourcePath()),t!==""&&i.push(t),new URL(`${i.join("/")}`)}shouldPrependVertexProjectPath(t){return!(this.clientOptions.apiKey||!this.clientOptions.vertexai||t.path.startsWith("projects/")||t.httpMethod==="GET"&&t.path.startsWith("publishers/google/models"))}async request(t){let e=this.clientOptions.httpOptions;t.httpOptions&&(e=this.patchHttpOptions(this.clientOptions.httpOptions,t.httpOptions));const n=this.shouldPrependVertexProjectPath(t),i=this.constructUrl(t.path,e,n);if(t.queryParams)for(const[l,u]of Object.entries(t.queryParams))i.searchParams.append(l,String(u));let a={};if(t.httpMethod==="GET"){if(t.body&&t.body!=="{}")throw new Error("Request body should be empty for GET request, but got non empty request body")}else a.body=t.body;return a=await this.includeExtraHttpOptionsToRequestInit(a,e,t.abortSignal),this.unaryApiCall(i,a,t.httpMethod)}patchHttpOptions(t,e){const n=JSON.parse(JSON.stringify(t));for(const[i,a]of Object.entries(e))typeof a=="object"?n[i]=Object.assign(Object.assign({},n[i]),a):a!==void 0&&(n[i]=a);return n}async requestStream(t){let e=this.clientOptions.httpOptions;t.httpOptions&&(e=this.patchHttpOptions(this.clientOptions.httpOptions,t.httpOptions));const n=this.shouldPrependVertexProjectPath(t),i=this.constructUrl(t.path,e,n);(!i.searchParams.has("alt")||i.searchParams.get("alt")!=="sse")&&i.searchParams.set("alt","sse");let a={};return a.body=t.body,a=await this.includeExtraHttpOptionsToRequestInit(a,e,t.abortSignal),this.streamApiCall(i,a,t.httpMethod)}async includeExtraHttpOptionsToRequestInit(t,e,n){if(e&&e.timeout||n){const i=new AbortController,a=i.signal;e.timeout&&(e==null?void 0:e.timeout)>0&&setTimeout(()=>i.abort(),e.timeout),n&&n.addEventListener("abort",()=>{i.abort()}),t.signal=a}return t.headers=await this.getHeadersInternal(e),t}async unaryApiCall(t,e,n){return this.apiCall(t.toString(),Object.assign(Object.assign({},e),{method:n})).then(async i=>(await mt(i),new ue(i))).catch(i=>{throw i instanceof Error?i:new Error(JSON.stringify(i))})}async streamApiCall(t,e,n){return this.apiCall(t.toString(),Object.assign(Object.assign({},e),{method:n})).then(async i=>(await mt(i),this.processStreamResponse(i))).catch(i=>{throw i instanceof Error?i:new Error(JSON.stringify(i))})}processStreamResponse(t){var e;return ne(this,arguments,function*(){const i=(e=t==null?void 0:t.body)===null||e===void 0?void 0:e.getReader(),a=new TextDecoder("utf-8");if(!i)throw new Error("Response body is empty");try{let l="";for(;;){const{done:u,value:d}=yield _(i.read());if(u){if(l.trim().length>0)throw new Error("Incomplete JSON segment at the end");break}const c=a.decode(d);try{const p=JSON.parse(c);if("error"in p){const g=JSON.parse(JSON.stringify(p.error)),h=g.status,m=g.code,y=`got status: ${h}. ${JSON.stringify(p)}`;if(m>=400&&m<500)throw new Nt(y);if(m>=500&&m<600)throw new fe(y)}}catch(p){const g=p;if(g.name==="ClientError"||g.name==="ServerError")throw p}l+=c;let f=l.match(gt);for(;f;){const p=f[1];try{const g=new Response(p,{headers:t==null?void 0:t.headers,status:t==null?void 0:t.status,statusText:t==null?void 0:t.statusText});yield yield _(new ue(g)),l=l.slice(f[0].length),f=l.match(gt)}catch(g){throw new Error(`exception parsing stream chunk ${p}. ${g}`)}}}}finally{i.releaseLock()}})}async apiCall(t,e){return fetch(t,e).catch(n=>{throw new Error(`exception ${n} sending request`)})}getDefaultHeaders(){const t={},e=tr+" "+this.clientOptions.userAgentExtra;return t[Zs]=e,t[js]=e,t[Qs]="application/json",t}async getHeadersInternal(t){const e=new Headers;if(t&&t.headers){for(const[n,i]of Object.entries(t.headers))e.append(n,i);t.timeout&&t.timeout>0&&e.append(Xs,String(Math.ceil(t.timeout/1e3)))}return await this.clientOptions.auth.addAuthHeaders(e),e}async uploadFile(t,e){var n;const i={};e!=null&&(i.mimeType=e.mimeType,i.name=e.name,i.displayName=e.displayName),i.name&&!i.name.startsWith("files/")&&(i.name=`files/${i.name}`);const a=this.clientOptions.uploader,l=await a.stat(t);i.sizeBytes=String(l.size);const u=(n=e==null?void 0:e.mimeType)!==null&&n!==void 0?n:l.type;if(u===void 0||u==="")throw new Error("Can not determine mimeType. Please provide mimeType in the config.");i.mimeType=u;const d=await this.fetchUploadUrl(i,e);return a.upload(t,d,this)}async fetchUploadUrl(t,e){var n;let i={};e!=null&&e.httpOptions?i=e.httpOptions:i={apiVersion:"",headers:{"Content-Type":"application/json","X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${t.sizeBytes}`,"X-Goog-Upload-Header-Content-Type":`${t.mimeType}`}};const a={file:t},l=await this.request({path:S("upload/v1beta/files",a._url),body:JSON.stringify(a),httpMethod:"POST",httpOptions:i});if(!l||!(l!=null&&l.headers))throw new Error("Server did not return an HttpResponse or the returned HttpResponse did not have headers.");const u=(n=l==null?void 0:l.headers)===null||n===void 0?void 0:n["x-goog-upload-url"];if(u===void 0)throw new Error("Failed to get upload url. Server did not return the x-google-upload-url in the headers");return u}}async function mt(o){var t;if(o===void 0)throw new fe("response is undefined");if(!o.ok){const e=o.status,n=o.statusText;let i;!((t=o.headers.get("content-type"))===null||t===void 0)&&t.includes("application/json")?i=await o.json():i={error:{message:await o.text(),code:o.status,status:o.statusText}};const a=`got status: ${e} ${n}. ${JSON.stringify(i)}`;throw e>=400&&e<500?new Nt(a):e>=500&&e<600?new fe(a):new Error(a)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function sr(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],n);const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function rr(o,t,e){const n={},i=s(t,["pageSize"]);e!==void 0&&i!=null&&r(e,["_query","pageSize"],i);const a=s(t,["pageToken"]);e!==void 0&&a!=null&&r(e,["_query","pageToken"],a);const l=s(t,["filter"]);return e!==void 0&&l!=null&&r(e,["_query","filter"],l),n}function ar(o,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],rr(o,n,e)),e}function lr(o,t){const e={},n=s(t,["textInput"]);n!=null&&r(e,["textInput"],n);const i=s(t,["output"]);return i!=null&&r(e,["output"],i),e}function ur(o,t){const e={};if(s(t,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");const n=s(t,["examples"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(a=>lr(o,a))),r(e,["examples","examples"],i)}return e}function cr(o,t,e){const n={};if(s(t,["validationDataset"])!==void 0)throw new Error("validationDataset parameter is not supported in Gemini API.");const i=s(t,["tunedModelDisplayName"]);if(e!==void 0&&i!=null&&r(e,["displayName"],i),s(t,["description"])!==void 0)throw new Error("description parameter is not supported in Gemini API.");const a=s(t,["epochCount"]);e!==void 0&&a!=null&&r(e,["tuningTask","hyperparameters","epochCount"],a);const l=s(t,["learningRateMultiplier"]);if(l!=null&&r(n,["tuningTask","hyperparameters","learningRateMultiplier"],l),s(t,["adapterSize"])!==void 0)throw new Error("adapterSize parameter is not supported in Gemini API.");const u=s(t,["batchSize"]);e!==void 0&&u!=null&&r(e,["tuningTask","hyperparameters","batchSize"],u);const d=s(t,["learningRate"]);return e!==void 0&&d!=null&&r(e,["tuningTask","hyperparameters","learningRate"],d),n}function dr(o,t){const e={},n=s(t,["baseModel"]);n!=null&&r(e,["baseModel"],n);const i=s(t,["trainingDataset"]);i!=null&&r(e,["tuningTask","trainingData"],ur(o,i));const a=s(t,["config"]);return a!=null&&r(e,["config"],cr(o,a,e)),e}function fr(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["_url","name"],n);const i=s(t,["config"]);return i!=null&&r(e,["config"],i),e}function pr(o,t,e){const n={},i=s(t,["pageSize"]);e!==void 0&&i!=null&&r(e,["_query","pageSize"],i);const a=s(t,["pageToken"]);e!==void 0&&a!=null&&r(e,["_query","pageToken"],a);const l=s(t,["filter"]);return e!==void 0&&l!=null&&r(e,["_query","filter"],l),n}function hr(o,t){const e={},n=s(t,["config"]);return n!=null&&r(e,["config"],pr(o,n,e)),e}function gr(o,t,e){const n={},i=s(t,["gcsUri"]);if(e!==void 0&&i!=null&&r(e,["supervisedTuningSpec","trainingDatasetUri"],i),s(t,["examples"])!==void 0)throw new Error("examples parameter is not supported in Vertex AI.");return n}function mr(o,t){const e={},n=s(t,["gcsUri"]);return n!=null&&r(e,["validationDatasetUri"],n),e}function yr(o,t,e){const n={},i=s(t,["validationDataset"]);e!==void 0&&i!=null&&r(e,["supervisedTuningSpec"],mr(o,i));const a=s(t,["tunedModelDisplayName"]);e!==void 0&&a!=null&&r(e,["tunedModelDisplayName"],a);const l=s(t,["description"]);e!==void 0&&l!=null&&r(e,["description"],l);const u=s(t,["epochCount"]);e!==void 0&&u!=null&&r(e,["supervisedTuningSpec","hyperParameters","epochCount"],u);const d=s(t,["learningRateMultiplier"]);e!==void 0&&d!=null&&r(e,["supervisedTuningSpec","hyperParameters","learningRateMultiplier"],d);const c=s(t,["adapterSize"]);if(e!==void 0&&c!=null&&r(e,["supervisedTuningSpec","hyperParameters","adapterSize"],c),s(t,["batchSize"])!==void 0)throw new Error("batchSize parameter is not supported in Vertex AI.");if(s(t,["learningRate"])!==void 0)throw new Error("learningRate parameter is not supported in Vertex AI.");return n}function vr(o,t){const e={},n=s(t,["baseModel"]);n!=null&&r(e,["baseModel"],n);const i=s(t,["trainingDataset"]);i!=null&&r(e,["supervisedTuningSpec","trainingDatasetUri"],gr(o,i,e));const a=s(t,["config"]);return a!=null&&r(e,["config"],yr(o,a,e)),e}function Cr(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["model"],n);const i=s(t,["name"]);return i!=null&&r(e,["endpoint"],i),e}function Lt(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const i=s(t,["state"]);i!=null&&r(e,["state"],_t(o,i));const a=s(t,["createTime"]);a!=null&&r(e,["createTime"],a);const l=s(t,["tuningTask","startTime"]);l!=null&&r(e,["startTime"],l);const u=s(t,["tuningTask","completeTime"]);u!=null&&r(e,["endTime"],u);const d=s(t,["updateTime"]);d!=null&&r(e,["updateTime"],d);const c=s(t,["description"]);c!=null&&r(e,["description"],c);const f=s(t,["baseModel"]);f!=null&&r(e,["baseModel"],f);const p=s(t,["_self"]);p!=null&&r(e,["tunedModel"],Cr(o,p));const g=s(t,["distillationSpec"]);g!=null&&r(e,["distillationSpec"],g);const h=s(t,["experiment"]);h!=null&&r(e,["experiment"],h);const m=s(t,["labels"]);m!=null&&r(e,["labels"],m);const y=s(t,["pipelineJob"]);y!=null&&r(e,["pipelineJob"],y);const v=s(t,["tunedModelDisplayName"]);return v!=null&&r(e,["tunedModelDisplayName"],v),e}function Tr(o,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const i=s(t,["tunedModels"]);if(i!=null){let a=i;Array.isArray(a)&&(a=a.map(l=>Lt(o,l))),r(e,["tuningJobs"],a)}return e}function wr(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const i=s(t,["metadata"]);i!=null&&r(e,["metadata"],i);const a=s(t,["done"]);a!=null&&r(e,["done"],a);const l=s(t,["error"]);return l!=null&&r(e,["error"],l),e}function Er(o,t){const e={},n=s(t,["model"]);n!=null&&r(e,["model"],n);const i=s(t,["endpoint"]);return i!=null&&r(e,["endpoint"],i),e}function pe(o,t){const e={},n=s(t,["name"]);n!=null&&r(e,["name"],n);const i=s(t,["state"]);i!=null&&r(e,["state"],_t(o,i));const a=s(t,["createTime"]);a!=null&&r(e,["createTime"],a);const l=s(t,["startTime"]);l!=null&&r(e,["startTime"],l);const u=s(t,["endTime"]);u!=null&&r(e,["endTime"],u);const d=s(t,["updateTime"]);d!=null&&r(e,["updateTime"],d);const c=s(t,["error"]);c!=null&&r(e,["error"],c);const f=s(t,["description"]);f!=null&&r(e,["description"],f);const p=s(t,["baseModel"]);p!=null&&r(e,["baseModel"],p);const g=s(t,["tunedModel"]);g!=null&&r(e,["tunedModel"],Er(o,g));const h=s(t,["supervisedTuningSpec"]);h!=null&&r(e,["supervisedTuningSpec"],h);const m=s(t,["tuningDataStats"]);m!=null&&r(e,["tuningDataStats"],m);const y=s(t,["encryptionSpec"]);y!=null&&r(e,["encryptionSpec"],y);const v=s(t,["partnerModelTuningSpec"]);v!=null&&r(e,["partnerModelTuningSpec"],v);const C=s(t,["distillationSpec"]);C!=null&&r(e,["distillationSpec"],C);const w=s(t,["experiment"]);w!=null&&r(e,["experiment"],w);const T=s(t,["labels"]);T!=null&&r(e,["labels"],T);const E=s(t,["pipelineJob"]);E!=null&&r(e,["pipelineJob"],E);const I=s(t,["tunedModelDisplayName"]);return I!=null&&r(e,["tunedModelDisplayName"],I),e}function Sr(o,t){const e={},n=s(t,["nextPageToken"]);n!=null&&r(e,["nextPageToken"],n);const i=s(t,["tuningJobs"]);if(i!=null){let a=i;Array.isArray(a)&&(a=a.map(l=>pe(o,l))),r(e,["tuningJobs"],a)}return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ir extends J{constructor(t){super(),this.apiClient=t,this.get=async e=>await this.getInternal(e),this.list=async(e={})=>new he(Y.PAGED_ITEM_TUNING_JOBS,n=>this.listInternal(n),await this.listInternal(e),e),this.tune=async e=>{if(this.apiClient.isVertexAI())return await this.tuneInternal(e);{const n=await this.tuneMldevInternal(e);let i="";return n.metadata!==void 0&&n.metadata.tunedModel!==void 0?i=n.metadata.tunedModel:n.name!==void 0&&n.name.includes("/operations/")&&(i=n.name.split("/operations/")[0]),{name:i,state:le.JOB_STATE_QUEUED}}}}async getInternal(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=fr(this.apiClient,t);return u=S("{name}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>pe(this.apiClient,f))}else{const c=sr(this.apiClient,t);return u=S("{name}",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>Lt(this.apiClient,f))}}async listInternal(t){var e,n,i,a;let l,u="",d={};if(this.apiClient.isVertexAI()){const c=hr(this.apiClient,t);return u=S("tuningJobs",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(f=>f.json()),l.then(f=>{const p=Sr(this.apiClient,f),g=new tt;return Object.assign(g,p),g})}else{const c=ar(this.apiClient,t);return u=S("tunedModels",c._url),d=c._query,delete c.config,delete c._url,delete c._query,l=this.apiClient.request({path:u,queryParams:d,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(i=t.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(a=t.config)===null||a===void 0?void 0:a.abortSignal}).then(f=>f.json()),l.then(f=>{const p=Tr(this.apiClient,f),g=new tt;return Object.assign(g,p),g})}}async tuneInternal(t){var e,n;let i,a="",l={};if(this.apiClient.isVertexAI()){const u=vr(this.apiClient,t);return a=S("tuningJobs",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(d=>d.json()),i.then(d=>pe(this.apiClient,d))}else throw new Error("This method is only supported by the Vertex AI.")}async tuneMldevInternal(t){var e,n;let i,a="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const u=dr(this.apiClient,t);return a=S("tunedModels",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:a,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(e=t.config)===null||e===void 0?void 0:e.httpOptions,abortSignal:(n=t.config)===null||n===void 0?void 0:n.abortSignal}).then(d=>d.json()),i.then(d=>wr(this.apiClient,d))}}}const br=1024*1024*8;async function Ar(o,t,e){var n,i;let a=0,l=0,u=new ue(new Response),d="upload";for(a=o.size;l<a;){const f=Math.min(br,a-l),p=o.slice(l,l+f);if(l+f>=a&&(d+=", finalize"),u=await e.request({path:"",body:p,httpMethod:"POST",httpOptions:{apiVersion:"",baseUrl:t,headers:{"X-Goog-Upload-Command":d,"X-Goog-Upload-Offset":String(l),"Content-Length":String(f)}}}),l+=f,((n=u==null?void 0:u.headers)===null||n===void 0?void 0:n["x-goog-upload-status"])!=="active")break;if(a<=l)throw new Error("All content has been uploaded, but the upload status is not finalized.")}const c=await(u==null?void 0:u.json());if(((i=u==null?void 0:u.headers)===null||i===void 0?void 0:i["x-goog-upload-status"])!=="final")throw new Error("Failed to upload file: Upload status is not finalized.");return c.file}async function xr(o){return{size:o.size,type:o.type}}class _r{async upload(t,e,n){if(typeof t=="string")throw new Error("File path is not supported in browser uploader.");return await Ar(t,e,n)}async stat(t){if(typeof t=="string")throw new Error("File path is not supported in browser uploader.");return await xr(t)}}/**
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
 */const Pr="gl-node/";class Dr{constructor(t){var e;if(t.apiKey==null)throw new Error("An API Key must be set when running in a browser");if(t.project||t.location)throw new Error("Vertex AI project based authentication is not supported on browser runtimes. Please do not provide a project or location.");this.vertexai=(e=t.vertexai)!==null&&e!==void 0?e:!1,this.apiKey=t.apiKey;const n=Bt(t,void 0,void 0);n&&(t.httpOptions?t.httpOptions.baseUrl=n:t.httpOptions={baseUrl:n}),this.apiVersion=t.apiVersion;const i=new Mr(this.apiKey);this.apiClient=new ir({auth:i,apiVersion:this.apiVersion,apiKey:this.apiKey,vertexai:this.vertexai,httpOptions:t.httpOptions,userAgentExtra:Pr+"web",uploader:new _r}),this.models=new Vs(this.apiClient),this.live=new Ds(this.apiClient,i,new Rr),this.chats=new Dn(this.models,this.apiClient),this.caches=new Rn(this.apiClient),this.files=new On(this.apiClient),this.operations=new Ks(this.apiClient),this.tunings=new Ir(this.apiClient)}}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/const vt="AIzaSyALB2_8eh4kNA3hrpevwvDtgO6FnpkWU7s";let P=null;vt.trim()&&(P=new Dr({apiKey:vt}));const Ct={commitmentSigned:"roof-er.commitmentSigned"},W=document.getElementById("sidebar"),z=document.getElementById("main-content"),x={welcome:`
    <div class="content-card">
      <h1>Welcome to Roof-ER!</h1>
      ${q("/assets/training/videos/welcome-intro.mp4","welcome-video","📹 Welcome Introduction")}
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
      ${q("/assets/training/videos/module2-commitment.mp4","commitment-video","📹 Your Commitment to Excellence")}

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
        ${q("/assets/training/videos/module7-inspection-process.mp4","inspection-process-video","📹 Complete Inspection Process Walkthrough")}

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
        ${q("/assets/training/videos/module5-post-inspection.mp4","post-inspection-video","📹 Post-Inspection Pitch Strategy")}

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
        ${q("/assets/training/videos/module10-damage-id.mp4","damage-id-video","📹 Identifying Storm Damage")}

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

        <!-- Screen 2: Scenario Display -->
        <div id="scenario-display" style="display: none;">
            <div id="scenario-progress" style="text-align: center; margin-bottom: 20px; font-weight: 500; color: #8b4fbe;"></div>
            <div style="background: #f8f4fc; border-left: 4px solid #8b4fbe; padding: 20px; margin-bottom: 20px; border-radius: 5px;">
                <h3 id="scenario-title" style="margin: 0 0 10px 0; color: #8b4fbe;">Scenario</h3>
                <p id="scenario-context" style="margin: 0 0 15px 0; color: #555;"></p>
                <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #e0d4f0;">
                    <strong style="color: #8b4fbe;">Agnes says:</strong>
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
  `};x["general-knowledge"]=`
  <div class="content-card">
    <h1>General Roofing Knowledge & Terminology</h1>
    ${q("/assets/training/videos/module3-roofing101.mp4","roofing101-video","📹 Roofing 101: Essential Knowledge")}

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
`;x["shingle-types-materials"]=x["shingle-types"]||`
  <div class="content-card"><h1>Shingle Types & Materials</h1><p>Content coming soon.</p></div>
`;x["handling-initial-pitch-objections"]=x["objection-handling"]||`
  <div class="content-card"><h1>Handling Initial Pitch Objections</h1><p>Content coming soon.</p></div>
`;x["post-inspection-objections"]=`
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
`;x["damage-identification"]=x["roofing-damage-id"]||`
  <div class="content-card"><h1>Damage Identification</h1><p>Content coming soon.</p></div>
`;x["filing-claim-closing"]=x["claim-closing"]||`
  <div class="content-card"><h1>Filing the Claim & Closing</h1><p>Content coming soon.</p></div>
`;x["closing-objections"]=`
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
`;x["discontinued-products"]=`
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
`;x["sales-cycle-job-flow"]=x["sales-cycle"]||`
  <div class="content-card"><h1>Sales Cycle & Job Flow</h1><p>Content coming soon.</p></div>
`;x["final-exam"]=`
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
`;x.welcome+=`
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
`;x["role-play"]=(x["role-play"]||"").replace('<div id="chat-container">',`<div class="rp-controls">
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
    <div id="chat-container">`);function q(o,t,e){const n=`video-watched-${t}`,i=`video-progress-${t}`,a=localStorage.getItem(n)==="true",l=parseFloat(localStorage.getItem(i)||"0");return`
    <div class="video-player-container" style="margin: 20px 0; background: #f5f5f5; border-radius: 8px; padding: 20px;">
      <h3 style="margin-top: 0;">${e}</h3>
      <div style="position: relative;">
        <video
          id="${t}"
          controls
          style="width: 100%; max-width: 800px; border-radius: 4px;"
          ${l>0?`data-start="${l}"`:""}
        >
          <source src="${o}" type="video/mp4">
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
          localStorage.setItem('${i}', video.currentTime.toString());

          if (progress >= 90) {
            localStorage.setItem('${n}', 'true');
          }
        });
      })();
    <\/script>
  `}const O=window.speechSynthesis;let $=null;function Nr(o){const t=o.target.closest(".speak-btn");if(!t)return;const e=t.closest('[data-text-source="true"]');if(!e)return;const n=e.innerText.trim();if(O.speaking&&$&&(O.cancel(),$.text===n)){$=null;return}const i=new SpeechSynthesisUtterance(n);$=i,i.onerror=a=>console.error("SpeechSynthesis Error",a),O.speak(i)}function Tt(){const o=document.getElementById("items-pool"),t=document.getElementById("sorted-list"),e=document.getElementById("sales-cycle-feedback");if(!o||!t||!e)return;let n=null;const i=["1","2","3","4","5"];o.addEventListener("dragstart",l=>{n=l.target,setTimeout(()=>{n&&(n.style.display="none")},0)}),o.addEventListener("dragend",()=>{setTimeout(()=>{n&&(n.style.display="block",n=null)},0)}),t.addEventListener("dragover",l=>l.preventDefault()),t.addEventListener("drop",l=>{l.preventDefault(),n&&(t.appendChild(n),a())});function a(){const l=t.querySelectorAll(".draggable-item");if(l.length!==i.length)return;const u=Array.from(l).map(d=>d.dataset.order);JSON.stringify(u)===JSON.stringify(i)?(e.textContent="Correct! That is the right order.",e.className="feedback-message correct"):(e.textContent="Not quite right. Try again!",e.className="feedback-message incorrect"),e.style.display="block"}}function wt(){const o=document.querySelectorAll("#objections-list .draggable-item"),t=document.querySelectorAll(".drop-zone"),e=document.getElementById("objection-feedback");let n=0;const i=o.length;let a=null;o.forEach(l=>{l.addEventListener("dragstart",u=>{a=u.target,setTimeout(()=>{a&&a.classList.add("dragging")},0)}),l.addEventListener("dragend",()=>{a&&a.classList.remove("dragging")})}),t.forEach(l=>{l.addEventListener("dragover",u=>{u.preventDefault(),l.classList.add("drag-over")}),l.addEventListener("dragleave",()=>{l.classList.remove("drag-over")}),l.addEventListener("drop",u=>{if(u.preventDefault(),l.classList.remove("drag-over"),!a||l.children.length>1)return;const d=l.dataset.match,c=a.dataset.match;if(d===c){const f=l.querySelector(".response-text");f&&(f.style.display="none"),l.appendChild(a),a.setAttribute("draggable","false"),l.classList.add("correctly-matched"),n++,n===i&&e&&(e.textContent="Great job! All objections matched correctly.",e.className="feedback-message correct",e.style.display="block")}})})}function Lr(){console.log("🎭 Initializing Module 9 Practice with Agnes buttons...");const o=document.querySelectorAll(".practice-agnes-btn");o.forEach(t=>{t.addEventListener("click",function(){const e=this.getAttribute("data-scenario"),n=document.querySelector('[data-module="role-play"]');n&&(n.click(),setTimeout(()=>{localStorage.setItem("preselected-scenario",e);const a=getAllAgnesScenarios().find(l=>l.id===e);a&&Fr(a)},100))})}),console.log(`✅ Initialized ${o.length} Practice with Agnes buttons`)}function Fr(o){if(!o)return;const t=document.getElementById("role-selection-screen"),e=document.getElementById("scenario-screen");t&&(t.style.display="none"),e&&(e.style.display="block");const n=document.getElementById("scenario-prompt"),i=document.getElementById("scenario-progress");n&&(n.textContent=o.prompt),i&&(i.textContent=`Scenario: ${o.id}`),currentScenario=o,sessionScenarios=[o],currentScenarioIndex=0}function qr(){if(console.log("🎭 Initializing Agnes Role-Play System..."),typeof getAllAgnesScenarios!="function"){console.error("❌ Agnes scenarios not loaded. Check that agnes-scenarios.js is included before index.tsx"),alert("Error: Agnes scenario data not loaded. Please check browser console.");return}if(typeof scoreResponse!="function"){console.error("❌ scoreResponse function not found. Check agnes-scenarios.js"),alert("Error: Scoring function not available. Please check browser console.");return}const o={selectedRole:null,difficulty:"beginner",scenarios:[],currentScenarioIndex:0,currentScenario:null,responses:[],scores:[],hintsUsed:0,startTime:Date.now(),recognition:null,scenarioStartTime:null};function t(h){["roleplay-setup","scenario-display","feedback-area","session-summary"].forEach(y=>{const v=document.getElementById(y);v&&(v.style.display=y===h?"block":"none")})}function e(){console.log("📋 Showing role selection"),t("roleplay-setup"),o.selectedRole=null,o.scenarios=[],o.currentScenarioIndex=0,o.responses=[],o.scores=[],o.hintsUsed=0,o.startTime=Date.now()}function n(h){h<0||h>=o.scenarios.length||(o.currentScenarioIndex=h,o.currentScenario=o.scenarios[h],o.scenarioStartTime=Date.now(),i(o.currentScenario))}function i(h){const m=document.getElementById("scenario-title"),y=document.getElementById("scenario-context"),v=document.getElementById("agnes-prompt"),C=document.getElementById("scenario-progress"),w=document.getElementById("user-response"),T=document.getElementById("submit-response");m&&(m.textContent=h.id||`Scenario ${o.currentScenarioIndex+1}`),y&&(y.textContent=`Role: ${h.role} | Difficulty: beginner`),v&&(v.textContent=h.prompt||""),C&&(C.textContent=`Scenario ${o.currentScenarioIndex+1} of ${o.scenarios.length}`),w&&(w.value="",w.disabled=!1),T&&(T.disabled=!1,T.textContent="Submit Response")}async function a(){var h,m;try{const y=document.getElementById("user-response"),v=document.getElementById("submit-response");if(!y||!v)return;const C=y.value.trim();if(!C){alert("Please enter a response before submitting.");return}y.disabled=!0,v.disabled=!0,v.textContent="Processing...";const w=o.currentScenario,T=window.scoreResponse(C,w.expectedKeyPoints||[],((h=w.rubric)==null?void 0:h.keywords)||[],((m=w.rubric)==null?void 0:m.passThreshold)||70);let E=null;if(P)try{E=await l(C,w,T)}catch(I){console.warn("AI feedback unavailable:",I)}o.responses.push({scenarioIndex:o.currentScenarioIndex,userResponse:C,timestamp:new Date().toISOString()}),o.scores.push({...T,scenarioIndex:o.currentScenarioIndex,aiFeedback:E}),u(T,E),y.disabled=!1,v.textContent="Submit Response"}catch(y){console.error("Error submitting response:",y),alert("Error processing response. Please try again.")}}async function l(h,m,y){var C;if(!P)return null;const v=`You are Agnes, an expert insurance training coach. Analyze this role-play response and provide constructive feedback.

Scenario: ${m.id}
User Response: "${h}"

Performance:
- Score: ${y.score}/100
- Matched: ${y.matchedPoints.join(", ")||"None"}
- Missed: ${y.missedPoints.join(", ")||"None"}

Provide feedback in JSON format:
{
  "strengths": ["Strength 1", "Strength 2"],
  "improvements": ["Improvement 1", "Improvement 2"]
}

Be specific, actionable, and encouraging.`;try{let E=(await(await P.chats.create({model:"gemini-2.0-flash-exp",config:{temperature:.7,maxOutputTokens:500}})).sendMessage(v)).text.trim();return E.includes("```json")&&(E=((C=E.match(/```json\n([\s\S]*?)\n```/))==null?void 0:C[1])||E),JSON.parse(E)}catch{return{strengths:[`You scored ${y.score}/100`,`Matched ${y.matchedPoints.length} key points`],improvements:[`Try to include: ${y.missedPoints.slice(0,2).join(", ")}`,"Practice using clear, professional language"]}}}function u(h,m){const y=document.getElementById("score-circle"),v=document.getElementById("score-text"),C=document.getElementById("matched-points-list"),w=document.getElementById("missed-points-list"),T=document.getElementById("strengths-list"),E=document.getElementById("improvements-list");y&&(y.textContent=String(h.score),y.style.borderColor=h.score>=85?"#4caf50":h.score>=70?"#ff9800":"#f44336",y.style.color=h.score>=85?"#4caf50":h.score>=70?"#ff9800":"#f44336"),v&&(v.textContent=h.score>=70?`Great! You passed with ${h.score}/100`:`Score: ${h.score}/100 (Need 70 to pass)`),C&&(C.innerHTML=h.matchedPoints.length>0?h.matchedPoints.map(I=>`<li style="margin-bottom: 8px;"><span style="color: #4caf50; margin-right: 8px;">✓</span>${I}</li>`).join(""):"<li>No key points matched</li>"),w&&(w.innerHTML=h.missedPoints.length>0?h.missedPoints.map(I=>`<li style="margin-bottom: 8px;"><span style="color: #ff9800; margin-right: 8px;">✗</span>${I}</li>`).join(""):"<li>All key points covered!</li>"),m&&T&&E&&(T.innerHTML=m.strengths.map(I=>`<li style="margin-bottom: 8px;">${I}</li>`).join(""),E.innerHTML=m.improvements.map(I=>`<li style="margin-bottom: 8px;">${I}</li>`).join("")),t("feedback-area")}function d(){const h=o.currentScenarioIndex+1;h>=o.scenarios.length?f():(n(h),t("scenario-display"))}function c(){o.responses.length>0&&o.responses.pop(),o.scores.length>0&&o.scores.pop(),i(o.currentScenario),t("scenario-display")}function f(){t("session-summary");const h=document.getElementById("session-summary");if(!h)return;const m=o.scores.map(T=>T.score),y=m.length>0?Math.round(m.reduce((T,E)=>T+E,0)/m.length):0,v=m.length>0?Math.max(...m):0,C=m.filter(T=>T>=70).length;h.innerHTML=`
      <h2 style="text-align: center; color: #8b4fbe; margin-bottom: 30px;">🎉 Session Complete!</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <div style="background: #f8f4fc; padding: 20px; border-radius: 8px; text-align: center;">
          <div style="font-size: 36px; font-weight: bold; color: #8b4fbe;">${o.scores.length}</div>
          <div style="color: #666;">Scenarios Completed</div>
        </div>
        <div style="background: #f8f4fc; padding: 20px; border-radius: 8px; text-align: center;">
          <div style="font-size: 36px; font-weight: bold; color: #8b4fbe;">${y}</div>
          <div style="color: #666;">Average Score</div>
        </div>
        <div style="background: #f8f4fc; padding: 20px; border-radius: 8px; text-align: center;">
          <div style="font-size: 36px; font-weight: bold; color: #8b4fbe;">${v}</div>
          <div style="color: #666;">Highest Score</div>
        </div>
        <div style="background: #f8f4fc; padding: 20px; border-radius: 8px; text-align: center;">
          <div style="font-size: 36px; font-weight: bold; color: #8b4fbe;">${C}/${o.scores.length}</div>
          <div style="color: #666;">Passed</div>
        </div>
      </div>
      <div style="text-align: center;">
        <button id="start-new-session-btn" style="padding: 15px 40px; background: #8b4fbe; color: white; border: none; border-radius: 5px; font-size: 16px; font-weight: 500; cursor: pointer;">Start New Session</button>
      </div>
    `;const w=document.getElementById("start-new-session-btn");w&&w.addEventListener("click",e)}function p(){const h=o.currentScenario;if(!(h!=null&&h.followUps)||h.followUps.length===0){alert("No hints available for this scenario.");return}const m=h.followUps[Math.floor(Math.random()*h.followUps.length)],y=document.getElementById("hint-display");y&&(y.innerHTML=`<strong>💡 Hint:</strong> ${m}`,y.style.display="block",o.hintsUsed++,setTimeout(()=>{y.style.display="none"},1e4))}function g(){document.querySelectorAll(".role-btn").forEach(m=>{m.addEventListener("click",async y=>{var w;const C=(w=y.target.closest("[data-role]"))==null?void 0:w.getAttribute("data-role");if(C){o.selectedRole=C,o.startTime=Date.now();try{const T=window.getAgnesScenariosByRole(C);if(!T||T.length===0)throw new Error(`No scenarios found for role: ${C}`);o.scenarios=T,o.currentScenarioIndex=0,setTimeout(()=>{n(0),t("scenario-display")},300)}catch(T){console.error("Error loading scenarios:",T),alert(`Error: ${T.message}`)}}})})}try{g();const h=document.getElementById("submit-response");h&&h.addEventListener("click",a);const m=document.getElementById("next-scenario-btn");m&&m.addEventListener("click",d);const y=document.getElementById("retry-scenario-btn");y&&y.addEventListener("click",c);const v=document.getElementById("hint-btn");v&&v.addEventListener("click",p),e(),console.log("✅ Agnes Role-Play System initialized successfully")}catch(h){throw console.error("❌ Error initializing Agnes system:",h),h}}async function Vr(){const o=document.getElementById("quiz-area");if(o){o.innerHTML='<div id="loader">Generating your quiz...</div>';try{if(!P){o.innerHTML='<p style="color: red;">Quiz is unavailable: missing API key. Set GEMINI_API_KEY in .env.local and reload.</p>';return}const t=Object.values(x).join(" "),e=await P.models.generateContent({model:"gemini-2.5-flash",contents:`Based on this summary of the Roof-ER sales training, generate a 5-question multiple-choice quiz. Ensure the "answer" field exactly matches one of the strings in the "options" array. ${t}`,config:{responseMimeType:"application/json",responseSchema:{type:b.ARRAY,items:{type:b.OBJECT,properties:{question:{type:b.STRING},options:{type:b.ARRAY,items:{type:b.STRING}},answer:{type:b.STRING}},required:["question","options","answer"]}}}}),n=JSON.parse(e.text.trim());Ur(n)}catch(t){console.error("Quiz generation failed:",t),o.innerHTML='<p style="color: red;">Sorry, there was an error generating the quiz. Please try again.</p>'}}}function Ur(o){const t=document.getElementById("quiz-area");if(!t)return;t.innerHTML=o.map((i,a)=>`
    <div class="quiz-item" data-question-index="${a}">
      <p class="quiz-question">${a+1}. ${i.question}</p>
      <ul class="quiz-options">
        ${i.options.map(l=>`<li data-option="${l.replace(/"/g,"&quot;")}">${l}</li>`).join("")}
      </ul>
      <div id="quiz-feedback-${a}" class="quiz-feedback"></div>
    </div>
  `).join("")+'<button id="submitQuizButton">Submit Answers</button>',t.querySelectorAll(".quiz-options li").forEach(i=>{i.addEventListener("click",()=>{i.parentElement.querySelectorAll("li").forEach(l=>l.classList.remove("selected")),i.classList.add("selected")})});const n=document.getElementById("submitQuizButton");n==null||n.addEventListener("click",()=>{o.forEach((i,a)=>{const l=document.querySelector(`.quiz-item[data-question-index="${a}"] .quiz-options li.selected`),u=document.getElementById(`quiz-feedback-${a}`);l&&u&&(l.dataset.option===i.answer?(u.textContent="Correct!",u.className="quiz-feedback correct"):(u.textContent=`Incorrect. The correct answer is: ${i.answer}`,u.className="quiz-feedback incorrect"))}),n.disabled=!0})}function Ft(o){var t;if(z)switch(z.innerHTML=x[o]||"<div>Content not found.</div>",O.speaking&&(O.cancel(),$=null),o){case"quiz":(t=document.getElementById("generateQuizButton"))==null||t.addEventListener("click",Vr);break;case"sales-cycle":Tt();break;case"objection-handling":wt();break;case"role-play":qr();break;case"welcome":Kr(),Hr(),Wr();break;case"post-inspection-objections":Lr();break;case"general-knowledge":zr();break;case"final-exam":Or();break;case"handling-initial-pitch-objections":wt();break;case"sales-cycle-job-flow":Tt();break;case"commitment":$r();break}}function Br(o){const t=o.target;if(t.tagName==="LI"&&t.dataset.module){const e=t.dataset.module;W==null||W.querySelectorAll("li").forEach(n=>n.classList.remove("active")),t.classList.add("active"),Ft(e)}}document.addEventListener("DOMContentLoaded",()=>{var o;W&&W.addEventListener("click",Br),z==null||z.addEventListener("click",Nr),Ft("welcome"),(o=document.querySelector('#sidebar li[data-module="welcome"]'))==null||o.classList.add("active")});const Gr={oliver:{name:"Oliver Brown",title:"Owner & Founder",img:"/resources/images/oliver-theroofdocs.jpg",link:"https://www.theroofdocs.com/about/",summary:"Owner & Founder focused on integrity, quality, and simplicity with a transparent, customer‑first process."},reese:{name:"Reese Samala",title:"Director of Sales",img:"/resources/images/reese-theroofdocs.jpg",link:"https://www.theroofdocs.com/about/",summary:"Leads sales with a consultative, education‑forward approach that builds trust and results."},ford:{name:"Ford Barsi",title:"General Manager",img:"/resources/images/ford-theroofdocs.jpg",link:"https://www.theroofdocs.com/about/",summary:"Oversees operations and execution, aligning teams and process from inspection to completion."}};function Hr(){var n;const o=document.getElementById("main-content");if(!o)return;let t=document.getElementById("bio-modal-overlay");t||(t=document.createElement("div"),t.id="bio-modal-overlay",t.className="modal-overlay",t.innerHTML=`
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
      </div>`,document.body.appendChild(t));const e=()=>{t.classList.remove("show")};t.addEventListener("click",i=>{i.target===t&&e()}),(n=t.querySelector(".modal-close"))==null||n.addEventListener("click",e),document.addEventListener("keyup",i=>{i.key==="Escape"&&e()}),o.querySelectorAll(".bio-btn").forEach(i=>{i.addEventListener("click",()=>{const a=i.getAttribute("data-bio")||"",l=Gr[a];if(!l)return;t.querySelector("#bioTitle").textContent=`${l.name} — ${l.title}`;const u=t.querySelector("#bioImg");u.src=l.img,u.alt=l.name,t.querySelector("#bioSummary").textContent=l.summary;const d=t.querySelector("#bioLink");d.href=l.link,t.classList.add("show")})})}function $r(){const o=document.getElementById("main-content");if(!o||localStorage.getItem(Ct.commitmentSigned)==="true")return;const e=document.createElement("div");e.innerHTML=`
    <div class="commitment-gate">
      <h3>Digital Signature</h3>
      <p>You must acknowledge and sign before accessing the training.</p>
      <label>Full Name: <input id="sigName" type="text" placeholder="Your full name"/></label>
      <label><input id="sigAgree" type="checkbox"/> I agree to uphold Roof‑ER standards and ethics.</label>
      <button id="sigSubmit">Sign & Continue</button>
      <div id="sigMsg" class="sig-message"></div>
    </div>`,o.appendChild(e);const n=e.querySelector("#sigSubmit");n==null||n.addEventListener("click",()=>{var u,d,c;const i=(d=(u=e.querySelector("#sigName"))==null?void 0:u.value)==null?void 0:d.trim(),a=(c=e.querySelector("#sigAgree"))==null?void 0:c.checked,l=e.querySelector("#sigMsg");if(!i||!a){l&&(l.textContent="Please enter your name and agree to proceed.");return}localStorage.setItem(Ct.commitmentSigned,"true"),l&&(l.textContent="Signed. You may continue to other sections.")})}function Wr(){document.querySelectorAll(".bio-toggle-btn").forEach(t=>{t.addEventListener("click",function(){const e=this.getAttribute("data-bio"),n=document.getElementById(e);n&&(n.style.display==="none"||n.style.display===""?(n.style.display="block",this.textContent="Hide Bio"):(n.style.display="none",this.textContent="My Bio"))})})}function zr(){const o=document.getElementById("startQuickQuiz2"),t=document.getElementById("quiz2-area");!o||!t||o.addEventListener("click",()=>{var e;t.innerHTML=`
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
    `,(e=document.getElementById("quiz2Submit"))==null||e.addEventListener("click",()=>{var u,d;const n=(u=document.querySelector('input[name="q1"]:checked'))==null?void 0:u.value,i=(d=document.querySelector('input[name="q2"]:checked'))==null?void 0:d.value,a=n==="b"&&i==="b",l=document.getElementById("quiz2Result");l&&(l.textContent=a?"Pass":"Fail",l.className=a?"quiz-feedback correct":"quiz-feedback incorrect")})})}function Or(){const o=document.getElementById("startFinalExam"),t=document.getElementById("exam-area");!o||!t||o.addEventListener("click",async()=>{if(!P){t.innerHTML='<p style="color:red">Final exam generation requires an API key. Set GEMINI_API_KEY in .env.local.</p>';return}t.innerHTML='<div id="loader">Preparing your 50‑question exam…</div>';try{const e=Object.values(x).join(" "),n=await P.models.generateContent({model:"gemini-2.5-flash",contents:"Create a final exam for Roof‑ER training with exactly: 35 multiple‑choice (options+answer), 10 fill‑in‑the‑blank (answer string), 5 short‑answer (keywords array for rubric). Return JSON matching the schema.",config:{responseMimeType:"application/json",responseSchema:{type:b.OBJECT,properties:{multipleChoice:{type:b.ARRAY,items:{type:b.OBJECT,properties:{question:{type:b.STRING},options:{type:b.ARRAY,items:{type:b.STRING}},answer:{type:b.STRING}},required:["question","options","answer"]}},fillBlank:{type:b.ARRAY,items:{type:b.OBJECT,properties:{question:{type:b.STRING},answer:{type:b.STRING}},required:["question","answer"]}},shortAnswer:{type:b.ARRAY,items:{type:b.OBJECT,properties:{prompt:{type:b.STRING},keywords:{type:b.ARRAY,items:{type:b.STRING}}},required:["prompt","keywords"]}}},required:["multipleChoice","fillBlank","shortAnswer"]}}}),i=JSON.parse(n.text.trim());Yr(t,i)}catch(e){console.error(e),t.innerHTML='<p style="color:red">Failed to generate exam. Please try again.</p>'}})}function Yr(o,t){o.innerHTML="";const e=[];Array.isArray(t.multipleChoice)&&e.push("multipleChoice"),Array.isArray(t.fillBlank)&&e.push("fillBlank"),Array.isArray(t.shortAnswer)&&e.push("shortAnswer"),e.forEach(i=>{const a=document.createElement("div");a.className="exam-section",a.innerHTML=`<h3>${i==="multipleChoice"?"Multiple Choice":i==="fillBlank"?"Fill in the Blank":"Short Answer"}</h3>`,t[i].forEach((u,d)=>{const c=document.createElement("div");c.className="exam-item",i==="multipleChoice"?c.innerHTML=`
          <p>${d+1}. ${u.question}</p>
          ${u.options.map((f,p)=>`<label><input type="radio" name="mcq-${d}" value="${f}"> ${f}</label>`).join("")}
        `:i==="fillBlank"?c.innerHTML=`<p>${d+1}. ${u.question}</p><input type="text" name="fib-${d}" />`:c.innerHTML=`<p>${d+1}. ${u.prompt}</p><textarea name="sa-${d}" rows="2"></textarea>`,a.appendChild(c)}),o.appendChild(a)});const n=document.createElement("button");n.textContent="Submit Exam",n.addEventListener("click",()=>Jr(o,t)),o.appendChild(n),o.appendChild(Object.assign(document.createElement("div"),{id:"examResult"}))}function Jr(o,t){let e=0,n=Array.isArray(t.multipleChoice)?t.multipleChoice.length:0;t.multipleChoice&&t.multipleChoice.forEach((m,y)=>{var C;const v=(C=o.querySelector(`input[name="mcq-${y}"]:checked`))==null?void 0:C.value;v&&v===m.answer&&e++});let i=0,a=Array.isArray(t.fillBlank)?t.fillBlank.length:0;t.fillBlank&&t.fillBlank.forEach((m,y)=>{var w,T;const v=(T=(w=o.querySelector(`input[name="fib-${y}"]`))==null?void 0:w.value)==null?void 0:T.trim().toLowerCase(),C=String(m.answer||"").trim().toLowerCase();v&&C&&v===C&&i++});let l=0,u=Array.isArray(t.shortAnswer)?t.shortAnswer.length:0;t.shortAnswer&&t.shortAnswer.forEach((m,y)=>{var T,E;const v=((E=(T=o.querySelector(`textarea[name="sa-${y}"]`))==null?void 0:T.value)==null?void 0:E.toLowerCase())||"",C=Array.isArray(m.keywords)?m.keywords.map(I=>String(I).toLowerCase()):[],w=C.filter(I=>v.includes(I)).length;l+=w/Math.max(C.length,1)});const d=n+a,c=e+i,f=d?Math.round(c/d*100):0,p=u?Math.round(l/u*100):0,g=Math.round(f*.8+p*.2),h=o.querySelector("#examResult");h&&(h.textContent=`MCQ: ${e}/${n}, FIB: ${i}/${a}, SA Score: ${p}%. Overall: ${g}%.`)}function Kr(){const o=document.getElementById("startQuickQuiz1"),t=document.getElementById("quiz1-area");!o||!t||o.addEventListener("click",()=>{var e;t.innerHTML=`
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
    `,(e=document.getElementById("quiz1Submit"))==null||e.addEventListener("click",()=>{var d,c,f;const n=(d=document.querySelector('input[name="qa1"]:checked'))==null?void 0:d.value,i=(c=document.querySelector('input[name="qa2"]:checked'))==null?void 0:c.value,a=(f=document.querySelector('input[name="qa3"]:checked'))==null?void 0:f.value,l=n==="a"&&i==="b"&&a==="c",u=document.getElementById("quiz1Result");if(u)if(l)u.textContent="✓ Perfect! You know the Roof-ER leadership team, core values, and founding year.",u.className="quiz-feedback correct";else{let p="✗ Not quite. ";n!=="a"&&(p+="Review the leadership team. "),i!=="b"&&(p+="Check our core values. "),a!=="c"&&(p+="Roof-ER was founded in 2019. "),u.textContent=p,u.className="quiz-feedback incorrect"}})})}
