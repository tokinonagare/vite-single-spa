import { useState, useCallback } from 'react'

export const useAppNavigation = () => {
  const [currentApp, setCurrentApp] = useState('home')
  
  const navigateToApp = useCallback((route, appId) => {
    console.log(`Navigating to ${appId} at route ${route}`)
    setCurrentApp(appId)
    
    // 更新浏览器地址栏
    history.pushState(null, null, route)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, [])

  return {
    currentApp,
    navigateToApp
  }
}