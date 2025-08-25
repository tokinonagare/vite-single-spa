/**
 * 现代化HTTP客户端
 * 基于Ky库提供统一的网络请求处理、错误处理、缓存等功能
 */

import ky from 'ky'

class HttpClient {
  constructor(config = {}) {
    this.config = {
      timeout: 10000,
      retry: 3,
      cache: 'no-cache',
      ...config
    }

    // 创建Ky实例
    this.client = ky.create({
      prefixUrl: config.baseURL || '',
      timeout: this.config.timeout,
      retry: this.config.retry,
      hooks: {
        beforeRequest: [this._beforeRequest.bind(this)],
        beforeRetry: [this._beforeRetry.bind(this)],
        afterResponse: [this._afterResponse.bind(this)]
      },
      ...this.config
    })

    // 内存缓存
    this.cache = new Map()
    this.cacheTimeout = config.cacheTimeout || 5 * 60 * 1000 // 5分钟缓存
  }

  /**
   * 请求前钩子
   */
  _beforeRequest(request) {
    console.log(`🌐 HTTP请求: ${request.method} ${request.url}`)
    
    // 添加通用请求头
    if (this.config.headers) {
      Object.entries(this.config.headers).forEach(([key, value]) => {
        request.headers.set(key, value)
      })
    }

    // 添加认证头
    if (this.config.token) {
      request.headers.set('Authorization', `Bearer ${this.config.token}`)
    }
  }

  /**
   * 重试前钩子
   */
  _beforeRetry({ request, options, error, retryCount }) {
    console.log(`🔄 重试请求 (${retryCount}/${options.retry}): ${request.method} ${request.url}`, error.message)
  }

  /**
   * 响应后钩子
   */
  _afterResponse(request, options, response) {
    console.log(`✅ HTTP响应: ${request.method} ${request.url} - ${response.status} ${response.statusText}`)
  }

  /**
   * 缓存管理
   */
  _getCacheKey(url, options = {}) {
    const { method = 'GET', searchParams = {}, json } = options
    return `${method}:${url}:${JSON.stringify(searchParams)}:${JSON.stringify(json)}`
  }

  _getFromCache(key) {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log('📦 从缓存获取数据:', key)
      return cached.data
    }
    return null
  }

  _setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
    console.log('💾 数据已缓存:', key)
  }

  /**
   * 通用请求方法
   */
  async request(url, options = {}) {
    const { useCache = false, method = 'get', ...kyOptions } = options

    // 缓存检查 (仅对GET请求)
    if (useCache && method.toLowerCase() === 'get') {
      const cacheKey = this._getCacheKey(url, kyOptions)
      const cached = this._getFromCache(cacheKey)
      if (cached) return cached
    }

    try {
      let response
      const methodName = method.toLowerCase()

      // 根据方法调用对应的Ky方法
      switch (methodName) {
        case 'get':
          response = await this.client.get(url, kyOptions)
          break
        case 'post':
          response = await this.client.post(url, kyOptions)
          break
        case 'put':
          response = await this.client.put(url, kyOptions)
          break
        case 'patch':
          response = await this.client.patch(url, kyOptions)
          break
        case 'delete':
          response = await this.client.delete(url, kyOptions)
          break
        case 'head':
          response = await this.client.head(url, kyOptions)
          break
        default:
          throw new Error(`不支持的HTTP方法: ${method}`)
      }

      // 解析响应
      let data
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else if (contentType && contentType.includes('text/')) {
        data = await response.text()
      } else {
        data = await response.arrayBuffer()
      }

      const result = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
        ok: response.ok
      }

      // 缓存响应结果
      if (useCache && method.toLowerCase() === 'get') {
        const cacheKey = this._getCacheKey(url, kyOptions)
        this._setCache(cacheKey, result)
      }

      return result

    } catch (error) {
      console.error(`❌ HTTP请求失败: ${method} ${url}`, error.message)
      
      // 处理Ky特定的错误
      if (error.name === 'HTTPError') {
        const errorData = {
          status: error.response.status,
          statusText: error.response.statusText,
          message: `HTTP错误 ${error.response.status}: ${error.response.statusText}`
        }
        throw new Error(errorData.message, { cause: errorData })
      }
      
      if (error.name === 'TimeoutError') {
        throw new Error('请求超时，请检查网络连接')
      }

      throw error
    }
  }

  /**
   * GET请求
   */
  async get(url, options = {}) {
    return this.request(url, { ...options, method: 'get' })
  }

  /**
   * POST请求
   */
  async post(url, data, options = {}) {
    const kyOptions = { ...options, method: 'post' }
    
    if (data) {
      if (typeof data === 'object') {
        kyOptions.json = data
      } else {
        kyOptions.body = data
      }
    }

    return this.request(url, kyOptions)
  }

  /**
   * PUT请求
   */
  async put(url, data, options = {}) {
    const kyOptions = { ...options, method: 'put' }
    
    if (data) {
      if (typeof data === 'object') {
        kyOptions.json = data
      } else {
        kyOptions.body = data
      }
    }

    return this.request(url, kyOptions)
  }

  /**
   * PATCH请求
   */
  async patch(url, data, options = {}) {
    const kyOptions = { ...options, method: 'patch' }
    
    if (data) {
      if (typeof data === 'object') {
        kyOptions.json = data
      } else {
        kyOptions.body = data
      }
    }

    return this.request(url, kyOptions)
  }

  /**
   * DELETE请求
   */
  async delete(url, options = {}) {
    return this.request(url, { ...options, method: 'delete' })
  }

  /**
   * HEAD请求
   */
  async head(url, options = {}) {
    return this.request(url, { ...options, method: 'head' })
  }

  /**
   * 上传文件
   */
  async upload(url, file, options = {}) {
    const formData = new FormData()
    
    if (file instanceof File) {
      formData.append('file', file)
    } else if (typeof file === 'object') {
      Object.entries(file).forEach(([key, value]) => {
        formData.append(key, value)
      })
    }

    return this.request(url, {
      ...options,
      method: 'post',
      body: formData
    })
  }

  /**
   * 设置认证令牌
   */
  setAuthToken(token) {
    this.config.token = token
  }

  /**
   * 清除认证令牌
   */
  clearAuthToken() {
    this.config.token = null
  }

  /**
   * 清空缓存
   */
  clearCache() {
    this.cache.clear()
    console.log('🗑️ HTTP客户端缓存已清空')
  }

  /**
   * 设置基础URL
   */
  setBaseURL(baseURL) {
    this.client = this.client.extend({ prefixUrl: baseURL })
  }

  /**
   * 扩展客户端配置
   */
  extend(options) {
    return new HttpClient({
      ...this.config,
      ...options
    })
  }
}

// 创建默认实例
const defaultHttpClient = new HttpClient({
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export default HttpClient
export { defaultHttpClient }