# Mercedes SDV Presentation

基于 React + Vite 的 Typeform 风格幻灯片演示网站。

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建并复制到 docs/（用于 GitHub Pages）
npm run predeploy

# 预览构建结果
npm run preview
```

## 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 设置 GitHub Pages：Settings → Pages → Source 选择 `main` 分支的 `/docs` 文件夹
3. 确保 `vite.config.js` 中的 `base` 路径与仓库名一致

## 操作

- **← →** 或 **↑ ↓** 键切换幻灯片
- **空格键** 前进
- 点击顶部圆点跳转到指定页
- 移动端支持触屏滑动

## 文件结构

```
presentation/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── slides.jsx          # 幻灯片数据
│   └── components/
│       ├── Slide.jsx
│       └── ProgressBar.jsx
└── docs/                   # GitHub Pages 部署目录
```

## 编辑幻灯片

编辑 `src/slides.jsx` 文件，每个幻灯片对象包含：

```js
{
  id: number,
  type: 'title' | 'content' | 'chapter' | 'end',
  title: string,
  subtitle: string,          // 可选
  content: string | string[], // type: 'content' 时使用
  layout: 'center' | 'left' | 'columns',
  note: string | null,       // 演讲者备注
}
```
