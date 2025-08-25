# API Services - 通用HTTP客户端服务

## 🎯 设计理念

API Services 现在是一个**纯粹的HTTP客户端服务**，专注于提供现代化的HTTP请求能力，**不包含具体的业务逻辑**。业务API的定义和调用应该在各个微应用中完成。

## ✨ 核心特性

### 🌐 通用HTTP客户端
- 基于现代 **Ky** 库构建
- 支持所有标准HTTP方法（GET、POST、PUT、PATCH、DELETE、HEAD）
- 自动JSON解析和错误处理
- 文件上传支持

### 🔧 多客户端管理
- 支持创建多个独立的HTTP客户端实例
- 每个客户端可有不同的配置（baseURL、timeout、headers等）
- 客户端级别的缓存和认证管理

### 🛡️ 企业级功能
- **自动重试机制** - 指数退避算法
- **智能缓存** - 可配置的内存缓存
- **认证管理** - JWT令牌自动管理
- **请求拦截器** - 自动添加headers和日志
- **错误处理** - 统一的错误处理机制

## 📖 使用方式

### 1. 在调用方（如home应用）中创建业务API类

```javascript
// gameApi.js - 在home应用中定义
class GameApi {
  constructor() {
    // 获取HTTP服务
    this.httpService = window.__SHARED_SERVICES__.getHttpService()
    
    // 创建专用客户端
    this.client = this.httpService.createClient('game', {
      baseURL: '/api/games',
      timeout: 8000,
      headers: { 'X-Service': 'game-api' }
    })
  }

  // 定义业务API方法
  async getFeaturedGames(options = {}) {
    const params = new URLSearchParams(options).toString()
    return this.client.get(`/featured?${params}`, { useCache: true })
  }

  async getGameDetail(gameId) {
    return this.client.get(`/${gameId}`)
  }

  async searchGames(keyword, options = {}) {
    const params = new URLSearchParams({ q: keyword, ...options }).toString()
    return this.client.get(`/search?${params}`)
  }
}

// 使用
const gameApi = new GameApi()
const games = await gameApi.getFeaturedGames({ limit: 4 })
```

### 2. 通用业务API模式

```javascript
// 任何业务API都可以按此模式创建
class BusinessApi {
  constructor() {
    this.httpService = window.__SHARED_SERVICES__.getHttpService()
    this.client = this.httpService.createClient('business', {
      baseURL: '/api/business',
      timeout: 10000,
      headers: { 'X-Service': 'business-api' }
    })
  }

  async getData(params) {
    return this.client.get('/data', { searchParams: params })
  }

  async createRecord(data) {
    return this.client.post('/records', data)
  }

  async updateRecord(id, updates) {
    return this.client.put(`/records/${id}`, updates)
  }

  async uploadFile(file) {
    return this.client.upload('/files', file)
  }
}
```

### 3. 直接使用HTTP服务

```javascript
// 获取HTTP服务实例
const httpService = window.__SHARED_SERVICES__.getHttpService()

// 使用默认客户端
const response = await httpService.get('/api/data')

// 或创建自定义客户端
const apiClient = httpService.createClient('my-api', {
  baseURL: 'https://api.example.com',
  headers: { 'API-Key': 'your-key' }
})

const data = await apiClient.get('/endpoint')
```

## 🏗️ 架构优势

### ✅ 职责分离
- **API Services**: 只负责HTTP请求能力
- **调用方**: 定义具体的业务API和端点
- **清晰边界**: 基础设施与业务逻辑分离

### ✅ 灵活配置  
- 不同服务可使用不同的HTTP客户端配置
- 独立的认证、缓存、超时设置
- 支持多种后端API和第三方服务

### ✅ 易于扩展
- 新增业务API只需在调用方添加
- HTTP客户端功能统一升级
- 便于单元测试和mock

## 🔧 配置选项

### HTTP客户端配置

```javascript
const client = httpService.createClient('my-service', {
  baseURL: '/api/my-service',    // 基础URL
  timeout: 10000,                // 超时时间（毫秒）
  retry: 3,                      // 重试次数
  headers: {                     // 默认请求头
    'Content-Type': 'application/json',
    'X-Service': 'my-service'
  },
  cacheTimeout: 300000           // 缓存超时（毫秒）
})
```

### 请求选项

```javascript
await client.get('/endpoint', {
  searchParams: { page: 1 },     // URL参数
  useCache: true,                // 启用缓存
  timeout: 5000,                 // 请求级超时
  retry: 1                       // 请求级重试
})

await client.post('/endpoint', data, {
  headers: { 'X-Custom': 'value' } // 请求级headers
})
```

## 🛡️ 认证管理

```javascript
const httpService = window.__SHARED_SERVICES__.getHttpService()

// 设置全局认证令牌
httpService.setAuthToken('your-jwt-token')

// 为特定客户端设置令牌
httpService.setAuthToken('client-specific-token', 'user-client')

// 清除令牌
httpService.clearAuthToken('user-client')
```

## 📦 缓存管理

```javascript
// 启用请求缓存
const data = await client.get('/data', { useCache: true })

// 清空特定客户端缓存
client.clearCache()

// 清空所有缓存
httpService.clearAllCache()
```

## 🚀 最佳实践

### 1. 客户端命名规范
```javascript
// 按业务领域命名
httpService.createClient('game', { baseURL: '/api/games' })        // home应用专用
httpService.createClient('payment', { baseURL: '/api/payments' })  // 支付相关微应用
httpService.createClient('analytics', { baseURL: '/api/analytics' }) // 数据分析微应用
```

### 2. 错误处理
```javascript
try {
  const result = await gameApi.getFeaturedGames()
  return result.data
} catch (error) {
  if (error.name === 'HTTPError') {
    console.error(`HTTP错误: ${error.response.status}`)
  } else if (error.name === 'TimeoutError') {
    console.error('请求超时')
  }
  
  // 返回默认值或显示用户友好错误
  return []
}
```

### 3. 资源清理
```javascript
// 在组件卸载时清理客户端
componentWillUnmount() {
  httpService.destroyClient('my-client')
}
```

## 📊 服务监控

### 健康检查
```javascript
const status = await serviceManager.getHealthStatus()
console.log('服务状态:', status)
```

### 性能监控
```javascript
// 请求时间监控
const start = performance.now()
const result = await client.get('/data')
const duration = performance.now() - start
console.log(`请求耗时: ${duration.toFixed(2)}ms`)
```

## 🔗 迁移指南

### 从业务逻辑版本迁移

**之前（包含业务逻辑）:**
```javascript
const games = await api.getFeaturedGames({ limit: 4 })
```

**现在（调用方定义业务逻辑）:**
```javascript
// 在调用方创建GameApi类
const gameApi = new GameApi()
const games = await gameApi.getFeaturedGames({ limit: 4 })
```

## 🧪 测试

访问 http://localhost:9101 查看完整的功能演示和测试用例。

## 📝 总结

这种架构设计遵循了**单一职责原则**：
- **API Services** 专注于提供HTTP请求基础设施
- **调用方** 负责定义具体的业务API逻辑
- **清晰分离** 使得系统更易维护和扩展

这样的设计让微前端架构更加灵活和可维护，每个部分都有明确的职责和边界。