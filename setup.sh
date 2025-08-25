#!/bin/bash

echo "正在安装 Vite + Single-SPA + React 项目依赖..."

echo "安装根目录依赖..."
npm install

echo "安装 root-config 依赖..."
cd root-config && npm install && cd ..

echo "安装 home (React) 依赖..."
cd home && npm install && cd ..

echo "所有依赖安装完成！"
echo ""
echo "启动开发服务器:"
echo "npm run dev"
echo ""
echo "或者分别启动:"
echo "npm run dev:root    # 启动根配置 (端口 9000)"
echo "npm run dev:home    # 启动 React 应用 (端口 9001)"