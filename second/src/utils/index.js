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
};

export const nameSpace = Tools.namespace.bind(Tools);
export default Tools;
