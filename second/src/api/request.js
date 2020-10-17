import qs from 'qs';

/**
 * 封装的fetch函数，传入url(必须)和一个参数对象(可选)，这是fetch的需求参数
 */
export default function request(url, data, options = {}) {
  const _opt = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    ...options,
  };
  if (_opt.method === 'GET') {
    url += `?${qs.stringify(data)}`;
  } else {
    _opt.body = JSON.stringify(data);
  }
  /**
     * 全部配置好之后，最后使用fetch发起一个请求，它本身需要传入一个url和一个options
     */
  return fetch(url, _opt)
    .then((response) => {
      // fetch与ajax(axios)不同，只要服务器有返回值，都是成功，没有返回值才算失败。
      // 所以要在这里进行处理所有返回的结果
      if (!/^(2|3)\d{2}$/.test(response.status)) {
        // 失败的状态，非2|3开头的状态，进行处理
        switch (response.status) {
          case 401:
            // 权限不够，一般是未登录
            // ...
            break;
          case 403:
            // 服务器已经接受，但是拒绝访问，通常是登录过期
            // ...
            localStorage.removeItem('token');
            break;
          case 404:
            // 找不到资源
            // ...
            break;
          default:
            break;
        }
      }
      const contentType = response.headers.get('Content-Type');
      if (contentType) {
        if (contentType.indexOf('json') > -1) {
          return response.json();
        }
        if (contentType.indexOf('text') > -1) {
          return response.text();
        }
        if (contentType.indexOf('form') > -1) {
          return response.formData();
        }
        if (contentType.indexOf('video') > -1) {
          return response.blob();
        }
      }
      // 处理之后，将response的所有数据转换成json，客户端就可以拿到以json格式响应的所有数据
      return response.text();
    })
    .catch((error) => {
      // 服务器没有响应才会跳转到这里
      if (!window.navigator.onLine) {
        // 断网处理
        // ...
        return;
      }
      // 什么都没有，返回一个错误
      return Promise.reject(error);
    });
}
