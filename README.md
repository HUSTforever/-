
# 🔮 奥秘塔罗 (Mystic Arcana) - 静态部署版

> **"你的直觉，即是神谕。"**

「奥秘塔罗」是一款极具沉浸感的数字塔罗牌占卜应用。此版本已优化为**纯静态架构**，无需任何后端服务器或 API 密钥，非常适合部署在 GitHub Pages 上。

## 🚀 部署到 GitHub Pages (带自定义域名)

### 第一步：上传代码
1. 在 GitHub 上创建一个新的**公开 (Public)** 仓库（例如命名为 `tarot-app`）。
2. 将本项目所有文件上传到该仓库的根目录。
3. **重要**：修改根目录下的 `CNAME` 文件，将内容改为你购买的域名（例如 `www.mytarot.com` 或 `tarot.example.com`）。

### 第二步：开启 Pages 服务
1. 进入仓库的 **Settings (设置)** 页面。
2. 在左侧菜单找到 **Pages**。
3. 在 **Build and deployment** 下：
   - Source 选择 **Deploy from a branch**。
   - Branch 选择 **main** (或 master)，文件夹选择 **/ (root)**。
   - 点击 **Save**。

### 第三步：配置 DNS (域名解析)
去你的域名服务商（如阿里云、腾讯云、GoDaddy）控制台，添加以下解析记录：

**情况 A：使用子域名 (推荐，如 www.mytarot.com)**
- **记录类型**: `CNAME`
- **主机记录**: `www`
- **记录值**: `<你的GitHub用户名>.github.io`

**情况 B：使用顶级域名 (如 mytarot.com)**
- **记录类型**: `A`
- **主机记录**: `@`
- **记录值** (添加以下4条):
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- 并在 GitHub Pages 设置页面的 "Custom domain" 栏填入你的域名，勾选 "Enforce HTTPS"。

等待 10-30 分钟 DNS 生效后，即可通过你的域名访问。

## ✨ 本地运行

本项采用零构建 (Zero-Build) 设计：
1. 使用 VS Code 打开文件夹。
2. 安装 **Live Server** 插件。
3. 右键 `index.html` 选择 "Open with Live Server"。

## 🛠️ 技术架构

- **核心**: React 19 (ESM 模块化)
- **样式**: Tailwind CSS
- **部署**: 纯静态 HTML/JS

---
*愿星辰指引你的道路。*
