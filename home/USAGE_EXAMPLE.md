# Home应用 - 超简洁的游戏API

## 🎯 设计理念

**极简初始化** - 所有复杂的等待、重试逻辑都在API-services中处理，调用方只需要专注业务逻辑

## ✨ 使用示例

### 基本用法

```javascript
import { gameApi } from './services/index.js'

// 游戏相关功能
const games = await gameApi.getFeaturedGames({ limit: 4 })
const gameDetail = await gameApi.getGameDetail(1)
const categories = await gameApi.getGameCategories()
const searchResults = await gameApi.searchGames('音乐')
```

### 在React Native组件中使用

```javascript
import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { gameApi } from '../services/index.js'

function GameList() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGames() {
      try {
        const result = await gameApi.getFeaturedGames({ limit: 6 })
        setGames(result.data.games || [])
      } catch (error) {
        console.error('加载游戏失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGames()
  }, [])

  if (loading) return <Text>加载中...</Text>

  return (
    <View>
      {games.map(game => (
        <Text key={game.id}>{game.name}</Text>
      ))}
    </View>
  )
}
```

### 错误处理

```javascript
try {
  const games = await gameApi.getFeaturedGames()
  console.log('获取游戏成功:', games)
} catch (error) {
  if (error.name === 'HTTPError') {
    console.error('HTTP错误:', error.response?.status)
  } else if (error.name === 'TimeoutError') {
    console.error('请求超时')
  } else {
    console.error('其他错误:', error.message)
  }
}
```

## 🔧 自定义配置

如果需要自定义HTTP客户端配置：

```javascript
// gameApi.js 中修改
this._httpClient = httpService.createClient('game', {
  baseURL: '/api/v2/games',  // 自定义API版本
  timeout: 15000,            // 自定义超时
  headers: {
    'X-API-Key': 'your-key'  // 自定义请求头
  }
})
```

## ✅ 初始化对比

### ❌ 之前（复杂臃肿 - 30+行代码）
```javascript
async _getHttpClient() {
  // 复杂的等待逻辑
  let attempts = 0
  const maxAttempts = 50 
  
  while (attempts < maxAttempts) {
    if (window.__SHARED_SERVICES__?.getHttpService) {
      try {
        const httpService = window.__SHARED_SERVICES__.getHttpService()
        this._httpClient = httpService.createClient('game', { ... })
        return this._httpClient
      } catch (error) { ... }
    }
    await new Promise(resolve => setTimeout(resolve, 100))
    attempts++
  }
  
  throw new Error('无法连接到HTTP服务')
}
```

### ✅ 现在（极简直接 - 4行代码）
```javascript
constructor() {
  // 直接在构造函数中创建客户端Promise
  this._clientPromise = window.$api.createClient('game', { ... })
}
```

## 🎯 关键改进

1. **单一职责** - 每个API类只负责一个业务域
2. **简洁初始化** - 自动化的HTTP客户端获取
3. **直接调用** - 不需要复杂的客户端包装
4. **清晰边界** - API定义在调用方，HTTP客户端在基础设施层
5. **易于测试** - 可以轻松mock HTTP客户端

## 🚀 扩展新API

添加新的业务API非常简单：

```javascript
// paymentApi.js
class PaymentApi {
  constructor() {
    this._clientPromise = window.$api.createClient('payment', {
      baseURL: '/api/payments'
    })
  }

  async processPayment(amount, method) {
    const client = await this._clientPromise
    return client.post('/process', { amount, method })
  }
}

export default new PaymentApi()
```

这种架构清晰、简洁、易于维护！