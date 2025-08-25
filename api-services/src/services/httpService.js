import HttpClient from './httpClient.js'

/**
 * HTTP服务 - 通用的HTTP客户端服务
 * 不包含具体的业务逻辑，由调用方定义API端点和参数
 */
class HttpService {
  constructor() {
    // 创建多个预配置的HTTP客户端实例
    this.clients = new Map()
    
    // 默认客户端
    this.defaultClient = new HttpClient({
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  }

  /**
   * 创建或获取HTTP客户端实例
   * @param {string} name 客户端名称
   * @param {Object} config 客户端配置
   * @returns {HttpClient} HTTP客户端实例
   */
  createClient(name, config = {}) {
    if (this.clients.has(name)) {
      return this.clients.get(name)
    }

    const client = new HttpClient(config)
    this.clients.set(name, client)
    
    console.log(`🔗 创建HTTP客户端: ${name}`, config)
    return client
  }

  /**
   * 获取HTTP客户端实例
   * @param {string} name 客户端名称
   * @returns {HttpClient|null} HTTP客户端实例
   */
  getClient(name) {
    return this.clients.get(name) || null
  }

  /**
   * 获取默认HTTP客户端
   * @returns {HttpClient} 默认HTTP客户端实例
   */
  getDefaultClient() {
    return this.defaultClient
  }

  /**
   * 列出所有客户端
   * @returns {string[]} 客户端名称列表
   */
  listClients() {
    return Array.from(this.clients.keys())
  }

  /**
   * 通用HTTP请求方法 - 使用默认客户端
   * @param {string} url 请求URL
   * @param {Object} options 请求选项
   * @returns {Promise} 请求结果
   */
  async request(url, options = {}) {
    return this.defaultClient.request(url, options)
  }

  /**
   * GET请求
   */
  async get(url, options = {}) {
    return this.defaultClient.get(url, options)
  }

  /**
   * POST请求
   */
  async post(url, data, options = {}) {
    return this.defaultClient.post(url, data, options)
  }

  /**
   * PUT请求
   */
  async put(url, data, options = {}) {
    return this.defaultClient.put(url, data, options)
  }

  /**
   * PATCH请求
   */
  async patch(url, data, options = {}) {
    return this.defaultClient.patch(url, data, options)
  }

  /**
   * DELETE请求
   */
  async delete(url, options = {}) {
    return this.defaultClient.delete(url, options)
  }

  /**
   * HEAD请求
   */
  async head(url, options = {}) {
    return this.defaultClient.head(url, options)
  }

  /**
   * 文件上传
   */
  async upload(url, file, options = {}) {
    return this.defaultClient.upload(url, file, options)
  }

  /**
   * 设置全局认证令牌
   * @param {string} token 认证令牌
   * @param {string} clientName 客户端名称（可选）
   */
  setAuthToken(token, clientName = null) {
    if (clientName && this.clients.has(clientName)) {
      this.clients.get(clientName).setAuthToken(token)
    } else {
      this.defaultClient.setAuthToken(token)
    }
  }

  /**
   * 清除认证令牌
   * @param {string} clientName 客户端名称（可选）
   */
  clearAuthToken(clientName = null) {
    if (clientName && this.clients.has(clientName)) {
      this.clients.get(clientName).clearAuthToken()
    } else {
      this.defaultClient.clearAuthToken()
    }
  }

  /**
   * 清空所有缓存
   */
  clearAllCache() {
    this.defaultClient.clearCache()
    this.clients.forEach(client => client.clearCache())
    console.log('🗑️ 已清空所有HTTP客户端缓存')
  }

  /**
   * 销毁客户端实例
   * @param {string} name 客户端名称
   */
  destroyClient(name) {
    if (this.clients.has(name)) {
      const client = this.clients.get(name)
      client.clearCache()
      this.clients.delete(name)
      console.log(`🗑️ 已销毁HTTP客户端: ${name}`)
    }
  }

  /**
   * 健康检查
   */
  async healthCheck() {
    const status = {
      service: 'HttpService',
      clients: this.listClients(),
      defaultClient: {
        timeout: this.defaultClient.config.timeout,
        retry: this.defaultClient.config.retry,
        cacheSize: this.defaultClient.cache.size
      },
      timestamp: new Date().toISOString()
    }

    return {
      success: true,
      data: status,
      message: 'HTTP服务运行正常'
    }
  }
}

export default HttpService