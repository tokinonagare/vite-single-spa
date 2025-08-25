/**
 * Home应用API统一入口
 * 专注于游戏相关功能
 */

import gameApi from './gameApi.js'

// 直接导出游戏API实例
export { gameApi }

// 便捷的默认导出
export default {
  game: gameApi
}