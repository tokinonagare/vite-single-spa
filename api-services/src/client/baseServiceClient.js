/**
 * 基础服务客户端
 * 提供通用的共享服务访问和等待逻辑
 */

class BaseServiceClient {
  constructor(options = {}) {
    this.maxWaitTime = options.maxWaitTime || 10000 // 最大等待时间 10秒
    this.retryInterval = options.retryInterval || 100 // 重试间隔 100ms
    this.serviceName = options.serviceName || 'Unknown Service'

    // 缓存已获取的服务实例
    this._servicesCache = null
    this._servicesPromise = null
  }

  /**
   * 等待共享服务就绪
   * @returns {Promise<Object>} 共享服务对象
   */
  async waitForSharedServices() {
    // 如果已经有缓存的服务，直接返回
    if (this._servicesCache) {
      return this._servicesCache
    }

    // 如果正在等待服务，返回相同的Promise避免重复等待
    if (this._servicesPromise) {
      return this._servicesPromise
    }

    this._servicesPromise = this._doWaitForServices()
    return this._servicesPromise
  }

  /**
   * 执行等待服务的逻辑
   * @private
   */
  async _doWaitForServices() {
    const startTime = Date.now()

    console.log(`⏳ ${this.serviceName}: 等待共享服务就绪...`)

    while (Date.now() - startTime < this.maxWaitTime) {
      if (typeof window !== 'undefined' && window.__SHARED_SERVICES__) {
        this._servicesCache = window.__SHARED_SERVICES__
        console.log(`✅ ${this.serviceName}: 共享服务已就绪`)
        return this._servicesCache
      }

      // 等待指定时间后重试
      await this._sleep(this.retryInterval)
    }

    const errorMsg = `${this.serviceName}: 共享服务加载超时 (${this.maxWaitTime}ms)，请刷新页面重试`
    console.error(`❌ ${errorMsg}`)
    throw new Error(errorMsg)
  }

  /**
   * 睡眠指定毫秒数
   * @param {number} ms 毫秒数
   * @private
   */
  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * 获取指定的服务实例
   * @param {string} serviceName 服务名称
   * @returns {Promise<Object>} 服务实例
   */
  async getService(serviceName) {
    try {
      const services = await this.waitForSharedServices()

      if (!services.serviceManager) {
        throw new Error('服务管理器不可用')
      }

      return services.serviceManager.getService(serviceName)
    } catch (error) {
      console.error(`❌ ${this.serviceName}: 获取服务 '${serviceName}' 失败:`, error)
      throw error
    }
  }

  /**
   * 调用共享服务的便捷方法
   * @param {Function} serviceGetter 获取服务的函数，如 (services) => services.getGameService()
   * @returns {Promise<Object>} 服务实例
   */
  async callService(serviceGetter) {
    try {
      const services = await this.waitForSharedServices()
      return await serviceGetter(services)
    } catch (error) {
      console.error(`❌ ${this.serviceName}: 调用服务失败:`, error)
      throw error
    }
  }

  /**
   * 清空服务缓存（强制重新获取）
   */
  clearCache() {
    console.log(`🗑️ ${this.serviceName}: 清空服务缓存`)
    this._servicesCache = null
    this._servicesPromise = null
  }

  /**
   * 检查共享服务是否可用
   * @returns {boolean} 是否可用
   */
  isServicesAvailable() {
    return typeof window !== 'undefined' && !!window.__SHARED_SERVICES__
  }

  /**
   * 获取服务健康状态
   * @returns {Promise<Object>} 健康状态信息
   */
  async getHealthStatus() {
    try {
      return await this.callService(services => services.getHealthStatus())
    } catch (error) {
      console.error(`❌ ${this.serviceName}: 获取健康状态失败:`, error)
      throw error
    }
  }

  /**
   * 清空所有服务缓存
   */
  async clearAllCache() {
    try {
      await this.callService(services => services.clearCache())
      console.log(`🗑️ ${this.serviceName}: 已清空所有服务缓存`)
    } catch (error) {
      console.error(`❌ ${this.serviceName}: 清空缓存失败:`, error)
    }
  }

  /**
   * 设置最大等待时间
   * @param {number} maxWaitTime 最大等待时间（毫秒）
   */
  setMaxWaitTime(maxWaitTime) {
    this.maxWaitTime = maxWaitTime
    console.log(`⚙️ ${this.serviceName}: 设置最大等待时间为 ${maxWaitTime}ms`)
  }

  /**
   * 设置重试间隔
   * @param {number} retryInterval 重试间隔（毫秒）
   */
  setRetryInterval(retryInterval) {
    this.retryInterval = retryInterval
    console.log(`⚙️ ${this.serviceName}: 设置重试间隔为 ${retryInterval}ms`)
  }
}

export default BaseServiceClient
