
# 🔮 奥秘塔罗 (Mystic Arcana)

> **"群星虽有预兆，却不束缚灵魂。"**

「奥秘塔罗」是一款极具沉浸感的数字塔罗牌占卜应用。它结合了传统的塔罗神秘学、现代的前端交互技术以及强大的 Google Gemini AI，为求问者提供深刻的心理映照与精神指引。

![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-19.0-blue)
![AI](https://img.shields.io/badge/AI-Gemini%203%20Pro-orange)

## ✨ 功能特性

- **交互式选牌体验**：通过平滑的横向滑动与 3D 物理翻转效果，重现真实抽牌的仪式感。
- **标准伟特牌组 (Rider-Waite)**：使用全球最公认的塔罗艺术图像，确保象征意义的准确性。
- **多维度牌阵支持**：
  - **单牌占卜**：快速获取每日启示。
  - **三牌阵**：探索过去、现状与未来的时间流向。
  - **五牌十字阵**：针对复杂问题的多角度深度剖析。
- **AI 精神指引**：由 Gemini 3 Pro 模型化身“占卜师”，提供诗意、慈悲且具启发性的中文解读报告。
- **自适应设计**：完美适配 PC、平板与手机端，随时随地开启心灵对话。

## 🛠️ 技术架构

- **核心框架**: React 19 (ESM 模式，无需构建工具直接运行)
- **样式方案**: Tailwind CSS (通过 CDN 加载)
- **AI 引擎**: Google GenAI SDK (@google/genai)
- **图标/字体**: FontAwesome 6, Google Fonts (Cinzel, Lora)
- **部署模式**: 纯静态 HTML/TSX 结构，支持 Live Server 一键启动

## 🚀 本地运行指南

本项采用零构建 (Zero-Build) 设计，您可以直接在本地浏览器或 VS Code 中运行。

### 1. 准备工作
- 安装 [VS Code](https://code.visualstudio.com/)。
- 在 VS Code 插件市场搜索并安装 **Live Server**。
- 获取您的 [Gemini API Key](https://aistudio.google.com/)。

### 2. 运行步骤
1. 克隆或下载本仓库代码到本地目录。
2. 在浏览器执行环境或 `services/geminiService.ts` 中配置您的 API Key。
   - *注意：本项目默认通过 `process.env.API_KEY` 读取。在普通的本地文件预览中，您可能需要手动将 Key 填入初始化代码中。*
3. 在 VS Code 中右键点击 `index.html`，选择 **"Open with Live Server"**。
4. 默认地址为 `http://127.0.0.1:5500`，即可开始占卜。

## 📦 GitHub 部署说明

1. 创建一个新的 GitHub 仓库。
2. 将所有文件上传至根目录（保持 `index.html` 在顶层）。
3. 进入仓库的 **Settings > Pages**。
4. 在 **Build and deployment** 下选择 `main` 分支并点击 **Save**。
5. 几分钟后，您的网站将通过 `https://<your-username>.github.io/<repo-name>/` 访问。

## 📜 免责声明

本应用生成的占卜结果由 AI 基于象征意义计算得出，仅供娱乐、心理参考和灵性探索使用。请勿将其作为法律、医学或重大财务决策的唯一依据。

---
*愿星辰指引你的道路。*
