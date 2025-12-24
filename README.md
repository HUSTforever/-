
# 🔮 奥秘塔罗 (Mystic Arcana)

<p align="center">
  <br>
  <i class="fa-solid fa-hand-holding-sparkles" style="font-size: 4rem; color: #f59e0b;"></i>
  <br>
  <b>“直觉即是神谕，代码构建命运。”</b>
  <br>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?logo=react&style=flat-square" alt="React">
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&style=flat-square" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?logo=github&style=flat-square" alt="GitHub Pages">
</p>

## 📖 项目简介

**奥秘塔罗 (Mystic Arcana)** 是一款基于现代 Web 技术构建的沉浸式数字塔罗牌占卜应用。

与传统的简陋网页不同，本项目致力于通过细腻的 **UI/UX 设计** 还原真实的占卜仪式感。通过平滑的动画、粒子效果和 3D 卡牌翻转，为用户提供静谧、神秘的探索体验。

本项目为**纯静态架构 (Static Web App)**，无需配置后端服务器或数据库，所有逻辑在浏览器端运行，天然保护用户隐私，且可免费部署于 GitHub Pages。

## ✨ 核心特性

*   **🃏 沉浸式交互**：手势风格的选牌动画，卡牌从牌堆飞入牌阵的流畅视觉效果。
*   **🌌 视觉盛宴**：基于 CSS3 3D Transform 的卡牌翻转、呼吸光效、星空背景粒子。
*   **🔮 多种牌阵支持**：
    *   **单牌占卜**：每日指引。
    *   **三牌阵**：探索过去、现在与未来。
    *   **凯尔特十字**：深度解析复杂问题（开发中）。
*   **📱 完美响应式**：针对移动端和桌面端分别优化的布局，随时随地开启占卜。
*   **⚡ 零后端依赖**：无需 API Key，无需数据库，克隆即运行。

## 🛠️ 技术栈

*   **核心框架**: [React 19](https://react.dev/) (通过 ESM 模块直接引入，无需构建工具链)
*   **样式库**: [Tailwind CSS](https://tailwindcss.com/) (CDN 引入)
*   **图标库**: FontAwesome
*   **语言**: TypeScript (TSX)

## 🚀 快速开始 (本地运行)

本项目采用了 **Zero-Build (零构建)** 架构，不需要 `npm install` 或 `npm run build`。

1.  **克隆仓库**
    ```bash
    git clone https://github.com/你的用户名/你的仓库名.git
    ```

2.  **运行项目**
    由于使用了 ES Modules，直接双击 `index.html` 可能会因跨域策略(CORS)报错。推荐使用 VS Code 的 **Live Server** 插件。

    *   打开 VS Code。
    *   安装插件 `Live Server`。
    *   右键点击 `index.html`，选择 `Open with Live Server`。

3.  **尽情体验**
    浏览器将自动打开，你即可开始你的塔罗之旅。

## 🌐 部署指南 (GitHub Pages)

本项目完全兼容 GitHub Pages 免费托管。

1.  **上传代码**：将所有文件提交到你的 GitHub 仓库。
2.  **开启 Pages**：
    *   进入仓库 `Settings` -> `Pages`。
    *   Source 选择 `Deploy from a branch`。
    *   Branch 选择 `main` / `root`。
    *   点击 Save。
3.  **自定义域名 (可选)**：
    *   修改根目录下的 `CNAME` 文件，填入你的域名（例如 `www.mytarot.com`）。
    *   在域名服务商处配置 DNS 解析（CNAME 指向 `你的用户名.github.io`）。

## 📂 目录结构

```text
.
├── components/        # React 组件 (牌堆、展示区等)
├── index.html         # 入口文件
├── index.tsx          # React 入口逻辑
├── App.tsx            # 主应用容器
├── types.ts           # TypeScript 类型定义
├── constants.ts       # 塔罗牌数据与常量
├── CNAME              # 域名配置文件
└── metadata.json      # 项目元数据
```

## 📄 版权说明

本项目基于 MIT 协议开源。塔罗牌图片资源引用自开源项目，仅供学习与娱乐使用。

---

*Made with 💜 by [你的名字]*
