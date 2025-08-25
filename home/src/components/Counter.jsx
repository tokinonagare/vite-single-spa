import { View, Text, Pressable } from 'react-native'
import { styles } from '../styles'

export function Counter({ count, onIncrement }) {
  return (
    <View style={styles.counterDemo}>
      <Text style={styles.counterTitle}>计数器演示:</Text>
      <Pressable 
        style={styles.counterButton} 
        onPress={onIncrement}
      >
        <Text style={styles.counterButtonText}>点击次数: {count}</Text>
      </Pressable>
    </View>
  )
}