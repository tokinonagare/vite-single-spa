import { View, Text, Pressable, ScrollView } from 'react-native'
import { useState, useRef } from 'react'
import { styles } from '../styles'

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [containerWidth, setContainerWidth] = useState(414) // 默认宽度

  const banners = [
    {
      id: 1,
      title: '欢迎来到 来玩',
      subtitle: '体验最佳的移动端游戏',
      bgColor: '#FF6B6B'
    },
    {
      id: 2,
      title: '新用户专享',
      subtitle: '注册即送豪礼',
      bgColor: '#4ECDC4'
    },
    {
      id: 3,
      title: '每日签到',
      subtitle: '连续签到获得奖励',
      bgColor: '#45B7D1'
    }
  ]

  return (
    <View 
      style={styles.heroBanner}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout
        setContainerWidth(width)
      }}
    >
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.bannerScroll}
      >
        {banners.map((banner, index) => (
          <View
            key={banner.id}
            style={[
              styles.bannerSlide, 
              { 
                backgroundColor: banner.bgColor,
                width: containerWidth
              }
            ]}
          >
            <Text style={styles.bannerTitle}>{banner.title}</Text>
            <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
            <Pressable style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>立即体验</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bannerIndicators}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlide === index && styles.activeIndicator
            ]}
          />
        ))}
      </View>
    </View>
  )
}
