import { View, Text, Pressable } from 'react-native'
import { styles } from '../styles'

export function Navigation({ onNavigate }) {
  return (
    <View style={styles.navigation}>
      <Pressable 
        style={styles.button} 
        onPress={() => onNavigate('/app')}
      >
        <Text style={styles.buttonText}>主页应用</Text>
      </Pressable>
      <Pressable 
        style={styles.button} 
        onPress={() => onNavigate('/')}
      >
        <Text style={styles.buttonText}>首页</Text>
      </Pressable>
    </View>
  )
}