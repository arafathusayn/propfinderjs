const flattenObject=(e=null,t={array:!0})=>{let r={},n=[],o=[{object:e,stack:""}],l=!1;for(;o.length>0;){const e=o.pop();let a=e.object;for(let c in a)if(a.hasOwnProperty(c))if(t&&t.array&&(l="Array"==Object.prototype.toString.call(a[c]).replace(/\[object/g,"").replace(/[ \]]/g,"")),"object"==typeof a[c]&&null!=a[c]&&"Object"==Object.prototype.toString.call(a[c]).replace(/\[object/g,"").replace(/[ \]]/g,"")||l){let t=!1;for(let e=0;e<n.length;e++)if(n[e]===a[c]){t=!0;break}t||(n.push(a[c]),o.push({object:a[c],stack:e.stack+(e.stack?".":"")+c}))}else{const t=a[c];r[e.stack+(e.stack?".":"")+c]=t}}return r};let propFinder={findOne:(e=null,t="")=>{if(!t||!e)throw new Error("object (1st argument) or propertyName (2nd argument) can't be empty or falsy value!\n\n");const r=flattenObject(e);let n={};for(const e in r){if(new RegExp(t,"gi").test(e)){n[e]=r[e];break}}return n},findAll:(e=null,t="",r=null)=>{if(!t||!e)throw new Error("object (1st argument) or propertyName (2nd argument) can't be empty or falsy value!\n\n");const n=flattenObject(e,r);let o={};for(const e in n){new RegExp(t,"gi").test(e)&&(o[e]=n[e])}return o}};propFinder.find=propFinder.findOne,module.exports=propFinder;