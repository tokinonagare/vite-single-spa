/**
 * 通用API客户端
 * 提供统一的网络请求处理、错误处理、缓存等功能
 */

class ApiClient {
  constructor(config = {}) {
    this.baseURL = config.baseURL || ''
    this.timeout = config.timeout || 10000
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers
    }
    this.cache = new Map()
    this.cacheTimeout = config.cacheTimeout || 5 * 60 * 1000 // 5分钟缓存
  }

  /**
   * 模拟网络延迟
   */
  async simulateNetworkDelay(min = 300, max = 1200) {
    const delay = Math.random() * (max - min) + min
    return new Promise(resolve => setTimeout(resolve, delay))
  }

  /**
   * 模拟网络错误
   */
  simulateNetworkError(errorRate = 0.1) {
    return Math.random() < errorRate
  }

  /**
   * 缓存管理
   */
  getCacheKey(url, options = {}) {
    return `${url}_${JSON.stringify(options)}`
  }

  getFromCache(key) {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log('📦 从缓存获取数据:', key)
      return cached.data
    }
    return null
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  clearCache() {
    this.cache.clear()
    console.log('🗑️ 缓存已清空')
  }

  /**
   * 通用请求方法
   */
  async request(url, options = {}) {
    const {
      method = 'GET',
      data = null,
      headers = {},
      useCache = true,
      simulateError = true,
      simulateDelay = true
    } = options

    // 缓存检查
    const cacheKey = this.getCacheKey(url, { method, data })
    if (useCache && method === 'GET') {
      const cached = this.getFromCache(cacheKey)
      if (cached) return cached
    }

    console.log(`🌐 API请求: ${method} ${url}`, data || '')

    try {
      // 模拟网络延迟
      if (simulateDelay) {
        await this.simulateNetworkDelay()
      }

      // 模拟网络错误
      if (simulateError && this.simulateNetworkError(0.1)) {
        throw new Error('网络连接失败，请检查网络后重试')
      }

      // 这里是模拟响应，实际项目中会发送真实HTTP请求
      const response = await this.mockRequest(url, options)
      
      // 缓存响应结果
      if (useCache && method === 'GET') {
        this.setCache(cacheKey, response)
      }

      console.log('✅ API响应成功:', response.message || 'OK')
      return response

    } catch (error) {
      console.error('❌ API请求失败:', error.message)
      throw error
    }
  }

  /**
   * 模拟请求处理（实际项目中替换为真实的HTTP请求）
   */
  async mockRequest(url, options) {
    // 这个方法会被具体的服务类重写
    throw new Error('mockRequest method should be implemented by subclass')
  }

  /**
   * GET请求
   */
  async get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' })
  }

  /**
   * POST请求
   */
  async post(url, data, options = {}) {
    return this.request(url, { ...options, method: 'POST', data })
  }

  /**
   * PUT请求
   */
  async put(url, data, options = {}) {
    return this.request(url, { ...options, method: 'PUT', data })
  }

  /**
   * DELETE请求
   */
  async delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' })
  }
}

export default ApiClient