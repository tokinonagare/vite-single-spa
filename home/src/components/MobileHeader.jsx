import { View, Text, Pressable } from 'react-native'
import { styles } from '../styles'

export function MobileHeader() {
  return (
    <View style={styles.mobileHeader}>
      <View style={styles.headerLeft}>
        <Pressable style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
      </View>
      
      <View style={styles.headerCenter}>
        <Text style={styles.logoText}>Home</Text>
      </View>
      
      <View style={styles.headerRight}>
        <Pressable style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </Pressable>
      </View>
    </View>
  )
}