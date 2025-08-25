import { ScrollView } from 'react-native'
import { styles } from './styles'
import { 
  HeroBanner, 
  QuickActions, 
  GameCategories, 
  FeaturedGames 
} from './components'

function App() {
  return (
    <ScrollView 
      style={styles.homeContainer} 
      contentContainerStyle={styles.homeContentContainer}
      showsVerticalScrollIndicator={false}
    >
      <HeroBanner />
      <QuickActions />
      <GameCategories />
      <FeaturedGames />
    </ScrollView>
  )
}

export default App