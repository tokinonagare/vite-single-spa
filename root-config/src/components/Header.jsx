import { View, Text } from 'react-native'
import { styles } from '../styles'

export function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Vite + Single-SPA React Native Web 微前端测试项目</Text>
    </View>
  )
}