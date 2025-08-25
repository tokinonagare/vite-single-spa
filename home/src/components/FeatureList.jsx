import { View, Text } from 'react-native'
import { styles } from '../styles'

export function FeatureList() {
  const features = [
    "React 18 Hooks",
    "React Native Web 组件", 
    "Vite 快速构建",
    "Single-SPA 微前端架构",
    "快速刷新 (Fast Refresh)"
  ]

  return (
    <View style={styles.features}>
      <Text style={styles.featuresTitle}>功能特性:</Text>
      {features.map((feature, index) => (
        <FeatureItem key={index} text={feature} />
      ))}
    </View>
  )
}

function FeatureItem({ text }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  )
}