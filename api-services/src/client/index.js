/**
 * 简化的客户端模块入口
 * 只保留必要的基础客户端功能
 */

import BaseServiceClient from './baseServiceClient.js'

// 导出基础客户端类（用于特殊需求场景）
export { BaseServiceClient }

// 导出便捷的创建函数
export function createServiceClient(serviceName, options = {}) {
  return new BaseServiceClient({
    serviceName,
    ...options
  })
}

// 默认导出基础客户端类
export default BaseServiceClient

/**
 * 注意：
 * 现在推荐直接在调用方创建业务API类，如：
 * - gameApi.js
 * - userApi.js  
 * - paymentApi.js
 * 
 * 这样更简洁、直接、易于理解和维护
 */