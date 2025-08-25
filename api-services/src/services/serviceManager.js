import HttpService from './httpService.js'

/**
 * 服务管理器
 * 统一管理HTTP客户端服务，提供服务发现和依赖注入功能
 */
class ServiceManager {
  constructor() {
    this.services = new Map()
    this.initialized = false
    this.initPromise = null
  }

  /**
   * 初始化所有服务
   */
  async init() {
    if (this.initialized) return
    
    if (this.initPromise) {
      return this.initPromise
    }

    this.initPromise = this._doInit()
    return this.initPromise
  }

  async _doInit() {
    console.log('🚀 初始化共享服务...')
    
    try {
      // 注册HTTP服务
      this.services.set('http', new HttpService())
      
      // 可以在这里注册更多通用服务
      // this.services.set('cache', new CacheService())
      // this.services.set('auth', new AuthService())
      // this.services.set('logger', new LoggerService())
      
      this.initialized = true
      console.log('✅ 共享服务初始化完成')
      console.log('📋 已注册的服务:', Array.from(this.services.keys()))
      
    } catch (error) {
      console.error('❌ 服务初始化失败:', error)
      throw error
    }
  }

  /**
   * 获取服务实例
   */
  getService(name) {
    if (!this.initialized) {
      console.warn('⚠️ 服务管理器尚未初始化，请先调用 init() 方法')
    }
    
    const service = this.services.get(name)
    if (!service) {
      throw new Error(`服务 '${name}' 未注册`)
    }
    
    return service
  }

  /**
   * 检查服务是否存在
   */
  hasService(name) {
    return this.services.has(name)
  }

  /**
   * 获取所有已注册的服务名称
   */
  getServiceNames() {
    return Array.from(this.services.keys())
  }

  /**
   * 清空所有服务缓存
   */
  clearAllCache() {
    console.log('🗑️ 清空所有服务缓存...')
    this.services.forEach((service, name) => {
      if (typeof service.clearCache === 'function') {
        service.clearCache()
      }
    })
  }

  /**
   * 获取服务健康状态
   */
  async getHealthStatus() {
    const status = {
      initialized: this.initialized,
      services: {},
      timestamp: new Date().toISOString()
    }

    for (const [name, service] of this.services) {
      try {
        // 尝试调用服务的健康检查方法
        if (typeof service.healthCheck === 'function') {
          await service.healthCheck()
          status.services[name] = 'healthy'
        } else {
          status.services[name] = 'unknown'
        }
      } catch (error) {
        status.services[name] = `error: ${error.message}`
      }
    }

    return status
  }
}

// 创建单例实例
const serviceManager = new ServiceManager()

export default serviceManager