import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 将 React Native Web 应用注册到全局
import { AppRegistry } from 'react-native';
AppRegistry.registerComponent('HomeApp', () => App);

let reactRoot;

export async function bootstrap() {
  console.log('🏠 Home app is bootstrapping');
  return Promise.resolve();
}

export async function mount(props) {
  console.log('🏠 Home app is mounting');
  
  const container = document.getElementById('single-spa-application:@vite-single-spa/home');
  
  if (!container) {
    console.error('🚨 Container element not found for home app');
    return Promise.reject(new Error('Container not found'));
  }
  
  try {
    // 使用 React 18 的新 createRoot API
    reactRoot = ReactDOM.createRoot(container);
    reactRoot.render(React.createElement(App, props));
    console.log('✅ Home app mounted successfully');
  } catch (error) {
    console.error('❌ Error mounting home app:', error);
    return Promise.reject(error);
  }
  
  return Promise.resolve();
}

export async function unmount() {
  console.log('🏠 Home app is unmounting');
  
  if (reactRoot) {
    try {
      reactRoot.unmount();
      reactRoot = null;
      console.log('✅ Home app unmounted successfully');
    } catch (error) {
      console.error('❌ Error unmounting home app:', error);
      return Promise.reject(error);
    }
  }
  
  return Promise.resolve();
}