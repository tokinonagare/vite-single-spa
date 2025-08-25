import { View, Text, Pressable } from 'react-native'
import { useState } from 'react'
import { styles } from '../styles'

export function BottomNavigation({ onTabChange }) {
  const [activeTab, setActiveTab] = useState('home')
  
  const tabs = [
    { id: 'home', icon: '🏠', label: '首页', route: '/' },
    { id: 'games', icon: '🎮', label: '游戏', route: '/games' },
    { id: 'events', icon: '🎁', label: '活动', route: '/events' },
    { id: 'wallet', icon: '💰', label: '钱包', route: '/wallet' },
    { id: 'profile', icon: '👤', label: '我的', route: '/profile' }
  ]

  const handleTabPress = (tab) => {
    setActiveTab(tab.id)
    onTabChange(tab.route, tab.id)
  }

  return (
    <View style={styles.bottomNavigation}>
      {tabs.map((tab) => (
        <Pressable 
          key={tab.id}
          style={styles.navTab}
          onPress={() => handleTabPress(tab)}
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