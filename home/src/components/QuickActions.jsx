import { View, Text, Pressable } from 'react-native'
import { styles } from '../styles'

export function QuickActions() {
  const actions = [
    { id: 1, icon: '🎮', title: '游戏大厅', color: '#FF6B6B' },
    { id: 2, icon: '🎁', title: '每日签到', color: '#4ECDC4' },
    { id: 3, icon: '💎', title: '充值中心', color: '#45B7D1' },
    { id: 4, icon: '🏆', title: '排行榜', color: '#96CEB4' },
    { id: 5, icon: '🎪', title: '活动中心', color: '#FECA57' },
    { id: 6, icon: '🎵', title: '音乐厅', color: '#FF9FF3' },
    { id: 7, icon: '💬', title: '客服中心', color: '#54A0FF' },
    { id: 8, icon: '⚙️', title: '设置', color: '#5F27CD' }
  ]

  return (
    <View style={styles.quickActions}>
      <Text style={styles.sectionTitle}>快捷入口</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action) => (
          <Pressable key={action.id} style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
              <Text style={styles.actionEmoji}>{action.icon}</Text>
            </View>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}