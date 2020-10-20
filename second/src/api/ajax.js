// AJAX 使用方法
// XMLHttpRequest
// 生成 XMLHttpRequest 实例对象
// 配置 XMLHttpRequest 实例对象
// 发送请求
// 监听 XMLHttpRequest 代理状态

export default function ajax(options) {
  const { url, method, body } = options;
  return new Promise(((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send(body);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve.call(undefined, xhr.responseText);
        } else if (xhr.status >= 400) {
          reject.call(undefined, xhr);
        }
      }
    };
  }));
}
