import { StyleSheet, Dimensions } from 'react-native'

const { width: screenWidth } = Dimensions.get('window')

export const styles = StyleSheet.create({
  // 微应用容器布局
  homeContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  homeContentContainer: {
    flexGrow: 1,
    paddingBottom: 20 // 微应用不需要为底部导航留出空间
  },
  
  // 基础布局（向后兼容）
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  contentContainer: {
    flexGrow: 1,
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

  // Hero Banner
  heroBanner: {
    height: 180,
    position: 'relative'
  },
  bannerScroll: {
    flex: 1
  },
  bannerSlide: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 20
  },
  bannerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14
  },
  bannerIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF'
  },

  // 快捷入口
  quickActions: {
    backgroundColor: '#FFFFFF',
    margin: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 16
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  actionItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 20
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  actionEmoji: {
    fontSize: 20
  },
  actionTitle: {
    fontSize: 12,
    color: '#636E72',
    textAlign: 'center'
  },

  // 游戏分类
  gameCategories: {
    backgroundColor: '#FFFFFF',
    margin: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  moreButton: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  moreText: {
    fontSize: 14,
    color: '#6C5CE7'
  },
  categoriesScroll: {
    marginHorizontal: -16
  },
  categoryCard: {
    width: 100,
    alignItems: 'center',
    marginLeft: 16,
    padding: 12,
    borderRadius: 8
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  categoryEmoji: {
    fontSize: 24
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 4
  },
  categoryCount: {
    fontSize: 11,
    color: '#636E72',
    textAlign: 'center'
  },

  // 热门游戏
  featuredGames: {
    backgroundColor: '#FFFFFF',
    margin: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  gameCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16
  },
  gameImage: {
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  gamePlaceholder: {
    fontSize: 32
  },
  gameInfo: {
    marginBottom: 12
  },
  gameName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 4
  },
  gameCategory: {
    fontSize: 12,
    color: '#636E72',
    marginBottom: 8
  },
  gameStats: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statIcon: {
    fontSize: 12,
    marginRight: 4
  },
  statText: {
    fontSize: 11,
    color: '#636E72'
  },
  playButton: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center'
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600'
  },

  // 加载状态样式
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginHorizontal: 16
  },
  loadingText: {
    fontSize: 16,
    color: '#6C5CE7',
    fontWeight: '500',
    textAlign: 'center'
  },

  // 错误状态样式
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE6E6',
    borderRadius: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FFB3B3'
  },
  errorText: {
    fontSize: 14,
    color: '#D63384',
    textAlign: 'center',
    marginBottom: 12
  },
  retryButton: {
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },

  // 空状态样式
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginHorizontal: 16
  },
  emptyText: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center'
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
    paddingBottom: 20
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

  // 旧的样式（向后兼容）
  app2Container: {
    padding: 32,
    borderWidth: 2,
    borderColor: '#61dafb',
    borderRadius: 8,
    margin: 16,
    backgroundColor: '#f8fafc'
  },
  title: {
    color: '#61dafb',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    color: '#333'
  },
  features: {
    marginBottom: 32
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333'
  },
  featureItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  featureText: {
    fontSize: 16,
    color: '#555'
  },
  counterDemo: {
    alignItems: 'center'
  },
  counterTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333'
  },
  counterButton: {
    backgroundColor: '#61dafb',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    cursor: 'pointer'
  },
  counterButtonText: {
    color: '#1a202c',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
})