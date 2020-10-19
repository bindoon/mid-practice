import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Button } from 'antd';

import 'antd/dist/antd.min.css';

const { TabPane } = Tabs;

const global = {
  'app1': {
    name: 'young 自羽',
    age: 18
  },
  'app2': {
    name: 'old 自羽',
    age: 27
  }
}

let currentGlobalKey = 'app1';

const proxyGlobal = new Proxy(global, {
  get(target, key) {
    // 这里只写主流程 暂不去做容错处理
    return target[currentGlobalKey];
  },
  set(target, key, value) {
    // 这里只写主流程 暂不去做容错处理
    return target[currentGlobalKey][key] = value;
  }
})

const App = () => {
  console.log('proxyGlobal =>', proxyGlobal)
  console.log('proxyGlobal app1 =>', proxyGlobal.get)

  const [currentKey, setCurrentKey] = useState('app1')
  // setTimeout(() => {
  //   currentGlobalKey = 'app2';

  //   console.log('proxyGlobal app2 =>', proxyGlobal.get)
  //   console.log('---------- 5 秒后 app2 中修改 old 自羽 的名字为 韩梅梅 ----------')

  //   setTimeout(() => {
  //     proxyGlobal.name = '韩梅梅';

  //     console.log('proxyGlobal app2 =>', proxyGlobal.get)
  //     console.log('查看目前的所有的代理的值 =>', proxyGlobal)
  //   }, 5000)

  // }, 10000)

  return (
    <div>
      <Tabs
        activeKey={currentKey}
        onChange={(key) => {
          currentGlobalKey = key;
          setCurrentKey(key);
        }}
      >
        <TabPane tab="app1" key="app1">
          {JSON.stringify(proxyGlobal.get, null, 2)}
        </TabPane>
        <TabPane tab="app2" key="app2">
          {JSON.stringify(proxyGlobal.get, null, 2)}
          <div></div>
          <Button
            onClick={() => {
              proxyGlobal.name = '韩梅梅';
            }}
          >修改name</Button>
        </TabPane>
      </Tabs>
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#proxyRoot'));
