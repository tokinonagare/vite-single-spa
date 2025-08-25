import { View, Text, Pressable } from 'react-native'
import { useState } from 'react'
import { styles } from '../styles'

export function BottomNavigation() {
  const [activeTab, setActiveTab] = useState('home')
  
  const tabs = [
    { id: 'home', icon: '🏠', label: '首页' },
    { id: 'games', icon: '🎮', label: '游戏' },
    { id: 'events', icon: '🎁', label: '活动' },
    { id: 'wallet', icon: '💰', label: '钱包' },
    { id: 'profile', icon: '👤', label: '我的' }
  ]

  return (
    <View style={styles.bottomNavigation}>
      {tabs.map((tab) => (
        <Pressable 
          key={tab.id}
          style={styles.navTab}
          onPress={() => setActiveTab(tab.id)}
        >
          <Text style={[
            styles.navIcon,
            activeTab === tab.id && styles.activeNavIcon
          ]}>
            {tab.icon}
          </Text>
          <Text style={[
            styles.navLabel,
            activeTab === tab.id && styles.activeNavLabel
          ]}>
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}