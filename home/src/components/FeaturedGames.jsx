import { View, Text, Pressable } from 'react-native'
import { styles } from '../styles'

export function FeaturedGames() {
  const games = [
    {
      id: 1,
      name: '音乐节拍',
      category: '休闲游戏',
      players: '2.3K',
      rating: '4.8',
      bgColor: '#FF6B6B'
    },
    {
      id: 2,
      name: '德州扑克',
      category: '棋牌游戏', 
      players: '1.8K',
      rating: '4.7',
      bgColor: '#4ECDC4'
    },
    {
      id: 3,
      name: '捕鱼达人',
      category: '捕鱼游戏',
      players: '3.1K', 
      rating: '4.9',
      bgColor: '#45B7D1'
    },
    {
      id: 4,
      name: '街机水果机',
      category: '街机游戏',
      players: '1.5K',
      rating: '4.6',
      bgColor: '#96CEB4'
    }
  ]

  return (
    <View style={styles.featuredGames}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>热门推荐</Text>
        <Pressable style={styles.moreButton}>
          <Text style={styles.moreText}>更多 &gt;</Text>
        </Pressable>
      </View>
      
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
    </View>
  )
}