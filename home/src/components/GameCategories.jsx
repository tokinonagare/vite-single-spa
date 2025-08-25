import { View, Text, Pressable, ScrollView } from 'react-native'
import { styles } from '../styles'

export function GameCategories() {
  const categories = [
    { id: 1, name: '热门游戏', icon: '🔥', count: '120+', color: '#FF6B6B' },
    { id: 2, name: '棋牌游戏', icon: '🎴', count: '45+', color: '#4ECDC4' },
    { id: 3, name: '街机游戏', icon: '🕹️', count: '78+', color: '#45B7D1' },
    { id: 4, name: '捕鱼游戏', icon: '🐟', count: '32+', color: '#96CEB4' },
    { id: 5, name: '彩票游戏', icon: '🎲', count: '28+', color: '#FECA57' },
    { id: 6, name: '电子游艺', icon: '⚡', count: '156+', color: '#FF9FF3' }
  ]

  return (
    <View style={styles.gameCategories}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>游戏分类</Text>
        <Pressable style={styles.moreButton}>
          <Text style={styles.moreText}>更多 &gt;</Text>
        </Pressable>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
      >
        {categories.map((category) => (
          <Pressable key={category.id} style={styles.categoryCard}>
            <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
              <Text style={styles.categoryEmoji}>{category.icon}</Text>
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
            <Text style={styles.categoryCount}>{category.count}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}