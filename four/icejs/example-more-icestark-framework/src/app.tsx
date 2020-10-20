import { createApp, IAppConfig } from 'ice';
import * as React from 'react';
import { ConfigProvider } from '@alifd/next';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => (
      <ConfigProvider prefix="next-fd-">{children}</ConfigProvider>
    ),
  },
  logger: {
    level: 'warn'
  },
  router: {
    type: 'browser',
    fallback: <div>加载中...</div>
  },
  icestark: {
    type: 'framework',
    getApps: async () => {
      const apps = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              path: '/child',
              title: '商家平台',
              url: [
                '//127.0.0.1:3334/js/index.js',
                '//127.0.0.1:3334/css/index.css',
              ],
            },
          ]);
        }, 1000);
      });
      return apps;
    },
    removeRoutesLayout: true,
  },
};

createApp(appConfig);
