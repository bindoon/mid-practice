'use strict';

const Tools = {
  getUrlParam(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = decodeURIComponent(window.location.search.substr(1)).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
};

export default Tools;
