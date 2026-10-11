'use strict';

// 自定义资源图片解析器
// 作用：当 post_asset_folder 开启时，把正文与 cover 里的相对路径图片
//       自动解析到「文章 permalink 路径」下，让资源文件夹里的图片正常显示。
// 说明：替代有 bug 的 hexo-asset-image 插件（它在 localhost 无域名点时会算错路径）。
hexo.extend.filter.register('after_post_render', function (data) {
  const config = hexo.config;
  if (!config.post_asset_folder) return data;

  const root = config.root || '/';
  let postPath = data.path || '';
  if (postPath && !postPath.endsWith('/')) postPath += '/';

  const resolveAsset = function (src) {
    if (!src) return src;
    src = String(src).replace(/\\/g, '/');
    // 跳过绝对路径 / http(s) / data URI
    if (/^(https?:)?\/\//i.test(src) || src.charAt(0) === '/' || /^data:/i.test(src)) {
      return src;
    }
    const parts = src.split('/').filter(function (p) { return p && p !== '.'; });
    // 若引用带了「文章名文件夹」前缀，去掉第一段
    if (parts.length > 1) parts.shift();
    return root + postPath + parts.join('/');
  };

  // 处理正文里的 <img src="...">
  ['content', 'excerpt', 'more'].forEach(function (key) {
    if (!data[key]) return;
    data[key] = data[key].replace(/<img[^>]*\bsrc=(["'])([^"']+)\1[^>]*>/gi, function (match, quote, src) {
      const newSrc = resolveAsset(src);
      if (newSrc === src) return match;
      return match.replace('src=' + quote + src + quote, 'src=' + quote + newSrc + quote);
    });
  });

  // 处理封面 cover
  if (data.cover) {
    data.cover = resolveAsset(data.cover);
  }

  return data;
});
