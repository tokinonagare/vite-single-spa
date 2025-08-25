/**
 * 游戏API服务
 * 在构造函数中直接初始化客户端
 */

class GameApi {
  constructor() {
    // 在构造函数中直接创建客户端Promise
    this._clientPromise = window.$api.createClient('game', {
      baseURL: '/api/games',
      timeout: 8000,
      headers: {
        'X-Service': 'game-api'
      }
    })
  }

  /**
   * 获取热门游戏
   */
  async getFeaturedGames(options = {}) {
    const client = await this._clientPromise
    const params = new URLSearchParams(options).toString()
    return client.get(`/featured?${params}`, { useCache: true })
  }

  /**
   * 搜索游戏
   */
  async searchGames(keyword, options = {}) {
    const client = await this._clientPromise
    const params = new URLSearchParams({ q: keyword, ...options }).toString()
    return client.get(`/search?${params}`)
  }

  /**
   * 获取游戏详情
   */
  async getGameDetail(gameId) {
    const client = await this._clientPromise
    return client.get(`/${gameId}`)
  }

  /**
   * 获取游戏分类
   */
  async getGameCategories() {
    const client = await this._clientPromise
    return client.get('/categories', { useCache: true })
  }

  /**
   * 提交游戏评分
   */
  async rateGame(gameId, rating) {
    const client = await this._clientPromise
    return client.post(`/${gameId}/rating`, { rating })
  }

  /**
   * 添加到收藏
   */
  async addToFavorites(gameId) {
    const client = await this._clientPromise
    return client.post(`/${gameId}/favorite`)
  }
}

// 创建单例实例
const gameApi = new GameApi()

export default gameApi