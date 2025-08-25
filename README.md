# Vite + Single-SPA React Native Web 微前端测试项目

这是一个使用 Vite、Single-SPA 和 React Native Web 构建的微前端测试项目，用于评估现代微前端技术栈在实际项目中的可行性。

## 项目结构

```
vite-single-spa/
├── root-config/          # Single-SPA 根配置应用 (React Native Web) - :9000
├── home/                 # 主页微前端应用 (React Native Web) - :9001
├── api-services/        # 共享API服务微应用 - :9101
├── package.json          # 主项目配置
└── setup.sh             # 安装脚本
```

## 技术栈

- **构建工具**: Vite 5.0
- **微前端框架**: Single-SPA 6.0
- **UI 框架**: React Native Web 0.21
- **应用框架**: 
  - Root Config: React 18 + React Native Web 组件
  - Home: React 18 + React Native Web 组件
- **开发体验**: 热模块替换 (HMR) / 快速刷新
- **架构模式**: 逻辑与视图分离

## 架构特色

### 🎯 完全组件化
- 使用 React Native Web 的 `View`、`Text`、`Pressable` 等组件
- 避免使用任何原生 HTML 标签
- 统一的组件开发体验

### 🏗️ 模块化架构
```
应用结构/
├── src/
│   ├── App.jsx              # 纯视图组合器
│   ├── styles.js            # 样式定义
│   ├── hooks/               # 业务逻辑 hooks
│   │   └── useCounter.js
│   └── components/          # UI 组件
│       ├── Counter.jsx
│       └── FeatureList.jsx
```

### 🔧 关注点分离
- **逻辑分离**: 自定义 hooks 管理业务逻辑
- **样式分离**: 独立的 StyleSheet 文件
- **组件分离**: 单一职责的 UI 组件
- **视图组合**: App.jsx 仅负责组件组合

## 快速开始

### 1. 安装依赖

```bash
# 运行安装脚本
./setup.sh

# 或手动安装
npm install
cd root-config && npm install && cd ..
cd home && npm install && cd ..
```

### 2. 启动开发环境

```bash
# 同时启动所有应用
npm run dev

# 或分别启动
npm run dev:root     # 根配置 http://localhost:9000
npm run dev:services # 共享服务 http://localhost:9101
npm run dev:home     # 主页应用 http://localhost:9001
```

### 3. 访问应用

**主应用**: http://localhost:9000
- 移动端风格的微前端应用集合
- 通过共享服务获取动态数据

**共享服务测试**: http://localhost:9101  
- 独立的API服务测试页面
- 游戏数据、用户服务等API测试

**单独访问**: http://localhost:9001
- 独立运行的Home微应用

## 构建生产版本

```bash
# 构建所有应用
npm run build

# 或分别构建
npm run build:root
npm run build:home
```

## 特性展示

### ✅ 已实现功能

- [x] Vite 快速构建和热更新
- [x] Single-SPA 微前端架构
- [x] React Native Web 完全组件化开发
- [x] 逻辑与视图完全分离
- [x] 模块化组件架构
- [x] StyleSheet 样式系统
- [x] 独立开发和部署能力
- [x] 路由切换和应用加载
- [x] 开发环境 CORS 配置

### 🔄 测试重点

- **构建速度**: Vite 的快速冷启动和热更新
- **开发体验**: React Native Web 的组件开发体验
- **应用隔离**: 微前端应用的独立运行
- **代码组织**: 逻辑、样式、组件的分离效果
- **部署便利**: 独立构建和部署的可行性
- **性能表现**: 应用切换和加载性能

### 🚀 架构优势

- **统一开发体验**: React Native 风格的组件开发
- **高度模块化**: 每个关注点都被清晰分离
- **易于测试**: 逻辑和组件可以独立测试
- **高复用性**: hooks 和组件可以跨应用复用
- **易于维护**: 清晰的代码结构和职责划分

## 项目评估

这个测试项目帮助评估：

1. **React Native Web 在微前端中的表现**
2. **Vite + Single-SPA 的技术栈组合效果**
3. **组件化开发的优势和限制**
4. **模块化架构的维护性和扩展性**
5. **生产环境部署的便利性**
6. **团队协作和开发效率的影响**

## 技术亮点

- 🎨 **零 HTML 标签**: 完全使用 React Native 组件
- 🔧 **完美分离**: 逻辑、样式、组件各司其职
- 📱 **移动优先**: React Native 开发体验
- ⚡ **极速开发**: Vite 快速构建 + HMR
- 🏗️ **可扩展性**: 清晰的架构便于功能扩展