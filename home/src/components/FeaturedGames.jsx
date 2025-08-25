import { View, Text, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { styles } from '../styles'
import { gameApi } from '../services/index.js'

export function FeaturedGames() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 加载游戏数据
  const loadGames = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('📱 Home App: 通过共享服务获取热门游戏...')
      const response = await gameApi.getFeaturedGames({ limit: 4 })
      setGames(response.data.games)
    } catch (err) {
      console.error('获取游戏数据失败:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 组件挂载时加载数据
  useEffect(() => {
    loadGames()
  }, [])

  // 加载状态渲染
  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>🎮 正在加载热门游戏...</Text>
    </View>
  )

  // 错误状态渲染
  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>😕 {error}</Text>
      <Pressable style={styles.retryButton} onPress={loadGames}>
        <Text style={styles.retryButtonText}>重试</Text>
      </Pressable>
    </View>
  )

  // 游戏列表渲染
  const renderGamesList = () => (
    <View style={styles.gamesGrid}>
      {games.map((game) => (
        <Pressable key={game.id} style={styles.gameCard}>
          <View style={[styles.gameImage, { backgroundColor: game.bgColor }]}>
            <Text style={styles.gamePlaceholder}>🎮</Text>
          </View>
          
          <View style={styles.gameInfo}>
            <Text style={styles.gameName}>{game.name}</Text>
            <Text style={styles.gameCategory}>{game.category}</Text>
            
            <View style={styles.gameStats}>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>👥</Text>
                <Text style={styles.statText}>{game.players}</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>⭐</Text>
                <Text style={styles.statText}>{game.rating}</Text>
              </View>
            </View>
          </View>
          
          <Pressable style={styles.playButton}>
            <Text style={styles.playButtonText}>开始游戏</Text>
          </Pressable>
        </Pressable>
      ))}
    </View>
  )

  return (
    <View style={styles.featuredGames}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>热门推荐</Text>
        <Pressable style={styles.moreButton} onPress={loadGames}>
          <Text style={styles.moreText}>刷新 🔄</Text>
        </Pressable>
      </View>
      
      {loading && renderLoading()}
      {error && renderError()}
      {!loading && !error && games.length > 0 && renderGamesList()}
      {!loading && !error && games.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>暂无游戏数据</Text>
        </View>
      )}
    </View>
  )
}