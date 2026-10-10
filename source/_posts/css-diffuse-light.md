---
title: CSS 弥散光感与玻璃拟态设计实战
date: 2026-10-05 20:15:00
updated: 2026-10-05 20:15:00
tags:
  - CSS
  - 设计
  - 前端
categories:
  - 前端开发
description: 用纯 CSS 还原当下流行的弥散光感：渐变光斑、玻璃拟态与柔和光晕。
top_img: /img/page-hero.svg
---

「弥散光感」是近年来最流行的视觉语言之一——大面积的柔和渐变光斑相互交融，配合玻璃拟态的卡片，营造出通透、轻盈、有呼吸感的界面。用纯 CSS 就能还原出它的神韵。

## 1. 核心视觉元素

弥散光感的关键在于「光」的处理：

- **渐变光斑**（Aurora blobs）：大面积、高模糊的彩色光斑
- **玻璃拟态**（Glassmorphism）：半透明 + 背景模糊的卡片
- **柔和光晕**（Glow）：低透明度的彩色投影
- **极光配色**：蜜桃、香芋紫、薄荷绿、天空蓝的低饱和渐变

## 2. 渐变光斑

用多个 `radial-gradient` 叠加，就能做出弥散的光感：

```css
.aurora {
  background-image:
    radial-gradient(800px 500px at 10% 10%, rgba(255,199,0,.28), transparent 60%),
    radial-gradient(700px 500px at 90% 15%, rgba(255,160,120,.3), transparent 60%),
    radial-gradient(800px 600px at 90% 90%, rgba(160,140,255,.3), transparent 60%),
    linear-gradient(180deg, #fdfcf7, #fbf6ea);
}
```

## 3. 玻璃拟态

玻璃拟态的灵魂是 `backdrop-filter: blur()`，它模糊的是**背景**而非元素本身：

```css
.card {
  background: rgba(255, 255, 255, .58);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, .7);
  border-radius: 22px;
  box-shadow: 0 10px 40px -14px rgba(120, 100, 50, .2);
}
```

## 4. 柔和光晕

真正的「光感」来自多层、低透明度的彩色投影：

```css
.btn-glow {
  background: rgba(255, 199, 0, .22);
  box-shadow: 0 8px 22px -10px rgba(255, 199, 0, .55);
  transition: all .2s ease;
}

.btn-glow:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px -12px rgba(255, 170, 40, .7);
}
```

## 5. 极光配色

弥散光感的配色偏向**低饱和、高明度**，靠渐变的柔美取胜：

- 明快黄 `#FFC700`（主强调色）
- 蜜桃 `#FFC4A3`
- 香芋紫 `#CFC3FF`
- 薄荷绿 `#A9E8D7`
- 天空蓝 `#A8D9FF`

## 小结

弥散光感的本质是「光与玻璃」——用模糊与透明度让颜色**流动**起来，让界面**呼吸**起来。这也是本博客主题的核心思路。
