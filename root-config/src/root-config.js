import {
  registerApplication,
  start,
} from 'single-spa';

// 异步加载应用的辅助函数
const loadApp = async (url) => {
  try {
    return await import(/* @vite-ignore */ url);
  } catch (error) {
    console.error(`Failed to load app from ${url}:`, error);
    // 返回一个默认的空应用
    return {
      bootstrap: () => Promise.resolve(),
      mount: () => {
        const element = document.createElement('div');
        element.innerHTML = `<div style="padding: 20px; text-align: center; color: #666;">
          <p>🚧 ${error.message}</p>
          <p>应用正在开发中...</p>
        </div>`;
        return Promise.resolve();
      },
      unmount: () => Promise.resolve()
    };
  }
};

// 注册首页微应用（默认显示）
registerApplication({
  name: '@vite-single-spa/home',
  app: () => loadApp('http://localhost:9001/src/home.js'),
  activeWhen: ['/home', '/']
});

// 注册游戏微应用
registerApplication({
  name: '@vite-single-spa/games',
  app: () => loadApp('http://localhost:9002/src/games.js'),
  activeWhen: ['/games']
});

// 注册活动微应用
registerApplication({
  name: '@vite-single-spa/events',
  app: () => loadApp('http://localhost:9003/src/events.js'),
  activeWhen: ['/events']
});

// 注册钱包微应用
registerApplication({
  name: '@vite-single-spa/wallet',
  app: () => loadApp('http://localhost:9004/src/wallet.js'),
  activeWhen: ['/wallet']
});

// 注册我的微应用
registerApplication({
  name: '@vite-single-spa/profile',
  app: () => loadApp('http://localhost:9005/src/profile.js'),
  activeWhen: ['/profile']
});

// 启动 single-spa
start({
  urlRerouteOnly: true,
});

// 添加全局错误处理
window.addEventListener('single-spa:routing-event', () => {
  console.log('Single-SPA routing event triggered');
});

window.addEventListener('single-spa:app-change', (event) => {
  console.log('Single-SPA app change:', event.detail);
});

console.log('Root config loaded with micro apps architecture');
