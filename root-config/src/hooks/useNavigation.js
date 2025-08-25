import { useCallback } from 'react'

export const useNavigation = () => {
  const navigateToUrl = useCallback((url) => {
    history.pushState(null, null, url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, [])

  return {
    navigateToUrl
  }
}