import { View, Text } from 'react-native'
import { styles } from '../styles'

export function AppHeader() {
  return (
    <View>
      <Text style={styles.title}>React Native Web 微前端应用</Text>
      <Text style={styles.description}>这是一个使用 Vite + React Native Web 构建的微前端应用</Text>
    </View>
  )
}