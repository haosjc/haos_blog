/* ============================================================
   弥散光感 · 明快黄 —— 自定义交互脚本
   仅通过 inject.bottom 引入，不修改框架 / 主题源码
   ============================================================ */
(function () {
  'use strict'

  /* ---------- 1. 弥散光感：漂浮极光光斑 ---------- */
  var blobs = [
    { color: 'rgba(255,199,0,.55)', size: 480, top: '-8%', left: '-6%' },
    { color: 'rgba(255,160,120,.5)', size: 420, top: '6%', left: '68%' },
    { color: 'rgba(160,140,255,.5)', size: 460, top: '58%', left: '72%' },
    { color: 'rgba(120,215,190,.5)', size: 400, top: '60%', left: '-8%' },
    { color: 'rgba(120,180,255,.42)', size: 340, top: '30%', left: '38%' }
  ]

  blobs.forEach(function (b, i) {
    var el = document.createElement('div')
    el.className = 'aurora-blob'
    el.style.width = b.size + 'px'
    el.style.height = b.size + 'px'
    el.style.top = b.top
    el.style.left = b.left
    el.style.background = 'radial-gradient(circle at 40% 40%, ' + b.color + ', transparent 70%)'
    el.style.animationDelay = (i * -4) + 's'
    document.body.appendChild(el)
  })

  /* ---------- 2. 顶部滚动进度条 ---------- */
  var bar = document.createElement('div')
  bar.id = 'm-progress-bar'
  bar.setAttribute('aria-hidden', 'true')
  document.body.appendChild(bar)

  function updateProgress () {
    var h = document.documentElement
    var scrollTop = h.scrollTop || document.body.scrollTop
    var max = h.scrollHeight - h.clientHeight
    var p = max > 0 ? (scrollTop / max) * 100 : 0
    bar.style.width = p + '%'
  }
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
  updateProgress()

  /* ---------- 3. 首屏 SVG 鼠标视差 ---------- */
  var hero = document.getElementById('page-header')
  if (hero) {
    var layers = hero.querySelectorAll('[data-depth]')
    if (layers.length) {
      var raf = null
      hero.addEventListener('mousemove', function (e) {
        if (raf) return
        raf = requestAnimationFrame(function () {
          var rect = hero.getBoundingClientRect()
          var cx = (e.clientX - rect.left) / rect.width - 0.5
          var cy = (e.clientY - rect.top) / rect.height - 0.5
          layers.forEach(function (el) {
            var depth = parseFloat(el.getAttribute('data-depth')) || 0
            var dx = cx * depth * -40
            var dy = cy * depth * -30
            el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'
          })
          raf = null
        })
      })
      hero.addEventListener('mouseleave', function () {
        layers.forEach(function (el) { el.style.transform = '' })
      })
    }
  }

  /* ---------- 4. 页面进入时给卡片做错落浮现 ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('m-reveal-in')
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.recent-post-item, .card-widget').forEach(function (el, i) {
      el.classList.add('m-reveal')
      el.style.transitionDelay = (i % 6) * 40 + 'ms'
      io.observe(el)
    })
  }
})()
