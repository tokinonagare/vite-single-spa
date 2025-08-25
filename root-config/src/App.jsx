import { View } from 'react-native'
import { styles } from './styles'
import { useAppNavigation } from './hooks/useAppNavigation'
import { MobileHeader, BottomNavigation } from './components'
import { useEffect } from 'react'

function App() {
  const { currentApp, navigateToApp } = useAppNavigation()

  useEffect(() => {
    // 确保默认路由被触发
    if (window.location.pathname === '/') {
      navigateToApp('/', 'home')
    }
  }, [navigateToApp])

  // 控制微应用容器的显示/隐藏
  useEffect(() => {
    const containers = [
      'single-spa-application:@vite-single-spa/home',
      'single-spa-application:@vite-single-spa/games', 
      'single-spa-application:@vite-single-spa/events',
      'single-spa-application:@vite-single-spa/wallet',
      'single-spa-application:@vite-single-spa/profile'
    ]
    
    containers.forEach(id => {
      const element = document.getElementById(id)
      if (element) {
        const appName = id.split('/').pop()
        element.style.display = currentApp === appName ? 'block' : 'none'
      }
    })
  }, [currentApp])

  return (
    <View style={styles.container}>
      <MobileHeader />
      <BottomNavigation onTabChange={navigateToApp} />
    </View>
  )
}

export default App