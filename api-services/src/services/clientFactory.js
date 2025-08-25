/**
 * HTTP客户端工厂
 * 处理复杂的初始化逻辑，为调用方提供简洁的API
 */

class ClientFactory {
  constructor() {
    this._clients = new Map()
    this._serviceReady = false
    this._serviceReadyPromise = null
  }

  /**
   * 等待服务就绪
   */
  async _waitForService() {
    if (this._serviceReady) return

    if (this._serviceReadyPromise) {
      return this._serviceReadyPromise
    }

    this._serviceReadyPromise = this._doWaitForService()
    return this._serviceReadyPromise
  }

  async _doWaitForService() {
    let attempts = 0
    const maxAttempts = 50 // 5秒超时
    
    while (attempts < maxAttempts) {
      if (typeof window !== 'undefined' && window.$api?.getHttpService) {
        this._serviceReady = true
        console.log('🌐 共享HTTP服务就绪')
        return
      }
      
      await new Promise(resolve => setTimeout(resolve, 100))
      attempts++
    }
    
    throw new Error('HTTP服务初始化超时')
  }

  /**
   * 创建HTTP客户端 - 简单直接的API
   * @param {string} name 客户端名称
   * @param {Object} config 客户端配置
   * @returns {Promise<HttpClient>} HTTP客户端实例
   */
  async createClient(name, config = {}) {
    // 检查是否已存在
    if (this._clients.has(name)) {
      return this._clients.get(name)
    }

    try {
      // 等待服务就绪
      await this._waitForService()
      
      // 获取HTTP服务并创建客户端
      const httpService = window.$api.getHttpService()
      const client = httpService.createClient(name, config)
      
      // 缓存客户端实例
      this._clients.set(name, client)
      
      console.log(`✅ ${name} API客户端创建成功`)
      return client
      
    } catch (error) {
      console.error(`❌ ${name} API客户端创建失败:`, error)
      throw error
    }
  }

  /**
   * 获取已创建的客户端
   * @param {string} name 客户端名称
   * @returns {HttpClient|null} HTTP客户端实例
   */
  getClient(name) {
    return this._clients.get(name) || null
  }

  /**
   * 销毁客户端
   * @param {string} name 客户端名称
   */
  destroyClient(name) {
    if (this._clients.has(name)) {
      const client = this._clients.get(name)
      client.clearCache?.()
      this._clients.delete(name)
      console.log(`🗑️ ${name} API客户端已销毁`)
    }
  }

  /**
   * 清空所有客户端
   */
  clear() {
    this._clients.forEach((client, name) => {
      client.clearCache?.()
    })
    this._clients.clear()
    console.log('🗑️ 所有API客户端已清空')
  }
}

// 创建全局单例
const clientFactory = new ClientFactory()

export default clientFactory