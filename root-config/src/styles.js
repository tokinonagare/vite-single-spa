import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  // 基础布局
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 80 // 为底部导航留出空间
  },
  
  // 移动端头部
  mobileHeader: {
    height: 60,
    backgroundColor: '#6C5CE7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  headerLeft: {
    width: 40
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center'
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end'
  },
  menuButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuIcon: {
    fontSize: 20,
    color: '#FFFFFF'
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  profileButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileIcon: {
    fontSize: 18,
    color: '#FFFFFF'
  },

  // 底部导航
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingBottom: 20,
    zIndex: 1000
  },
  navTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: '#B0B3B8'
  },
  activeNavIcon: {
    color: '#6C5CE7'
  },
  navLabel: {
    fontSize: 12,
    color: '#B0B3B8'
  },
  activeNavLabel: {
    color: '#6C5CE7',
    fontWeight: '600'
  },

  // 微应用容器
  microAppContainer: {
    flex: 1
  },

  // 旧的样式（向后兼容）
  header: {
    backgroundColor: '#333',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  navigation: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007bff',
    borderRadius: 4,
    cursor: 'pointer'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  content: {
    padding: 32,
    flex: 1
  },
  contentText: {
    fontSize: 16,
    color: '#333'
  }
})