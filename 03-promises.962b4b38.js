function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequired7c6=r);var i=r("7Y9D8");function l(e,t){return new Promise(((n,o)=>{const r=Math.random()>.3;setTimeout((()=>{r?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(function(t){t.preventDefault();const{delay:n,step:o,amount:r}=t.currentTarget.elements,u={delay:n.value,step:o.value,amount:r.value};let a=Number(u.delay);for(let t=1;t<=Number(u.amount);t+=1)l(t,a).then((t=>{const{position:n,delay:o}=t;e(i).Notify.success(`✅ Fulfilled promise ${n} in ${o}ms`)})).catch((t=>{const{position:n,delay:o}=t;e(i).Notify.failure(`❌ Rejected promise ${n} in ${o}ms`)})),a+=Number(u.step)}));
//# sourceMappingURL=03-promises.962b4b38.js.map
