import { View, Text } from 'react-native'
import { styles } from '../styles'

export function Content() {
  return (
    <View style={styles.content}>
      <Text style={styles.contentText}>单击上面的导航按钮来加载微前端应用</Text>
    </View>
  )
}