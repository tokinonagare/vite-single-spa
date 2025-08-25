import serviceManager from './services/serviceManager.js'
import HttpClient from './services/httpClient.js'
import clientFactory from './services/clientFactory.js'
import { BaseServiceClient, createServiceClient } from './client/index.js'

// 暴露到全局，供其他微应用使用
let isInitialized = false

/**
 * Single-SPA 生命周期函数
 */
export async function bootstrap() {
  console.log('🌐 API Services is bootstrapping')
  return Promise.resolve()
}

export async function mount() {
  console.log('🌐 API Services is mounting')
  
  if (!isInitialized) {
    await serviceManager.init()
    
    // 将服务管理器和客户端类暴露到全局
    if (typeof window !== 'undefined') {
      window.$api = {
        serviceManager,
        // HTTP服务
        getHttpService: () => serviceManager.getService('http'),
        // 便捷的客户端工厂 (推荐使用)
        createClient: (name, config) => clientFactory.createClient(name, config),
        getClient: (name) => clientFactory.getClient(name),
        // 工具方法
        clearCache: () => serviceManager.clearAllCache(),
        getHealthStatus: () => serviceManager.getHealthStatus(),
        // HTTP客户端类 (高级用法)
        HttpClient,
        BaseServiceClient,
        createServiceClient
      }
      
      console.log('🌐 HTTP客户端服务已暴露到 window.$api')
    }
    
    isInitialized = true
  }
  
  console.log('✅ API Services mounted successfully')
  return Promise.resolve()
}

export async function unmount() {
  console.log('🌐 API Services is unmounting')
  
  // 清理全局引用
  if (typeof window !== 'undefined' && window.$api) {
    delete window.$api
  }
  
  return Promise.resolve()
}

// 直接导出服务（用于开发环境测试）
export { serviceManager }

// 便捷HTTP API导出
export const httpApi = {
  // HTTP服务获取
  async getHttpService() {
    await serviceManager.init()
    return serviceManager.getService('http')
  },
  
  // 通用HTTP方法
  async request(url, options = {}) {
    const httpService = await this.getHttpService()
    return httpService.request(url, options)
  },
  
  async get(url, options = {}) {
    const httpService = await this.getHttpService()
    return httpService.get(url, options)
  },
  
  async post(url, data, options = {}) {
    const httpService = await this.getHttpService()
    return httpService.post(url, data, options)
  },
  
  async put(url, data, options = {}) {
    const httpService = await this.getHttpService()
    return httpService.put(url, data, options)
  },
  
  async patch(url, data, options = {}) {
    const httpService = await this.getHttpService()
    return httpService.patch(url, data, options)
  },
  
  async delete(url, options = {}) {
    const httpService = await this.getHttpService()
    return httpService.delete(url, options)
  },
  
  async upload(url, file, options = {}) {
    const httpService = await this.getHttpService()
    return httpService.upload(url, file, options)
  },
  
  // HTTP客户端管理
  async createClient(name, config = {}) {
    const httpService = await this.getHttpService()
    return httpService.createClient(name, config)
  },
  
  async getClient(name) {
    const httpService = await this.getHttpService()
    return httpService.getClient(name)
  },
  
  // 认证管理
  async setAuthToken(token, clientName = null) {
    const httpService = await this.getHttpService()
    return httpService.setAuthToken(token, clientName)
  },
  
  async clearAuthToken(clientName = null) {
    const httpService = await this.getHttpService()
    return httpService.clearAuthToken(clientName)
  }
}

// 保持向后兼容
export const api = httpApi