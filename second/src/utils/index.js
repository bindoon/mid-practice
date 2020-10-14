'use strict';

const Tools = {
  getUrlParam(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = decodeURIComponent(window.location.search.substr(1)).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  namespace(name) {
    return function (v) {
      return `${name}-${v}`;
    };
  },
  obj2String(obj, arr = [], idx = 0) {
    for (const item in obj) {
      arr[idx + 1] = [item, obj[item]];
    }
    return new URLSearchParams(arr).toString();
  },
};

export const nameSpace = Tools.namespace.bind(Tools);
export default Tools;
